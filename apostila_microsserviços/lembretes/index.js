const express = require("express")
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const lembretes = {};
contador = 0;
/*
req -> Acessar dados da requisição feita ao servidor
res -> Envia dados de resposta para o cliente
*/
app.get ('/lembretes', (req, res) => {
    res.send(lembretes)
});

app.put ("/lembretes", (req, res) => {
    contador++
    const { texto } = req.body; // Pega o corpo da requisição, pode ser usado sem as "{}"
    lembretes[contador] = {contador, texto}; //adicionando uma nova entrada no Objeto lembretes == lembretes[1], lembretes[2]
    res.status(201).send(lembretes[contador]); // Envia a resposta ao cliente com o status HTTP 201 (Criado)

});


app.listen(4000, () => {
    console.log("Lembretes na Porta: 4000");
})