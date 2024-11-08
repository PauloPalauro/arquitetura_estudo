// Barramento
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const eventos = [];

app.post("/eventos", (req, res) => {
    const evento = req.body;  
    eventos.push(evento);

    // Tenta enviar o evento para cada microsserviço individualmente
    axios.post("http://lembretes-clusterip-service:4000/eventos", evento).catch((err) => {
        console.log("Erro ao enviar evento para o serviço na porta 4000:", err.message);
    });

    // axios.post("http://observacoes:5000/eventos", evento).catch((err) => {
    //     console.log("Erro ao enviar evento para o serviço na porta 5000:", err.message);
    // });

    // axios.post("http://consulta:6000/eventos", evento).catch((err) => {
    //     console.log("Erro ao enviar evento para o serviço de consulta na porta 6000:", err.message);
    // });

    // axios.post("http://classificacao:7000/eventos", evento).catch((err) => {
    //     console.log("Erro ao enviar evento para o serviço na porta 7000:", err.message);
    // });

    res.status(200).send({msg: "ok"});
});

app.get("/eventos", (req, res) => {
    res.send(eventos);
});

app.listen(10000, ()=> {
    console.log("Barramento de eventos. Porta 10000.");
});
