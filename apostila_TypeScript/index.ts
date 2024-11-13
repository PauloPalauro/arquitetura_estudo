// var n: number;

// var a; // no type -> Any

// var s = "Max"; // Contextual typing -> string

// n = 5; // valid because 5 is a number 

// a = 5; // valid because a is of type Any 

// a = "Hello"; // valid because a is of type Any

// console.log("abc")



/*
Esse código TypeScript cria um objeto person que simula uma pessoa com uma propriedade age (idade) e possui dois métodos para aumentar a idade: growOld e growOldL.

1. Definição da Função person:

Aqui, person é uma função que simula um construtor de objetos do tipo person. A função recebe dois parâmetros:

this: any é uma anotação que indica ao TypeScript que o contexto this pode ser qualquer coisa, permitindo que this seja usado dentro da função, mesmo que o TypeScript não saiba o tipo exato.

age: number é o parâmetro que representa a idade inicial da pessoa.
Dentro da função, this.age = age atribui a idade inicial passada como parâmetro para a propriedade age do objeto criado.

var person = function (this: any, age: number){
    this.age = age;

2. Métodos growOld e growOldL
A função person define dois métodos para aumentar a idade (age) em um ano, mas eles se comportam de maneiras diferentes devido ao uso de function e de arrow function (=>)

O método growOld é uma função regular (usando function() {}). Ele acessa o valor de this.age e incrementa em 1 (this.age++). Em seguida, imprime a nova idade no console com console.log(this.age).

Observação: Funções regulares possuem seu próprio contexto this que depende de como a função é chamada. Isso significa que, se growOld for chamado em um contexto diferente (por exemplo, como um callback em outro escopo), this pode apontar para outro objeto ou até mesmo ser undefined.

    this.growOld = function() {
        this.age++
        console.log(this.age);
    }

O método growOldL usa uma arrow function (() => {}). Arrow functions, diferentemente de funções normais, não criam seu próprio contexto this. Em vez disso, elas "herdam" o valor de this do escopo em que foram definidas.

No caso de growOldL, this sempre se referirá ao contexto onde person foi chamada, então this sempre será o objeto criado pela função person.


    this.growOldL = () => {
        this.age++
        console.log(this.age);
    }
}


3. Instanciando o Objeto p

Aqui, criamos uma nova instância de person, passando 1 como o valor inicial de age. O person as any está sendo usado para evitar erros de TypeScript, já que person não está declarada como uma classe, mas sim como uma função que simula um construtor.
O valor de age na nova instância p será 1.

var p = new (person as any)(1);


4. Chamando growOldL
Essa linha chama o método growOldL. Como growOldL é uma arrow function, o this dentro dela sempre se refere ao objeto p. Portanto, ele incrementa p.age de 1 para 2 e imprime 2 no console.

p.growOldL();

5. Imprimindo p.age
Após chamar p.growOldL(), p.age foi incrementado para 2, então essa linha imprime 2 no console.

console.log(p.age);

*/




/*  
Parâmetros: A função getAverage recebe dois parâmetros obrigatórios (a e b) e um parâmetro opcional (c). Todos são do tipo number.
Um parâmetro opcional é um parâmetro que não é obrigatório. No TypeScript, podemos indicar que um parâmetro é opcional colocando ? logo após o nome do parâmetro. Isso significa que o parâmetro pode ser passado ou não para a função.

function getAverage(a: number, b: number, c?: number ){
    var total = a + b;
    var average = total /2;

    if(c){
        total = total + c;
        average = total / 3;
    }
    return average;
}

console.log(getAverage(3, 5));
console.log(getAverage(3, 5, 7));



Parâmetro Rest (...a): A função getAverages usa o operador ... para receber um número variável de argumentos (a: number[]). Isso permite passar qualquer quantidade de números para a função.
O parâmetro rest permite que uma função aceite um número variável de argumentos. É representado com ... antes do nome do parâmetro, e esses argumentos são acessados como um array dentro da função.
Quando usamos o operador ..., estamos dizendo ao TypeScript que ele deve agrupar todos os argumentos passados para esse parâmetro em um array.

O : number fora dos parênteses, após os parâmetros da função somarNumeros(...numeros: number[]): number, indica o tipo de retorno da função no TypeScript.

function getAverages(...a: number[]):number {
    var average: number = 0;
    var total: number = 0;
    for(var i = 0; i < a.length; i++){
        total += a[i];
    }
    if (a.length > 0){
        average = total/a.length;
    }
    return average;
}

console.log(getAverages(3,5));
console.log(getAverages(1,2,3,4,5,6,7,8,9,10));
*/


