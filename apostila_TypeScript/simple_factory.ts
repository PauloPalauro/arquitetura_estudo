/*

O Simple Factory cria um objeto sem expor a lógica de instanciação ao cliente requisitante, ou seja, pense como uma fábrica na qual um objeto terá como responsabilidade a criação de outros objetos.

Além disso, uma fábrica pode ser invocada de várias maneiras, mas na maioria das vezes utiliza um método que pode retornar objetos com vários protótipos, ou seja, qualquer sub-rotina que ajude a criar esses objetos é considerada uma fábrica.

Apostila sobre o design pattern "Simple Factory" em TypeScript, que explora uma maneira de encapsular a criação de objetos e reduzir o acoplamento no código. Esse padrão organiza a lógica de criação de objetos dentro de uma classe dedicada, chamada de fábrica (factory), ao invés de instanciar diretamente as classes. Isso permite que o código principal fique focado no uso de objetos sem precisar saber detalhes de como são criados.

Para ilustrar a necessidade do padrão Simple Factory, o texto apresenta o exemplo de uma pizzaria. Inicialmente, o código para criar uma pizza é simples, mas à medida que novos sabores são adicionados, a lógica de criação torna-se complexa e dependente de estruturas condicionais if/else.

O padrão Simple Factory resolve este problema através da criação de uma classe dedicada à criação de objetos Pizza, chamada SimplePizzaFactory. Esta classe encapsula a lógica de criação, tornando o código mais modular e extensível.

O texto demonstra a implementação da SimplePizzaFactory, que recebe o tipo de pizza desejado como parâmetro e retorna o objeto Pizza correspondente. A classe PizzaStore utiliza a SimplePizzaFactory para criar pizzas sem se preocupar com os detalhes de implementação.

O texto conclui enfatizando que o Simple Factory é uma boa prática de programação, embora não seja considerado um Design Pattern formal. Apresenta ainda um diagrama de classes que ilustra a relação entre as classes Pizza, SimplePizzaFactory e PizzaStore.

Desvantagens do Uso do Operador

Embora o operador new seja essencial para a criação de objetos, o seu uso excessivo e direto no código pode levar a algumas desvantagens, principalmente no que diz respeito à flexibilidade e à manutenção do código. As fontes fornecidas ilustram essas desvantagens através do exemplo da pizzaria.

*/

/*
1. Definindo a Hierarquia de Pizzas

A classe Pizza é uma classe abstrata, ou seja, ela serve como base para outros tipos de pizza e define métodos comuns que todas as pizzas devem ter.

Nesta classe:

preparar é um método abstrato (ou seja, deve ser implementado por subclasses específicas).

assar, cortar e empacotar são métodos concretos que todas as subclasses também herdam.

As subclasses PizzaDeQueijo, PizzaDePepperoni, PizzaDeMolusco, e PizzaVegetariana estendem Pizza, cada uma implementando o método preparar com uma mensagem específica.

*/

abstract class Pizza {
    abstract preparar(): void;
    assar(): void {
        console.log('Assando a pizza...');
    }
    cortar(): void {
        console.log('Cortando a pizza...');
    }
    empacotar(): void {
        console.log('Empacotando a pizza...');
    }
}

class PizzaDeQueijo extends Pizza {
    preparar(): void {
        console.log('Preparando pizza de queijo...');
    }
}

class PizzaDePepperoni extends Pizza {
    preparar(): void {
        console.log('Preparando pizza de pepperoni...');
    }
}

class PizzaDeMolusco extends Pizza {
    preparar(): void {
        console.log('Preparando pizza de molusco...');
    }
}

class PizzaVegetariana extends Pizza {
    preparar(): void {
        console.log('Preparando pizza vegetariana...');
    }
}


/*
// src/SimplePizzaFactory.ts

2. Criando a Fábrica de Pizzas

A SimplePizzaFactory encapsula a lógica de criação de pizzas e decide qual tipo de Pizza instanciar com base no parâmetro tipo fornecido.

Neste método criarPizza:

O tipo de pizza é verificado com uma estrutura if/else.

Dependendo do valor de tipo, a fábrica cria a instância correta de Pizza (como PizzaDeQueijo ou PizzaDePepperoni) e a retorna.

Esse processo centraliza a criação dos objetos em um único lugar, o que facilita a manutenção e a adição de novos tipos de pizza sem modificar a lógica de quem usa as pizzas.

*/
class SimplePizzaFactory {
    criarPizza(tipo: string): Pizza | null {
        let pizza: Pizza | null = null;
        if (tipo === 'Queijo') pizza = new PizzaDeQueijo();
        else if (tipo === 'Pepperoni') pizza = new PizzaDePepperoni();
        else if (tipo === 'Molusco') pizza = new PizzaDeMolusco();
        else if (tipo === 'Vegetariana') pizza = new PizzaVegetariana();
        return pizza;
    }
}


/*
3. Usando a Fábrica na PizzaStore

A PizzaStore é onde as pizzas são solicitadas. Ela utiliza SimplePizzaFactory para criar pizzas, abstraindo completamente a lógica de criação para a fábrica. Assim, a PizzaStore só precisa saber qual tipo de pizza foi pedido e a ordem das etapas de preparo.

Aqui:

PizzaStore recebe uma instância de SimplePizzaFactory no construtor e usa essa instância para criar pizzas.

O método pedirPizza pede à fábrica uma pizza do tipo especificado e, em seguida, executa as etapas de preparação (preparar, assar, cortar, e empacotar).

pizza?. é uma forma de acessar o objeto pizza somente se ele não for null.


// src/PizzaStore.ts
*/

class PizzaStore {
    constructor(private simplePizzaFactory: SimplePizzaFactory) {}

    pedirPizza(tipo: string): Pizza | null {
        let pizza = this.simplePizzaFactory.criarPizza(tipo);
        pizza?.preparar();
        pizza?.assar();
        pizza?.cortar();
        pizza?.empacotar();
        return pizza;
    }
}

/*
// src/app.ts

4. Executando o Código

No arquivo app.ts, uma instância de PizzaStore é criada com uma SimplePizzaFactory. Então, pedirPizza é chamado para criar uma pizza do tipo "Molusco".

Neste caso:

A fábrica cria uma PizzaDeMolusco, e PizzaStore a prepara.

As mensagens dos métodos (preparar, assar, cortar, e empacotar) são exibidas no console, indicando cada etapa da criação e preparação da pizza.
*/

const pizzaStore = new PizzaStore(new SimplePizzaFactory());
console.log(pizzaStore.pedirPizza('Molusco'));


/* 

Resumo dos Benefícios

Encapsulamento de lógica de criação: A SimplePizzaFactory centraliza a criação das pizzas, facilitando modificações futuras.

Redução do acoplamento: PizzaStore não precisa conhecer as classes de cada tipo de pizza. Ela só interage com a fábrica.

Facilidade de manutenção e expansão: Novos tipos de pizza podem ser adicionados à fábrica sem alterar o código principal da PizzaStore.

O padrão Simple Factory é eficaz para simplificar a criação de objetos em cenários onde o tipo exato pode variar, tornando o código mais modular e organizado.

*/
