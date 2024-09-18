//const: declarando constantes
const nome = "Jose";
const idade = 27;


const greeting = "say Hi";
// greeting = "say Hello instead"; ->  erro: atribuição a uma variável constante. 

/*
const greeting = "say Hi";
const greeting = "say Hello instead";// erro: identificador 'greeting' já foi declarado
*/


// ----------------------------------------------//


//let: variável local com escopo de bloco
let a = 2;
let b = "abc";


let ola_1 = "say Hi";
ola_1 = "say Hello instead";
console.log(ola_1) // say Hello instead


let ola_2 = "say Hi";
    if (true) {
        let ola_2 = "say Hello instead";
        console.log(ola_2); //  "say Hello instead"
    }
console.log(ola_2); // "say Hi"



let ola_3 = "say Hi";
let times = 4;
if (times > 3) {
     let hello = "say Hello instead";
     console.log(hello);// dirá "say Hello instead"
 }
// console.log(hello) -> erro hello não está definido


// ----------------------------------------------//


//var: seu escopo é a função em que foi declarada ou global
var c = 2 + 3;
var d = "abcd"


var linguagem = "Javascript";
console.log("Aprendendo " + linguagem); // 'Aprendendo Javascript'

var linguagem = "Java";
console.log(`Aprendendo, ${linguagem} `); // 'Aprendendo, Java'


// ----------------------------------------------//


// Coerção de tipos

const n1 = 2;
const n2 = '2';

const n3 = n1 + n2;
console.log(n3) // coerção implicita --> concatenação

const n4 = n1 + Number(n2);
console.log(n4) // coerção explicita --> soma


// ----------------------------------------------//


// Comparação

// ===
var num = 0;
var obj = new String("0");
var str = "0";

console.log(num === num); // true
console.log(obj === obj); // true
console.log(str === str); // true

console.log(num === obj); // false
console.log(num === str); // false
console.log(obj === str); // false
console.log(null === undefined); // false
console.log(obj === null); // false
console.log(obj === undefined); // false


// == 

var num = 0;
var obj = new String("0");
var str = "0";

console.log(num == num); // true
console.log(obj == obj); // true
console.log(str == str); // true

console.log(num == obj); // true
console.log(num == str); // true
console.log(obj == str); // true
console.log(null == undefined); // true


// ----------------------------------------------//


// Vetores

v1 = []; // incializando um array vazio
v2 = new Array(); // incializando um array vazio de outra forma
v3 = [2, "abc" , true, NaN] // inicializando um array com elementos


console.log(v1.length) // 0
console.log(v2.length) // 0
console.log(v3.length) // 4

// itererando um array
for( let i = 0; i < v3.length; i++) {
    console.log(v3[i]);
}


// Métodos utilitários

const nomes = [ "Jose", "Maria", "Joaquim", "Antonio", "Andre" ];
const nomesComA = nomes.filter(n => n.startsWith('A')); 
console.log(nomesComA) // [ 'Antonio', 'Andre' ]


const res = nomes.map(nome => nome.charAt(0));
console.log(res) //  'J', 'M', 'J', 'A', 'A' ]


const todosComecamComA = nomes.every(n => n.startsWith('A'));
console.log(todosComecamComA) // false


const valores = [1, 2, 3, 4, 5];
const soma = valores.reduce((ac, v) => ac + v);
console.log(soma); // 15


// ----------------------------------------------//

// Funções

function hello(name) {
    console.log(`Hello, ${name}`);
}
hello("Jose") // Hello, Jose


function soma2 (a, b) {
    return a + b;
}
const resul = soma2(2, 3);
console.log(resul); // 5


const dobro = function (n) {
    return n * 2;
}
const result = dobro(3);
console.log(result); // 6   

const triplo = function (n = 5){
    return n * 3;
}
console.log(triplo()); // 15
console.log(triplo(3)); // 9


const ola_4 = () => console.log("say Hi");
ola_4();

const dobro2 = (n) => n * 2;
console.log(dobro2(3)); // 6


function g () {
    function outraFuncao(){
        console.log("Fui criada por g");
    }
   return outraFuncao;
}

g(); // Retorna a função `outraFuncao`, mas não a executa.
const gResult = g() // gResult agora é a função `outraFuncao`.
gResult() // Agora você está executando `outraFuncao`.
g()() // Agora você está executando `outraFuncao` tambem.
 

function ola(){
    let nome = 'João';
    return function (){
        console.log ('Olá, João');
    }
}
ola()();



// ----------------------------------------------//

//JSON

let pessoa = {
    nome : 'Jose',
    idade : 27, 
    endereco: {
        logradouro: 'Rua das Margaridas',
        numero: 123,
    },
}; 

console.log(
    `Sou ${pessoa.nome}, tenho ${pessoa.idade} anos, e moro na ${pessoa.endereco.logradouro}, numero ${pessoa["endereco"]["numero"]}.`
); // "Sou Jose, tenho 27 anos, e moro na Rua das Margaridas, numero 123."



let concessionaria = {
    cnpj: "00011122210001-45",
    endereco: {
        logradouro: "Rua A",
        numero: 10,
        bairro: "Vila J",
    },

    veiculos: [
        {
            marca: "Ford",
            modelo: "Ecosport",
            anoDeFabricacao: 2018,
        },
        {
            marca: "Chevrolet",
            modelo: "Onix",
            anoDeFabricacao: 2020,
        },
        {
            marca: "Volkswagen",
            modelo: "Nivus",
            anoDeFabricacao: 2020,
        },
    ],
};


for (let veiculo of concessionaria.veiculos) {
    console.log(`Marca: ${veiculo.marca}`);
    console.log(`Modelo: ${veiculo.modelo}`);
    console.log(`Ano de Fabricação: ${veiculo.anoDeFabricacao}`);
} 