/*
Esse código usa uma técnica chamada sobrecarga de função (ou function overloading) no TypeScript. Essa técnica permite definir várias "assinaturas" para uma função com diferentes tipos de parâmetros. Vou explicar em detalhes como esse código funciona.

Aqui, definimos três "assinaturas" diferentes para a função getTotal. Cada uma dessas assinaturas especifica um conjunto de tipos que a função getTotal pode aceitar:

- A primeira assinatura aceita três parâmetros do tipo string e retorna um number.
- A segunda assinatura aceita três parâmetros do tipo number e também retorna um number.
- A terceira assinatura aceita os tipos number, string, e number nos três parâmetros, nessa ordem, e retorna um number.

Essas assinaturas são declarações de quais combinações de tipos getTotal aceita, mas elas não têm implementação própria. Elas servem como "promessas" ao TypeScript de quais tipos serão aceitos.

function getTotal(a: string, b: string, c:string): number;
function getTotal(a: number, b: number, c:number): number;
function getTotal(a: number, b: string, c:number): number;



A implementação da função real vem logo após as assinaturas de sobrecarga. Ela usa a: any, b: any, e c: any, permitindo que getTotal aceite qualquer tipo para esses parâmetros.

A função usa parseInt(a, 10), parseInt(b, 10), e parseInt(c, 10) para converter os valores de a, b, e c em inteiros de base 10.
Em seguida, a função soma os valores inteiros e retorna o resultado.
Isso funciona porque a função garante que todos os parâmetros (seja number ou string) serão convertidos para number, garantindo que o retorno seja sempre um número (number), como esperado pelas assinaturas de sobrecarga.

function getTotal(a: any, b:any, c:any): number {
    var total = parseInt(a,10) + parseInt(b,10) + parseInt(c, 10);
    return total;
}

var result = getTotal(2, 2, 2);
console.log(result);

result = getTotal("3","3", "3");
console.log(result);

result = getTotal(4,"4",4);
console.log(result);

Como Funciona a Sobrecarga
O TypeScript usa as assinaturas de sobrecarga para verificar os tipos de cada chamada à função getTotal. Com base nos tipos dos argumentos fornecidos, ele determina qual assinatura usar e verifica se a chamada é válida.

A implementação única com parâmetros do tipo any faz com que a função seja flexível o suficiente para lidar com os diferentes tipos de argumentos, conforme definido pelas sobrecargas.

Por Que Usar Sobrecarga?

A sobrecarga é útil para:

Permitir que a função aceite várias combinações de tipos de parâmetros.
Fornecer segurança de tipo sem precisar criar várias versões da função.
Tornar o código mais legível e previsível para outros desenvolvedores que usam essa função.

Resumo
Este código demonstra como o TypeScript permite que uma única função getTotal aceite diferentes combinações de tipos de argumentos e garante que os valores retornados estejam de acordo com a segurança de tipos, sem criar múltiplas implementações.

A sobrecarga oferece:

Maior segurança de tipo (validação em tempo de compilação).
Melhor autocompletar e documentação.
Proteção contra tipos inesperados.
Assim, mesmo que usar apenas any funcione, a sobrecarga oferece vantagens importantes em manutenção e segurança de tipos, tornando-se mais útil em cenários complexos ou em grandes projetos.

*/


