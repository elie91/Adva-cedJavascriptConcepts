/************ Execution Context ***********/
/**

    Initially, our javascript engine create a global execution context : global()
    So, anytime a js code run, he is always a part on a execution context (global or in a function)
    any function create a function execution context

    The global execution context gives us 2 things: 
        - Global Object
        - this

    In the browser, the global object is : window
    this === window : true
    In nodeJS, the global object is: global
*/


/************ Lexical Environment ***********/
/**
    Lexical scope, Lexical analysis
    Les functions qui sont déclarés globalement, 
    dans l'objet window, font partie du global lexical environment
    Une function à l'intérieur d'une autre fonction fait partie du scope de la fuction

    !! So, Execution context tells us which lexical environment is currently running
*/

/************ Hoisting ***********/
/**
    Le javascript runtime comporte plusieurs phases: 
     - Création, avec le global execution context
     - Exécution du code
    Dans la partie création, intervient également la phase de Hoisting, juste avant l'éxécution

    Hoisting is the behavior of moving the variables or functions declarations to the top or their respective
    environments during compilation phase
**/
    console.log("1---");
    console.log(teddy) //undefined
    console.log(sing()) // la la la 
    var teddy = 'bear';
    function sing() {
        console.log("la la la ");
    }
/** 
    JavaScript engine allocating memory for the variables and functions that it sees 
    in your code during the creation phase before it executes it.

    variables are PARTIALLY hoisted : 
    Quand le compilateur voit le mot clé var, il va lui allouer de la 
    mémoire immédiatement, avant la phase d'éxecution, en assignant la valeur undefined
    var maVariable = undefined
    Il sait qu'on va utiliser cette variable, mais pas avec quel valeur

    functions are FULLY hoisted: 
    Le compilateur demande au memory heap d'allouer de la mémoire pour la fonction compléte; 
    c'est la raison pour laquelle le console.log(sing()) fonctionne dans l'exemple plus haut
    CEPENDANT, cela fonctionne uniquement avec les function declaration
    Voir plus bas

**/
    console.log(a)
    var a = 1;
    var a = 2
//Cela va donner 1, CAR le JE va hoist la variable a avec undefined, et ignorer la deuxieme ligne
//PAR CONTRE
    a()
    function a() { console.log('hi') }
    function a() { console.log('bye') }
//Cela va donner bye, car les functions sont FULLY HOISTED, il va donc allouer la mémoire a chaque
//déclaration, et va donc réecrire la mémoire de la funcion a 

    var favouriteFood = "grapes";
    var foodThoughts = function () {
        console.log("Original favourite food: " + favouriteFood);
        var favouriteFood = "sushi";
        console.log("New favourite food: " + favouriteFood);
    };
    foodThoughts()
/** 
    Résultat: 
    Original favourite food: undefined
    New favourite food: sushi

    hoisting happens on every execution context.
    Any time where you run a function a new execution context gets created and we have to go through the
    creation face and execution phase again.

    Avec let et const, technically there is still hoisting happening. 
    That is why you get a reference error instead of looking at the global favouriteFood variable. 
    let and const hoist but you cannot access them before the actual declaration is evaluated at runtime. 
    So the engine says, "ya there is a favouriteFood variable here but you can't access it yet"
**/

function a() {
    function b() {
        return 'im the one'
    }
    return b()
    function b() {
        return 'im the second'
    }
}
a()
//Im the second, because function declaration are fully hoisted


/************ Function Invocation  ***********/
/** 

    Function declaration : gets defined at pastime, when the compiler initially looks at the code ans hoisting
    Function expression:  gets defined at runtime, when we call, invoke or run the function
    When a function is invoked Well we create a new execution context on top of our global execution context
    We get the this keyword, and arguments keyword
    arguments object get us a object, with all the arguments
    But its dangerous to use this arguments, because its a object, and not a array
    if we want to use the arguements, we should use Array.from(arguments) 
    or, we should define or function with function myFunction(...args)
*/

