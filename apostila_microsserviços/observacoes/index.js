const express = require("express")
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const observacoesPorLembreteId = {};

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes = observacoesPorLembreteId[observacao.lembreteId];
        const obsParaAtualizar = observacoes.find(o => o.id === observacao.id)
        obsParaAtualizar.status = observacao.status;

        axios.post("http://localhost:10000/eventos", {
            tipo: "ObservacaoAtualizada",
            dados: {
                id: observacao.id,
                texto: observacao.texto,
                lembreteId: observacao.lembreteId,
                status: observacao.status
            }
        })
    }
}


/*
:id é um placeholder
example: /lembretes/123/observacoes
*/
app.get("/lembretes/:id/observacoes", (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

/*
req.params.id -> pega o id que veio na URL (:id)

"ObservacoesDoLembrete" 
     -> Se existir um array de observações associado ao id que foi extraído da URL (req.params.id), ele será retornado.
     -> Se não houver observações para esse lembrete (ou seja, observacoesPorLembreteId[req.params.id] for undefined), a expressão || [] garante que observacoesDoLembrete seja inicializado como um array vazio ([])

"push" -> Adiciona a nova observação ao lembrete

"observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;" 
    -> Após adicionar a nova observação, o array atualizado de observações é armazenado novamente no objeto observacoesPorLembreteId, associando-o ao id do lembrete.
*/
app.put("/lembretes/:id/observacoes", async (req, res) => {

    // Criando um uuid novo para a observacao
    const idObs = uuidv4();
    const { texto } = req.body;

    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];

    observacoesDoLembrete.push({id: idObs, texto, status: "aguardando"}); 

    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;

    await axios.post("http://localhost:10000/eventos", {
        tipo : "ObservacaoCriada",
        dados: {
            id: idObs, 
            texto, 
            lembreteId: req.params.id,
            status: "aguardando"
        }
    })

    res.status(201).send(observacoesDoLembrete);
})

app.post("/eventos", (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    }
    catch (err){}
    res.status(200).send({mdsg: "ok"})
})


app.listen(5000, () => {
    console.log("Observações na Porta: 5000");
})