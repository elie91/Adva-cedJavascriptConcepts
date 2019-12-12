
/************ Interpreters VS Compilers ***********/
/*
Interpreter: 
   L'interprétation du code source est un processus « pas à pas » : 
   l'interpréteur va exécuter les lignes du code une par une, 
   en décidant à chaque étape ce qu'il va faire ensuite.

Compiler: 
    Le code source est tout d'abord compilé, par un logiciel qu'on appelle compilateur, en un code binaire 
    C'est alors directement le système d'exploitation qui va utiliser le code binaire 
    et les données d'entrée pour calculer les données de sortie 

Babel is a Javascript compiler that takes your modern JS code and returns  browser compatible JS (older JS code).
Typescript is a superset of Javascript that compiles down to Javascript.
Both of these do exactly what compilers do: Take one language and convert into a different one!
*/

/************ Pros & Cons ***********/
/**
    Interpreter:
        Really fast to run, but doesnt do any optimizations
 
    Compiler: 
        Take more time to run, but the code is going to eventually run faster
*/

/************ JIT Compiler ***********/
/**
    Just In Time Compiler
    Combine the pro of the compiler & the interpreter
    Thats what V8 engine use
    V8 engine use Interpreter, Profiler, and Compiler
    In the V8 engine, the code get send to a interpreter called ignition,
    and take the AST (tree) that contains the parsed code, and spit out in bytecode
    Then, the Profiler, also call monitor, watches the code as its runs and make
    note on how we can optimize this code (like same call multiple times)
    So, as the code is running in the interpeter, the Profiler can identify some code
    that can be optimize, and pass it to the compiler, who optimize and replace the bytecode
    with Optimized code in real time
    The compiler in V8 is called Turbo Fan
*/

/************ Is Javascipt an interpreted language ***********/
/**
    Initialement, oui. Les choses ont cependant évolué, aujourdh'ui par exemple le 
    V8 engine de google utilise un interpreteur et un compilateur.
    Cela dépend en réalité de l'implémentation que l'on fait du Javascript Engine
*/

/************ Writing Optimized Code ***********/
/**
    In order to help the Javascript Engine, we want to be really careful with these: 
        * eval()
        * arguments
        * for in
        * with 
        * delete
    There are 2 main things thare are the reasons why the functions au dessus can make 
    our code less optimized
        * Hidden classes => Voir vidéo, pour résoudre ce problème, assigner toutes les propriétés
                            directement dans le constructeur ou bien les assigner dans l'ordre
        * Inline caching => Replace le contenu d'une fonction directement par le résultat
                            retourné dans le cas ou cette fonction est appelé plusieurs fois
*/

/************ Call Stack & Memory Heap ***********/
/*
    JS Engine come with a call stack & a memory heap
    
    Call Stack:
        Keep track of where your code is in is execution
        First In Last Out mode
    Memory Heap:
        Where the allocation of memory happens
        Free Store provide by the engine
        
    Simple variable are stored in the call stack, and data structures like
    array, objects.. are stored in the memory heap
*/

/************ Garbage collection & Memory Leaks ***********/
/**
 
    Javascript automatically frees up the memory that we no longer use 
    and will collect our garbage
    In garbage collected languages like Javascript, the garbage collector 
    freeze memory on the heap and prevent what we call memory leaks.

    Memory Leaks main cases: 
        1 - Global variables
        2 - Events listeners
        3 - setInterval() 
*/


/************ Single Thread ***********/
/**
 
    Javascript is a single thread.
    He has only ONE call stack
    So, he's also a synchronous language
*/

/************ Javascript Runtime ***********/
/**

    Web API come from the browser, provide the window object
    The Web API are asynchrnous
    As soon as something happens in the call stack thats is not a part of javascript,
    but a part of Web API, the function are sent to the Web API and pop from the call stack
    et placé dans une callback queue
    Le event loop ne run que lorsque la call stack est vide et que le fichier js a ete lu en entier

    Le Web Api renvoie les données au browser a la fin, avec callback eventuellement, 
    et push le retour sur la callstack

    NodeJs is also a javasript runtime, with some differences 

*/
