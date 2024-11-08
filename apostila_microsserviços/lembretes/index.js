const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const axios = require("axios");

app.use(bodyParser.json());

/*
{
  1: {
    id: 1,
    texto: 'Fazer café'
  },
  2: {
    id: 2,
    texto: 'ir à feira
  }
}
*/
const lembretes = {};
contador = 0;


/*
req -> Acessar dados da requisição feita ao servidor
res -> Envia dados de resposta para o cliente
*/
app.get('/lembretes', (req, res) => {
    res.json(lembretes)
})
  

app.put ("/lembretes", async (req, res) => {
    contador++
    const { texto } = req.body; // Pega o corpo da requisição, pode ser usado sem as "{}"
    lembretes[contador] = {contador, texto}; //adicionando uma nova entrada no Objeto lembretes == lembretes[1], lembretes[2]

    await axios.post("http://barramento:10000/eventos", {
        tipo: "LembreteCriado",
        dados: {
            contador,
            texto,
        },
    });

    
    res.status(201).send(lembretes[contador]); // Envia a resposta ao cliente com o status HTTP 201 (Criado)

});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({mdsg: "ok"})
})


app.listen(4000, () => {
  console.log('Nova versão')
  console.log("Agora usando o Docker Hub!!!!!");
  console.log("Lembretes na Porta: 4000");
})