let calculadora = {
    soma: (a, b) => a + b,
    subtrai: function(a, b) { return a - b; },
}

console.log(calculadora.soma(2, 3)); // 5
console.log(calculadora.subtrai(2, 3)); // -1




// ----------------------------------------------//


// Execução Síncrona e Assíncrona

// // Execução Síncrona, a função demorada() é computada para depois exibir o resultado, mesmo que não precise do resultado de "d2"
// function demorada(){
//     const atualMais2Segundos = new Date().getTime() + 2000

//     while (new Date().getTime() <= atualMais2Segundos);
//     const d2 = 8 + 4
//     return d2
// }   

// const a2 = 2 + 3
// const b2 = 5 + 9
// const d2 = demorada()


// const e = 2 + a2 + b2
// console.log(e)


// Execução Assíncrona, a função demorada() é computada depois de 500 milisegundos, e exibe o resultado imediatamente, enquanto o resto do executa normalmente
// function demorada() {
//     const targetTime = new Date().getTime() + 2000;
//     while (new Date().getTime() <= targetTime);
//     const d = 8+4
//     return d;
// }

// const a3 = 2 + 3
// const b3 = 5 + 9

// setTimeout(function(){
//     console.log(demorada())
//  }, 500)

// const e2 = a3 + b3
// console.log(e2)

    

// o setTimeout é enfileirado, para depois ser executado -> 1. "fora do timeout" 2. "dentro do setTimeout"
setTimeout(function (){
    console.log("dentro do setTimeout", 0);
})

const a4 = new Date().getTime() + 1000;

while (new Date().getTime() <= a4);
console.log("fora do timeout");


const fs = require("fs");
const abrirArquivo = function(nomeArquivo) {
    const exibirConteudo = function(erro, conteudo){
        if (erro) {
            console.log(erro);
        } else {
            console.log(conteudo.toString());
        }
    };

    fs.readFile(nomeArquivo, exibirConteudo);
};

abrirArquivo("arquivo.txt");



// ----------------------------------------------//


// Promises



/*

Esta função recebe um número como argumento e 
faz a soma de todos os números de 1 até o valor fornecido.

Ela retorna uma Promise, que é usada para lidar com operações assíncronas.

Promise é um objeto que representa a eventual conclusão ou falha de uma operação assíncrona.

New Promise() -> Se o cálculo fosse demorado ou assíncrono, como esperar por um temporizador ou fazer uma requisição a um servidor, você ainda precisaria usar new Promise() para controlar quando resolver ou rejeitar a Promise.

Promise.resolve() -> quando você já tem o valor disponível e quer retornar uma Promise que já está resolvida.

*/

function calculoDemorado(numero) {
    return new Promise(function (resolve, reject) {
      console.log("Executando cálculo...");
      let res = 0;
      for (let i = 1; i <= numero; i++) {
        res += i;
      }
      resolve(res); // Chamado quando a operação termina com sucesso.
      console.log("Cálculo concluído!");
    });
  }
calculoDemorado(10)
    .then((resultado) => { // usado para manipular o resultado quando a Promise é resolvida. Resultado = Valor que foi passado para a função resolve()
        console.log(resultado) // 55
  })




function calculoRapidinho(numero) {
    // Retorna uma Promise já resolvida com o resultado do cálculo
    return Promise.resolve((numero * (numero + 1)) / 2);
  }
  
  // Chama a função calculoRapidinho e lida com o resultado usando then()
calculoRapidinho(10).then((resultado) => {
    console.log(resultado);  // Exibe o resultado no console (55)
  });
  
  // Essa linha é executada antes da Promise ser resolvida, por ser síncrona
  console.log('1. Esperando...');
  

  function calculoRapidinho(numero) {
    // Se o número for positivo ou zero, retorna uma Promise resolvida com o resultado
    return numero >= 0
      ? Promise.resolve((numero * (numero + 1)) / 2)  // Cálculo rápido usando a fórmula
      : Promise.reject("Somente valores positivos, por favor");  // Rejeita a Promise se o número for negativo
  }
  
  // Chamando a função com número positivo
  calculoRapidinho(10)
    .then((resultado) => {
      console.log(resultado);  // Exibe o resultado: 55
    })
    .catch((err) => {
      console.log(err);  // Tratamento de erro, caso a Promise seja rejeitada
    });
  
  // Chamando a função com número negativo
  calculoRapidinho(-1)
    .then((resultado) => {
      console.log(resultado);  // Isso não será executado porque o número é negativo
    })
    .catch((err) => {
      console.log(err);  // Exibe a mensagem de erro: "Somente valores positivos, por favor"
    });
  
  // Essa linha será exibida primeiro, porque é síncrona
  console.log("2. esperando...");



// ----------------------------------------------//


// Async e Await

/*

async: Você coloca a palavra-chave async antes de uma função para declarar que essa função irá retornar uma promessa.

await: Dentro de uma função async, você pode usar a palavra-chave await antes de uma chamada de função que retorne uma promessa. Isso faz com que a execução da função assíncrona pause até que a promessa seja resolvida, sem bloquear o restante do código.

*/ 

async function exemplo() {
    let promessa = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Resultado da promessa"), 1000);
    });
  
    let resultado = await promessa; // Pausa até a promessa ser resolvida
    console.log(resultado); // "Resultado da promessa" após 1 segundo
  }
  
  exemplo();


// Sem async/await


function exemplo() {
    let promessa = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Resultado da promessa"), 1000);
    });
  
    promessa
      .then(resultado => {
        console.log(resultado); // "Resultado da promessa" após 1 segundo
      })
      .catch(erro => {
        console.error('Erro:', erro);
      });
  }
  
  exemplo();
  

