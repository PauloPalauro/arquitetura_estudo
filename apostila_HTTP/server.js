// Importa o módulo http do Node.js para criar um servidor HTTP
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

// Inicializa uma nova aplicação Express
const app = express();

// Inicializa o contador para atribuir IDs únicos aos clientes
let contador = 3;

// Cria uma lista inicial de clientes com IDs, nomes e e-mails
const clientes = [
    { id: 1, nome: 'Joao', email: 'joao@email.com' },
    { id: 2, nome: 'Cristina', email: 'cristina@email.com' }
];

// Configura o Express para usar o body-parser para analisar requisições JSON
app.use(bodyParser.json());

// Define a configuração de porta para a aplicação Express
app.set('port', 3000);

// Define uma rota GET para '/teste' que responde com "Olá!"
app.get('/teste', (req, res) => {
    res.send('Olá!');
});

// Define uma rota GET para '/clientes' que responde com a lista de clientes em formato JSON
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Define uma rota POST para '/clientes' que adiciona um novo cliente à lista
app.post('/clientes', (req, res) => {
    // Obtém os dados do novo cliente do corpo da requisição
    const cliente = req.body;
    
    // Adiciona o novo cliente à lista com um ID único
    clientes.push({ id: ++contador, nome: cliente.nome, email: cliente.email });
    
    console.log(clientes);
    
    // Responde com a lista de clientes atualizada e um status HTTP 201 (Criado)
    res.status(201).json(clientes);
});

// Cria um servidor HTTP usando a aplicação Express
const server = http.createServer(app);

// Faz o servidor escutar na porta especificada e exibe uma mensagem quando o servidor estiver rodando
server.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});
