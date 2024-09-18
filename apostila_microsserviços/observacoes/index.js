const express = require("express")
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');

const app = express();
app.use(bodyParser.json());

const observacoesPorLembreteId = {};

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
app.put("/lembretes/:id/observacoes", (req, res) => {

    // Criando um uuid novo para a observacao
    const idObs = uuidv4();
    const { texto } = req.body;

    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];

    observacoesDoLembrete.push({id: idObs, texto}); 

    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;

    res.status(201).send(observacoesDoLembrete);
})

app.listen(5000, () => {
    console.log("Observações na Porta: 5000");
})