/*
1. Interface IStudent

A interface IStudent define a estrutura que um objeto Student (estudante) deve ter. Em TypeScript, uma interface permite descrever a forma de um objeto, especificando quais propriedades ele deve ou pode ter.

Explicação das Propriedades:
id: number — O estudante deve ter uma propriedade id do tipo number.
name: string — O estudante deve ter uma propriedade name do tipo string.
onLeave?: boolean — onLeave é uma propriedade opcional (?). Isso significa que o objeto Student pode ou não incluir essa propriedade. Quando presente, onLeave deve ser um valor booleano (true ou false).
Essa interface pode ser útil para garantir que objetos que representam estudantes sigam essa estrutura, ajudando a evitar erros e melhorando a documentação do código.

interface IStudent {
    id: number;
    name: string;
    onLeave?: boolean;
}

2. Função printStudent

A função printStudent recebe um parâmetro s do tipo IStudent.
Essa função espera que o parâmetro s seja um objeto que siga a estrutura definida por IStudent. Isso significa que s deve ter, no mínimo, as propriedades id e name, e opcionalmente onLeave.

function printStudent(s: IStudent) {
}


3. Interface searchFunction
Essa interface descreve o tipo de uma função. Em TypeScript, além de descrever objetos, uma interface pode ser usada para descrever a assinatura de uma função. Isso é útil para garantir que uma função específica siga um formato esperado.
Explicação da Assinatura da Função:

(source: string, subString: string): boolean — Esta é a definição da assinatura da função:
A função deve ter dois parâmetros: source e subString, ambos do tipo string.
A função deve retornar um valor do tipo boolean.
Essa interface garante que qualquer função do tipo searchFunction aceite dois parâmetros string e retorne um boolean

interface searchFunction {
    (source: string, subString: string):boolean
}


4. Implementação searchFunctionImpl
Aqui, estamos criando uma variável searchFunctionImpl do tipo searchFunction. Isso significa que a função atribuída a searchFunctionImpl deve seguir a assinatura descrita na interface searchFunction.

A função anônima (s, ss) => { return true; } é atribuída a searchFunctionImpl.
Essa função aceita dois parâmetros s e ss (ambos string, conforme a interface searchFunction exige) e retorna um valor boolean (true).

var searchFunctionImpl: searchFunction = function (s, ss){
    return true;
}

*/


/*
A classe Student é uma classe base que possui uma propriedade privada name e um método print.

Propriedade name: Declarada como private, o que significa que só pode ser acessada dentro da classe Student. Isso impede que o nome seja acessado ou modificado fora da classe.

Construtor: O construtor recebe name e age como parâmetros. Embora age seja um parâmetro do construtor, ele não é armazenado como uma propriedade da classe. Ele apenas serve para cumprir a assinatura do construtor e poderia ser usado para outras funcionalidades, se necessário.

Método print: O método print imprime o valor da propriedade name no console. Como name é privado, só é acessível dentro da classe através desse método.

class Student {
    private name: string;

    constructor(name: string, age: number){
        this.name = name;
    }

    print(){
        console.log(this.name);
    }
}

A classe SpecialStudent estende Student, o que significa que ela herda todas as propriedades e métodos de Student.

Construtor: O construtor de SpecialStudent recebe nome e age como parâmetros e chama o construtor da classe base (Student) usando super(nome, age). Isso é necessário, pois Student exige esses parâmetros para inicializar a propriedade name.

Método print: SpecialStudent sobrescreve o método print da classe base. Em vez de exibir o nome do estudante, ele imprime "Estudante especial". Essa é uma demonstração de polimorfismo: SpecialStudent redefine o comportamento do método print.

Função do super: Chamar o construtor da classe base para inicializar propriedades herdadas e garantir a integridade da herança.

Necessário: Sempre que a classe derivada tem um construtor, ela deve chamar super() antes de acessar this.

Resultado: Permite que SpecialStudent herde e inicialize corretamente as propriedades da classe Student.

class SpecialStudent extends Student {
    constructor(nome: string, age: number){
        super(nome, age);
    }

    print(){
        console.log("Estudante especial");
    }
}

var estudante: Student = new Student("João", 23);
estudante.print();

var est_especial: SpecialStudent = new SpecialStudent("Maria", 18);
est_especial.print();


Aqui, est_especial2 é declarado como do tipo Student, mas é instanciado como SpecialStudent.

Esse é um exemplo de polimorfismo: embora est_especial2 seja do tipo Student, ele se comporta como SpecialStudent em tempo de execução.

Como SpecialStudent tem seu próprio método print, o método sobrescrito é chamado, então "Estudante especial" é impresso no console.

var est_especial2: Student = new SpecialStudent("jose", 15);
est_especial2.print();

*/


