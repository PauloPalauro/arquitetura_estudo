/*
Este PDF é um guia para o padrão de design Factory Method em TypeScript. O Factory Method é um padrão que define uma interface para criar objetos, mas permite que as subclasses decidam qual classe instanciar. Isso permite que uma classe delegue a criação de objetos às subclasses.

O PDF começa explicando como configurar um ambiente de desenvolvimento TypeScript. Em seguida, usa o exemplo de uma pizzaria para ilustrar o padrão Factory Method. O PDF apresenta o desafio de lidar com diferentes estilos de pizza regionais em uma franquia de pizzaria. A solução proposta é usar fábricas diferentes para cada região, cada uma criando pizzas no estilo dessa região.

Este código em TypeScript implementa o Factory Method, um padrão de design que permite criar objetos de uma família específica sem expor a lógica de criação. O exemplo ilustra uma cadeia de pizzarias, onde diferentes tipos de pizzas podem ser criadas em diferentes locais. O código é dividido em várias classes para pizzas, fábricas de pizzas e uma loja de pizzas que utiliza essas fábricas.

*/



/*
 src/Pizza.ts

1. Classe Pizza (Pizza.ts)

A classe Pizza é uma classe abstrata, que define o esqueleto de uma pizza. Contém métodos padrão como assar, cortar e empacotar, que todas as pizzas compartilham. A função preparar() é abstrata, o que significa que cada tipo específico de pizza (como queijo, pepperoni, etc.) implementará essa função de maneira única.

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


/*
2. Subclasses de Pizza

As subclasses implementam a função preparar de maneira específica para cada tipo de pizza:

Outras subclasses incluem PizzaDePepperoni, PizzaVegetariana, e PizzaDeMolusco, cada uma com uma implementação própria para o método preparar.

*/

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

class PizzaVegetariana extends Pizza {
    preparar(): void {
        console.log('Preparando pizza vegetariana...');
    }
}

class PizzaDeMolusco extends Pizza {
    preparar(): void {
        console.log('Preparando pizza de molusco...');
    }
}

/*
3. Pizzas Regionais Específicas

Essas subclasses representam pizzas com variações regionais específicas, como Nova York (NY) e Chicago:

Essas classes herdam de PizzaDeQueijo ou PizzaDePepperoni, mas alteram o comportamento de preparar para refletir características regionais.

*/
class PizzaDeQueijoDeNY extends PizzaDeQueijo {
    preparar(): void {
        console.log('Preparando pizza de queijo de NY...');
    }
}

class PizzaDePepperoniDeNY extends PizzaDePepperoni {
    preparar(): void {
        console.log('Preparando pizza de pepperoni de NY...');
    }
}

class PizzaDeQueijoDeChicago extends PizzaDeQueijo {
    preparar(): void {
        console.log('Preparando pizza de queijo de Chicago...');
    }
}

class PizzaDePepperoniDeChicago extends PizzaDePepperoni {
    preparar(): void {
        console.log('Preparando pizza de pepperoni de Chicago...');
    }
}


/*
4. Classe SimplePizzaFactory e Fábricas Específicas (SimplePizzaFactory.ts)

A classe abstrata SimplePizzaFactory define o método criarPizza, que será implementado pelas fábricas específicas para cada região.

As fábricas específicas (ex.: SimplePizzaFactoryNY, SimplePizzaFactoryChicago, SimplePizzaFactoryGeneral) implementam a criação de pizzas específicas de acordo com a região:

SimplePizzaFactoryNY cria pizzas ao estilo de Nova York (PizzaDeQueijoDeNY e PizzaDePepperoniDeNY).

SimplePizzaFactoryChicago cria pizzas ao estilo de Chicago (PizzaDeQueijoDeChicago e PizzaDePepperoniDeChicago).

SimplePizzaFactoryGeneral é uma fábrica geral que cria pizzas genéricas (PizzaDeQueijo, PizzaDePepperoni, PizzaVegetariana, PizzaDeMolusco).

*/
abstract class SimplePizzaFactory {
    abstract criarPizza(tipo: string): Pizza | null;
}



class SimplePizzaFactoryNY extends SimplePizzaFactory {
    criarPizza(tipo: string): Pizza | null {
        if (tipo === 'Queijo') return new PizzaDeQueijoDeNY();
        if (tipo === 'Pepperoni') return new PizzaDePepperoniDeNY();
        return null;
    }
}

class SimplePizzaFactoryChicago extends SimplePizzaFactory {
    criarPizza(tipo: string): Pizza | null {
        if (tipo === 'Queijo') return new PizzaDeQueijoDeChicago();
        if (tipo === 'Pepperoni') return new PizzaDePepperoniDeChicago();
        return null;
    }
}

// Fábrica padrão para pizzas genéricas
class SimplePizzaFactoryGeneral extends SimplePizzaFactory {
    criarPizza(tipo: string): Pizza | null {
        if (tipo === 'Queijo') return new PizzaDeQueijo();
        if (tipo === 'Pepperoni') return new PizzaDePepperoni();
        if (tipo === 'Vegetariana') return new PizzaVegetariana();
        if (tipo === 'Molusco') return new PizzaDeMolusco();
        return null;
    }
}

/*
5. Classe PizzaStore (PizzaStore.ts)

A classe PizzaStore recebe uma fábrica de pizzas e usa essa fábrica para criar pizzas:

O construtor de PizzaStore recebe uma SimplePizzaFactory e armazena na propriedade factory.

O método pedirPizza(tipo: string) cria uma pizza do tipo especificado, usando a fábrica, e executa os métodos padrão (preparar, assar, cortar, e empacotar) antes de retornar a pizza.

*/

class PizzaStore {
    constructor(private factory: SimplePizzaFactory) {}

    pedirPizza(tipo: string): Pizza | null {
        const pizza = this.factory.criarPizza(tipo);
        pizza?.preparar();
        pizza?.assar();
        pizza?.cortar();
        pizza?.empacotar();
        return pizza;
    }
}


/*
6. Uso do Código (app.ts)

No código de exemplo, criamos três instâncias de PizzaStore, cada uma usando uma fábrica diferente (SimplePizzaFactoryNY, SimplePizzaFactoryChicago, e SimplePizzaFactoryGeneral). Em seguida, cada loja realiza pedidos de pizzas:

O código chama o método pedirPizza para cada loja com diferentes tipos de pizza, resultando na criação de pizzas que têm variações conforme a fábrica regional.

*/

const franquias = [
    new PizzaStore(new SimplePizzaFactoryNY()),        // Pizzaria de NY
    new PizzaStore(new SimplePizzaFactoryChicago()),   // Pizzaria de Chicago
    new PizzaStore(new SimplePizzaFactoryGeneral())    // Pizzaria geral
];

// Exemplo de pedidos em diferentes franquias
console.log("Pedido na Pizzaria de NY:");
franquias[0].pedirPizza('Queijo');

console.log("\nPedido na Pizzaria de Chicago:");
franquias[1].pedirPizza('Pepperoni');

console.log("\nPedido na Pizzaria Geral:");
franquias[2].pedirPizza('Vegetariana');
