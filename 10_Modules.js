/************ Modules ***********/
/*
    Le problème que viennent résoudre les modules est le suivant:
    L'écriture d'un code qui pollue le scope global, et qui rend le code forcément dépendant
    Ce qui veut dire que modifier une chose peut entrainer de nombreuses erreurs
    De plus, cela rend le code plus dur à débugger

    Global Scope
        Module Scope
            Function scope
                Block scope
*/

/************ Modules Pattern ***********/
/*

IIFE & Module pattern
Avec une IIFE, on peut rendre accessible des variables au scope global sans le polluer
On peut également choisir ce que l'on souhaite et cacher le reste
*/

const fightModule = (function(){

    const privatevar = "private";
    const privateFunc = () => {
        console.log("toto")
    }
    function fight(char1,char2){
        console.log(`${char1} attack ${char2}`)
    }
   return {
       fight
   }
})
/*
On peut accéder ici au fightModule dans le scope global
fightModule.fight("harry", "ron")
*/

/************ Modules Pattern Avantages et inconvénients ***********/
/*
    Avantages: Reusability, maintenance, debug..
    inconvénients: 
        - On pollue tout de meme le global scope
          fightModule reste une variable que l'on peut override
        - On doit vérifier que l'ordre des script est exacte
          Forte dépendance
          Cela peut causer de nombreux soucis
    
    Comment résoudre ces problèmes ?

*/

/************ CommonJS, AMD, UMD ***********/
/*
    AMD = Asynchronous Module Définition
    Résoud le problème lié au fait de polluer le global scope
*/
    const module1 = require('module1')
    const module2 = require('module1')

    function fight() {}
    module.exports = {
        fight: fight
    }

/*
    Plus de IIFE 
    Avec commonJS, les modules sont load de façon synchrone
    Ce qui n'est pas idéal pour les performances
    C'est la raison pour laquelle commonJS à été crée de base pour le serveur (nodeJS)
    Cependant, afin de garder ce pattern pour le brower, 2 choses sont survenues à commonJS:

        - Browserify: browserify script.js > bundle.js
          Le bundle.js contientdrai tous les scripts du projet, mis dans un seul fichier
          Il va créer toutes les dépendances et les ajouter au bundle.js, ce qui résout
          le problème des dépendences entre les différents modules, et celui de polluer le scope global

        - AMD :
            define(['module1', 'module2'], function(module1Import, module2Import){
                const module1 = module1Import
                const module2 = module2Import
            })  
            AMD à été fait spécialement pour les navigateurs
            Il charge les modules de façon asynchrone

*/

/************ ES6 Modules ***********/
/*
   Avec ES6, javascrip à intégré nativement dans son langage les modules.
   Plus besoin de IIFE ou de commonJS
   Deux nouveaux mot clés:
    import
    export
*/

    const harry = "";
    const voldemor = "";

    export function fight(char1,char2){
        console.log(`${char1} attack ${char2}`)
    }

    export default function test() {
        console.log("toto")
    }

/*
    Dans le HTML: 
    <script type="module">
        import { fight }, test from "script.js"
    </script>

    Pour que les modules fonctionnent, il faut également qu'il soit servis
    par un serveur

    Si on essaye d'accèder a test ou fight directement dans le browser, on aura une erreur not defined
    Ainsi, les modules ne polluent pas le scope global
*/
