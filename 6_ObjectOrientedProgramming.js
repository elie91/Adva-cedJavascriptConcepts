/************ Object and Functional Programming ***********/

/*
OOP says that bringing together the data and its behavior in a single location 
called an object 

FP says that data and behavior are distinctly different things 
and should be kept separate for clarity.
*/


/************ Object Oriented Programming ***********/

/************ Factory Functions ***********/
function createElf(name, weapon) {
    return {
        name,
        weapon,
        attack() {
            return 'attack with ' + weapon;
        }
    }
}

const peter = createElf('Peter', 'stones');
/*
Le problème ici est que, si l'on crée 1000 objects, les 1000 vont posséder
la méthode attack(), qui aura été copié 1000 fois dans la mémoire 
à des endroits différents
On peut résoudre ce problème avec Object.create, comme juste en dessous,
cela a des avantages mais aussi des inconvénients
On peut également résoudre ce problème avec les constructors functions,
qui existaient bien avant le Object.create
/*

/************ Object.create ***********/
const elfFunctionsStore = {
    attack() {
        return 'attack with' + this.weapon
    }
}

function createElf(name, weapon) {
    let newElf = Object.create(elfFunctionsStore);
    newElf.name = name;
    newElf.weapon = weapon;
    return newElf;
}

const peter = createElf('Peter', 'stones');


/************ Constructor Functions ***********/
/*
Le new keyword nous retourne automatiquement l'object que l'on crée
Le new keyword fait en sorte également que le this de la fonction pointe sur 
l'objet que l'on vient de créer, et non sur le window.
*/

function Elf(name, weapon) {
    this.name = name;
    this.weapon = weapon;
}
const peter = new Elf('Peter', 'stones');
const peter2 = new Elf('Peter', 'stones');

Elf.prototype.attack = function () {
    return 'attack with ' + this.weapon
}

console.log(peter.attack())
peter.__proto__ //Elf {}, pointe sur Elf.prototype, qui a été crée grace a la fonction
Elf.prototype === peter.__proto__

//Compliqué et moins lisible d'utiliser les prototypes que les classes


/************ ES6 Classes ***********/
class Elf {
    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }

    attack() {
        return 'attack with ' + this.weapon
    }
}
/*
classe est juste une beauté synthaxique 
Derriere les classes ses cache en réalité le comportement 
des protoype inheritance
*/