/*

Este código define uma classe Pessoa em TypeScript que representa uma pessoa com propriedades e métodos específicos, incluindo um método protegido, uma propriedade somente leitura, e propriedades privadas. Vou explicar cada parte detalhadamente.

1. Propriedades da Classe Pessoa

private cpf, private nome, private sobrenome: Essas propriedades são privadas, o que significa que só podem ser acessadas ou modificadas dentro da própria classe Pessoa. Nenhuma outra parte do código fora da classe pode acessá-las diretamente.

readonly idade: A propriedade idade é declarada como somente leitura (readonly). Isso significa que, uma vez definida no construtor, ela não pode ser alterada. O valor de idade é inicializado no construtor, mas não pode ser modificado posteriormente, garantindo que a idade da pessoa permaneça constante após a criação do objeto.

class Pessoa {
    private cpf: string;
    private nome: string;
    private sobrenome: string;
    readonly idade: number;


    2. Construtor da Classe Pessoa

    O construtor recebe os parâmetros cpf, nome, sobrenome, e idade e os atribui às propriedades correspondentes da classe. Essa é a única oportunidade de definir a propriedade idade, devido ao modificador readonly.


    constructor(cpf: string, nome:string, sobrenome: string, idade: number){
        this.cpf = cpf;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.idade = idade;

    }

    3. Métodos Públicos

    getNomeCompleto(): Este método é público (public), portanto, pode ser acessado de fora da classe. Ele retorna uma string contendo o nome completo da pessoa (nome e sobrenome).

    getCPF(): Este método público retorna o valor do cpf. Como cpf é uma propriedade privada, o método getCPF() permite que outros objetos acessem seu valor sem violar o encapsulamento da propriedade.

    public getNomeCompleto(): string {
        return `${this.nome} ${this.sobrenome}`;

    }

    public getCPF(): string{
        return this.cpf;
    }

    4. Método Protegido setCPF

    O método setCPF é declarado como protegido (protected), o que significa que ele pode ser acessado:

    Dentro da própria classe Pessoa.
    Em subclasses (classes que estendem Pessoa).

    O método setCPF realiza uma validação simples: se o CPF fornecido é uma string vazia ou undefined, ele lança um erro. Caso contrário, ele atualiza a propriedade cpf da pessoa.

    protected setCPF(cpf: string){
        if(!cpf){
            throw new Error("CPF invalido");
        }
        this.cpf = cpf;
    }
}
*/


/*
Esse código define uma classe Employee que usa uma propriedade e um método estáticos (static). Vou explicar em detalhes como funciona essa implementação e corrigir um pequeno erro nas chamadas dos métodos no final.

class Employee{

    1. Propriedade Estática headcount 

    headcount é uma propriedade estática (static), o que significa que ela pertence à própria classe Employee, e não a instâncias individuais da classe.
    A propriedade é inicializada com o valor 0.
    Como headcount é private, ela só pode ser acessada dentro da própria classe Employee, mas não diretamente de fora.

    private static headcount: number = 0;


    2. Construtor da Classe Employee

    O construtor recebe três parâmetros: firstname, lastname e jobTitle, todos do tipo string.
    Esses parâmetros são definidos com private no construtor, então se tornam automaticamente propriedades privadas da instância.
    Incremento do headcount: Sempre que uma nova instância de Employee é criada, Employee.headcount++ incrementa a contagem de headcount em 1. Isso permite que headcount registre quantas instâncias de Employee foram criadas.

    constructor(private firtsname: string, private lastname: string, private jobTitle: string){

        Employee.headcount++;
    }

    public static getHeadcount(): number{
        return Employee.headcount
    }

}

3. Instanciação e Chamada do Método Estático

Criação da Instância pedro: A linha var pedro = new Employee("Pedro", "Silva", "Dev Front-End"); cria uma nova instância de Employee, o que incrementa Employee.headcount em 1. Agora, headcount terá o valor 1.

Chamada do Método Estático:

Correção: Para acessar o método getHeadcount, você precisa chamá-lo como uma função: Employee.getHeadcount() (com parênteses). No código original, ele foi escrito como console.log(Employee.getHeadcount);, o que tentaria acessar a função sem chamá-la.
Erro na Instância pedro: console.log(pedro.getHeadcount); está incorreto porque getHeadcount é um método estático e, portanto, deve ser acessado pela própria classe (Employee), não pelas instâncias dela.


var pedro = new Employee("Pedro", "Silva", "Dev Front-End");
console.log(Employee.getHeadcount);
console.log(pedro.getHeadcount);

*/


