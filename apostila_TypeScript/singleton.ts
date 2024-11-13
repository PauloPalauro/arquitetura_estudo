/*
Singleton é um padrão de projeto de software (do inglês Design Pattern). Este padrão garante a existência de apenas uma instância de uma classe, mantendo um ponto global de acesso ao seu objeto.

Alguns projetos necessitam que algumas classes tenham apenas uma instância. Por exemplo, em uma aplicação que precisa de uma infraestrutura de log de dados, pode-se implementar uma classe no padrão singleton. Desta forma existe apenas um objeto responsável pelo log em toda a aplicação que é acessível unicamente através da classe singleton.

Quando você necessita de somente uma instância da classe, por exemplo, a conexão com banco de dados, vamos supor que você terá que chamar diversas vezes a conexão com o banco de dados em um código na mesma execução, se você instanciar toda vez a classe de banco, haverá grande perda de desempenho, assim usando o padrão singleton, é garantida que nesta execução será instânciada a classe somente uma vez. Lembrando que este pattern é considerado por muitos desenvolvedores um antipattern, então, cuidado onde for utilizá-lo


Como fazer a implementação do Singleton
1. Deixar o construtor privado, pois assim ninguém deve conseguir instanciar a classe, apenas o próprio Singleton.

2. Criar um atributo privado e estático do mesmo tipo da classe (instance). Algumas linguagens não tipadas não irão precisar do tipo, caso do PHP, por exemplo.

3. Método getInstance() é o principal ponto da classe. Ele verifica se a variável instance já foi iniciada, caso não tenha sido, ele faz sua criação pela primeira e única vez.

4. Para fazer a conexão, devemos chamar o getInstance da seguinte forma: ClasseSingleton.getInstance().


Benefícios
Permite o controle sobre como e quando os clientes acessam a instância.

Várias classes singleton podem obedecer uma mesma interface, permitindo assim que um singleton em particular seja escolhido para trabalhar com uma determinada aplicação em tempo de execução.

Com apenas uma implementação interna do singleton pode-se fazer com que o singleton crie um número controlado de instâncias.
É mais flexível que métodos estáticos por permitir o polimorfismo.

Contras

Acoplamento: Usando Singleton você estará acoplando o seu código em uma implementação estática e específica. Isso faz o seu código dependente dessa classe e impede, por exemplo, criar mocks em testes unitários.

Escopo: Se você por alguma razão decidir que para determinado componente da aplicação você precisa de outra implementação terá que alterar manualmente todas as classes.

Falsa segurança: No java, por exemplo, não existe uma classe apenas por JVM. O conceito de carregamento de classes em java é feito por ClassLoader.

*/

/*
Classe Singleton
A classe Singleton implementa um Singleton básico:

Atributo estático instance: Esta propriedade estática (static instance: Singleton) armazena a única instância da classe Singleton. Ela é privada para que outras partes do código não possam acessá-la diretamente.

Construtor privado: O construtor da classe (private constructor()) é privado, impedindo a criação de novas instâncias de Singleton com o operador new fora da própria classe.

Método estático getInstance(): Este método (public static getInstance(): Singleton) verifica se uma instância de Singleton já existe. Se não, cria uma nova instância e a atribui à propriedade instance. Depois, retorna essa instância. Isso garante que sempre que getInstance() for chamado, será retornada a mesma instância da classe Singleton.

Método executar(): Este método (public executar(): void) apenas exibe a mensagem "Executando algo..." no console.

*/
class Singleton {
    private static instance: Singleton;
  
    private constructor() {}
  
    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }
  
    public executar(): void {
      console.log("Executando algo...");
    }
  }
  

  /*
  Classe CacheService
    A classe CacheService implementa um Singleton com uma estrutura de cache:

    Atributo estático instance: Semelhante à classe Singleton, esta propriedade estática (static instance: CacheService) armazena a única instância de CacheService e é privada.

    Atributo cache: Esta propriedade (private cache: Map<string, any>) armazena o cache de dados em um Map. O Map armazena pares chave-valor, permitindo que valores sejam recuperados com base em suas chaves.

    Construtor privado: O construtor (private constructor()) é privado, o que previne a criação de múltiplas instâncias de CacheService.

    Método estático getInstance(): Assim como em Singleton, este método (public static getInstance(): CacheService) verifica se uma instância de CacheService já existe. Se não, cria uma nova e a retorna, garantindo que somente uma instância de CacheService seja criada.

    Método set(key: string, value: any): Este método (public set(key: string, value: any): void) adiciona um par chave-valor ao cache.

    Método get(key: string): Este método (public get(key: string): any) recupera o valor associado a uma chave específica.
  */

  export default Singleton;
  
  // CacheService.ts
  class CacheService {
    private static instance: CacheService;
    private cache: Map<string, any>;
  
    private constructor() {
      this.cache = new Map();
    }
  
    public static getInstance(): CacheService {
      if (!CacheService.instance) {
        CacheService.instance = new CacheService();
      }
      return CacheService.instance;
    }
  
    public set(key: string, value: any): void {
      this.cache.set(key, value);
    }
  
    public get(key: string): any {
      return this.cache.get(key);
    }
  }
  
  

  /*
  // Teste do Singleton

    Esse loop cria 10 variáveis singleton e, em cada iteração, chama o método executar() na instância de Singleton. Contudo, devido ao Singleton, sempre é usada a mesma instância, então "Executando algo..." é impresso 10 vezes no console usando uma única instância de Singleton.
  */
  for (let i = 0; i < 10; i++) {
    let singleton: Singleton = Singleton.getInstance();
    singleton.executar();
  }


  /*
   Teste do CacheService

   Neste exemplo, obtemos a única instância de CacheService, armazenamos um valor '123456' com a chave 'João', e depois recuperamos esse valor com cache.get('João'), que exibe '123456' no console.
  */
  const cache = CacheService.getInstance();
  cache.set('João', '123456');
  console.log(cache.get('João'));
  

  /*
  Explicação do Padrão Singleton no Código

  Ambas as classes (Singleton e CacheService) garantem que:

  Apenas uma instância da classe seja criada, pois o construtor privado impede a criação direta de novas instâncias.
  Existe um ponto de acesso global para obter essa instância, através do método estático getInstance().
  Esse padrão é útil para recursos que devem ser únicos e compartilhados em toda a aplicação, como cache, conexão com banco de dados, ou loggers.

  Conclusão
  Esse código mostra uma implementação eficiente do Singleton para duas finalidades:

  Singleton: uma classe geral de Singleton com um simples método executar().
  CacheService: uma classe Singleton que também serve como cache para armazenar e recuperar dados.
  Ambas as implementações seguem o padrão Singleton ao restringir a criação de múltiplas instâncias e oferecendo um ponto de acesso global.
  */