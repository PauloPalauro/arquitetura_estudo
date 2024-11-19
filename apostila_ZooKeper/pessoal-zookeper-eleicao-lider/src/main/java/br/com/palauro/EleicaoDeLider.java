package br.com.palauro;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.apache.zookeeper.CreateMode;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.Watcher;
import static org.apache.zookeeper.Watcher.Event.EventType.None;
import org.apache.zookeeper.ZooDefs;
import org.apache.zookeeper.ZooKeeper;


public class EleicaoDeLider {
    private static final String HOST = "localhost";
    private static final String PORTA = "2181";
    private static final int TIMEOUT = 5000;
    private static final String NAMESPACE_ELEICAO = "/eleicao";
    private String nomeDoZNodeDesseProcesso;
    private ZooKeeper zooKeeper;


    public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
    EleicaoDeLider eleicaoDeLider = new EleicaoDeLider();
    eleicaoDeLider.conectar();
    eleicaoDeLider.realizarCandidatura();
    eleicaoDeLider.elegerOLider();
    eleicaoDeLider.executar();
    eleicaoDeLider.fechar();
    
    }


     //o construtor lança uma exceção verificada
    public void conectar() throws IOException {
        zooKeeper = new ZooKeeper(
            String.format("%s:%s", HOST, PORTA), TIMEOUT,
            (evento) -> {
                if (evento.getType() == None){
                    if(evento.getState() == Watcher.Event.KeeperState.SyncConnected){
                        System.out.println("Conectou!\n");
                        System.out.printf("Estamos na thread: %s\n", Thread.currentThread().getName());
                    }
                    else if (evento.getState() == Watcher.Event.KeeperState.Disconnected){
                        synchronized (zooKeeper){
                            System.out.printf("Desconectou!\n");
                            System.out.printf("Estamos na thread: %s\n", Thread.currentThread().getName());
                            zooKeeper.notify();
                        }
                    }
                }
            }
        );
    }

    public void executar() throws InterruptedException{
        synchronized (zooKeeper){
            zooKeeper.wait();
        }
    }

    public void fechar () throws InterruptedException{
        zooKeeper.close();
    }

    public void realizarCandidatura () throws InterruptedException, KeeperException {
 
        String prefixo = String.format("%s/cand_", NAMESPACE_ELEICAO);
 
        String pathInteiro = zooKeeper.create(prefixo, new byte[]{}, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
 
        System.out.println(pathInteiro);
 
        this.nomeDoZNodeDesseProcesso = pathInteiro.replace(String.format("%s/", NAMESPACE_ELEICAO), "");
    }   

    public void elegerOLider () throws InterruptedException, KeeperException {

    List <String> candidatos = zooKeeper.getChildren(NAMESPACE_ELEICAO,false);

    Collections.sort(candidatos);
    String oMenor = candidatos.get(0);

    if (oMenor.equals(nomeDoZNodeDesseProcesso)){
        System.out.printf("Me chamo %s e sou o líder",nomeDoZNodeDesseProcesso);
    }

    else{
        System.out.printf("Me chamo %s e não sou o líder. O líder é o %s.",nomeDoZNodeDesseProcesso, oMenor);
    }

    }
    
}