/*
1. Classe Abstrata A

Classe Abstrata: A é uma classe abstrata porque é declarada com a palavra-chave abstract. Classes abstratas servem como "modelos" e não podem ser instanciadas diretamente. Elas devem ser estendidas por outras classes.

Método foo: O método foo não é abstrato, então ele é implementado diretamente dentro de A. Esse método chama o método bar e retorna seu resultado.

Método Abstrato bar: bar é um método abstrato, indicado pela palavra-chave abstract. Isso significa que bar não tem implementação em A e deve ser implementado em qualquer classe que estenda A.

abstract class A {
    foo(): number { return this.bar(); }
    abstract bar(): number;
}

2. Tentativa de Instanciar A

Como A é uma classe abstrata, o TypeScript não permite criar uma instância diretamente dela. O compilador gera um erro (Cannot create an instance of the abstract class 'A'). Para usar A, precisamos estendê-la com uma classe concreta que implemente o método bar.

var a = new A();


3. Classe B Extendendo A

B é uma classe concreta que estende A, o que significa que B herda todas as propriedades e métodos de A.
Como A tem um método abstrato bar, a classe B deve implementar bar para ser válida. A implementação de bar em B simplesmente retorna o número 1.

class B extends A {
    bar() { return 1; }
}


Quando b.foo() é chamado:

foo chama o método bar.
Em B, bar retorna 1.
Portanto, foo retorna 1, que é impresso no console.

var b = new B();
console.log(b.foo());

Classes Abstratas: Não podem ser instanciadas diretamente e são usadas para definir classes base que outras classes irão estender.
Métodos Abstratos: Devem ser implementados nas classes derivadas.

*/

/*

Módulos Internos, chamados hoje de namespaces em TypeScript, são uma forma de agrupar e encapsular código dentro de um único arquivo ou em múltiplos arquivos conectados. Eles eram utilizados antes que o sistema de módulos de ECMAScript (ES6) se tornasse o padrão.

1. Módulo Interno (Shipping)

Esse trecho cria um módulo interno Shipping que define:

Interface Ship: Descreve um objeto com name (do tipo string) e tons (do tipo number).
Classe NewShip: Implementa a interface Ship com valores padrão para name e tons.
Nota: O uso de módulos internos (module) foi comum em versões anteriores do TypeScript, mas atualmente é preferível usar módulos externos com export e import.

module Shipping {

    export interface Ship {
        name: string;
        tons: number;
}

    export class NewShip implements Ship {
        name = "New Ship";
        tons = 500;
    }
}

2. Módulo Externo (Exportando a Classe Ship)

Aqui, a classe Ship é exportada como um módulo externo. No entanto, ela tem o mesmo nome que a interface Ship dentro do módulo interno Shipping, o que pode causar confusão.

Para evitar conflitos de nomenclatura, podemos renomear essa classe para algo como ExportedShip ou dar outro nome ao módulo interno.

Módulos Externos referem-se ao sistema de módulos moderno de ECMAScript (ES6), no qual o código é dividido em arquivos separados, e cada arquivo pode exportar variáveis, funções, classes, ou objetos que outros arquivos podem importar. Esse sistema é amplamente usado hoje em TypeScript e JavaScript.

export class Ship {
    name = "New Ship";
    tons = 500;
}

import Shipping = require('Ship')

var s = new Shipping.Ship();

*/

/*
Esse código define uma classe genérica MyContainer<T> em TypeScript. Vamos analisar e explicar cada parte e verificar se há algum erro ou melhoria necessária.

1. Classe Genérica MyContainer<T>

Genérico <T>: MyContainer é uma classe genérica, onde <T> representa um tipo que será determinado no momento da criação de uma instância da classe. Isso permite que MyContainer seja reutilizável com diferentes tipos de dados.

Propriedade array: T[]: A propriedade array é um array de tipo T, que será definido quando a instância for criada. Por exemplo, se criarmos MyContainer<number>, array será do tipo number[].

Construtor: Recebe um array do tipo T[] e o atribui à propriedade array. Isso permite inicializar MyContainer com um array de qualquer tipo definido na instância.

Método add(item: T): Recebe um item do tipo T e o adiciona ao array array usando o método push. Como T representa o tipo da instância, esse método garante que somente itens do mesmo tipo de array possam ser adicionados, promovendo a segurança de tipos.

class MyContainer<T> {
    private array: T[];

    constructor(array: T[]) {
        this.array = array;
    }

    add(item: T) {
        this.array.push(item);
    }

}

2. Instanciação e Uso

Explicação e Correção
Instanciação: Aqui, strContainer é criado como MyContainer<number>, o que significa que T será do tipo number. Portanto, array será um number[].
Método add: Como T é number para esta instância, add espera um number como argumento, e strContainer.add(2); funciona sem problemas

var strContainer = new MyContainer<number>([1]);
strContainer.add(2);

*/