/************ Scope Chain ***********/
/** 
    Each execution context has a link to his parent execution context
    Each function has their own variable environmets, but they have also what we call
    scope chain, and this scope chain gives us access to variables that are in our parent environment

    Si la function ne trouve pas la variable que l'on souhaite utiliser, elle va aller la chercher
    dans l'environment parent, puis du parent du parent ...

    scope: It just defines the accessibility of variables and functions in the code.
*/

/************ Block Scope ***********/
/** 
    variables declared inside a block scope such as an if statement or let's say for loops can be
    accessed from the outside of the opening and closing curly brackets.
    Uniquement si on utilise var, mais avec let et const, cela nous permet de block scoper les variables et de ne 
    les rendre accessibles à l'intérieur du block scope
*/

/************ IIFE ***********/
/** 
    Imediatly Invoke Function Expression

    (function (){

    })();
    Permet de déclarer une fonction qui run immédiatement; l'avantage est de déclarer les variables dans
    un contexte d'éxécution privé, et de ne pas polluer le scope global    
*/

/************ this keyword ***********/
/** 
    this is the object that the function is a property of
    object.maFunction(){
        this //Se refere à object
    }

    use strict dans une fonction permet de supprimer le comportement du this, 
    qui se référe à l'object global alors qu'on est ds la function
    Les ES6 Modules ont le 'use strict' par défaut
    Le new keyword bind le this
*/


/************ Dynamic scope vs Lexical scope ***********/

    const a = function () {
        console.log(this)
        const b = function () {
            console.log(this)
            const c = {
                hi: function () {
                    console.log(this)
                }
            }
            c.hi()
        }
        b()
    }
    a()
    /*
    Résultat
    Window
    Window => le this de b est également window, car on n'a pas quelque chose à gauche de b, on a window.b()
    {hi : f} => le this de c est l'objet c, car c est un object, qui contient la propriété hi, on a donc c.hi()
    */

    //JS is weird:
    const obj = {
        name: 'Billy',
        sing: function () {
            console.log(this) // in this case, it's a method on an object.
            var anotherFunc = function () {
                console.log(this)// this points to windows!!!
            }
        }
    }

    /*
        The this keyword is not lexicale scoped that is it doesn't matter where it is run.
        It matters how the function was called (dynamic scopes)
        ICI, la function anotherFunc n'a pas été appelé PAR l'objet
        Elle a simplement été appelé DANS l'object
        Le this ne se rattache donc a aucun object, et fait donc référence à l'objet global, window
        Les arrow function nous permettent de résoudre ce problème
        Grace aux arrow functions, le this devient lexical scoped, et non dynamic
        On peut également utiliser la fonction bind(this) 
    */

/************ Call, Apply , Bind ***********/
/** 
    
    call: Lorsqu'on appelle une fonction en js , maFunction(), cela est en réalité un raccourci pour 
          maFunction.call(); toutes les fonctions disposent de cette propriété
    
    apply: Appelle également la fonction, comme call

    bind: unlike call and apply that immediately runs a function, 
          bind returns a new function with a certain context and parameters.
          usually used when we want a function to be called later
*/
    const wizard = {
        name: 'Merlin',
        health: 100,
        heal: function(num1, num2) {
            this.health += num1 + num2;
        }
    }
  
   const archer = {
        name: 'Robin Hood',
        health: 50
    }
  
  wizard.heal.call(archer, 50, 60)
  wizard.heal.apply(archer, [20, 30])
  const healArcher = wizard.heal.bind(archer, 50, 60);
  healArcher();

/*
  Call et apply servent également à: function borrowing , cad , utiliser une fonction pour un objet, alors 
  que cette object ne dispose pas de la fonction
  La seule différence est que call prend des param les un à la suite des autres, alors que apply dans un array
  Bind nous permet de stocker le this, pour une utlisation plus tard
*/

    //bind currying

    function multiply(a, b) {
        return a*b;
    }

    var multipleByTwo = multiply.bind(this, 2);
    console.log(multipleByTwo(4));

    var multipleByThree = multiply.bind(this, 3);
    console.log(multipleByThree(4));



