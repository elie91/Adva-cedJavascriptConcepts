/************ Functionnal Programming ***********/


/************ PURE FUNCTIONS ***********/
/**
 * Functions that has no side effect
 * Functions that return always the same output for the same input
 * Its impossible to have only pure functions
 * The goal is to organise the code in a way that we can isolate the side effects
 * The code become more predictable and easier to debug
 */


/************ IDEMPOTENCE ***********/
/**
 * Means that a operation has the same result
 * No matter how many times we calls it
 */


/************ Imperative VS Declarative ***********/
/**
    Le code que l'on écris dans un high level language est plutôt un code déclaratif
    On se contente de déclarer ce que la machine doit faire
    C'est le JS Engine, qui va transformer ce code en machine code et dire précisement à la 
    machine toutes les étapes à réaliser = code impératif

    Forloop = impératif
    forEach = déclaratif 
*/

/************ Immutability ***********/
/**
    Not changing the data
    Make a copie of the state, and return a new object every time
    Peut causer des soucis de mémoire dépendant de la taille de la structure
    Regader plus en détail Structural Sharing (Ne copie que les changements apportés au state)

*/

/************ Currying ***********/
/**
    Take a function that can take multiple parameters
    Transform it as multiple functions that takes only one arguments
*/
    const multiply = (a,b) => a*b;
    const curriedMultiply = a => b => a*b;
    const multiplyBy5 = curriedMultiply(5);
    multiplyBy5(10)
    multiplyBy5(20)


/************ Partial Application ***********/
    const multiply = (a,b,c) => a*b*c;
    const partialMultiply = multiply.bind(null, 5);
    //multiply with the 5 in place for a argument
    partialMultiply(4,10);


/************ Compose & Pipe ***********/
/*
composing or composition is the idea that any sort of data transformation that we do should be obvious.
system design principle that deals with this relationship of components
*/

const compose = (f,g) => (data) => f(g(data))
const pipe = (f,g) => (data) => g(f(data))

const multiplyBy3 = (num) => num*3;
const makePositive = (num) => Math.abs(num);
const multiplyBy3AndPositive = compose(multiplyBy3, makePositive)

//La seule différence entre compose et pipe est l'ordre dans lesquel 
//les fonctions sont appelés


/************ Arity ***********/
/*
    Nombre d'arguments qu'une fonction prend
    Mieux vaut avoir peu d'arguments dans une fonction
*/