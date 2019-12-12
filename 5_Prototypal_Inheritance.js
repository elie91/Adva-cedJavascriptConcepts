/************ Prototypal Inheritance ***********/

/*
 inheritance is an object getting access to the properties and methods of another object.
 Array object and Function object get access to the Object (base object) 
 This is the object that everything in JavaScript gets created from
*/

//array
const array = []; //create a array from the Array object, via constructor
array.__proto__ // get the Array object, go up the prototype chain
array.__proto__.__proto__ //get the Object (base object)

//function
function a() { }
a.__proto__ //Function object
a.__proto__.__proto__ //base object

//object
const obj1 = {}
obj1.__proto__ //base object

//Exemple
let dragon = {
    name: 'Tanya',
    fire: true,
    fight() {
        return 5
    },
    sing() {
        if (this.fire) {
            return `I am ${this.name}, the breather of fire`
        }
    }
}

let lizard = {
    name: 'Kiki',
    fight() {
        return 1
    }
}

//If we want to use a function of dragon for lizard
//we can use bind
const lizardFire = dragon.sing.bind(lizard)
//But because of  if (this.fire) , this will not work for lizard

// We can set the prototype of lizard to dragon
//but, bad performance when use __proto__, never use it
lizard.__proto__ = dragon;
dragon.isPrototypeOf(lizard); //true
console.log(lizard.fire) //true
console.log(lizard.sing())

for (let prop in lizard) {
    if (lizard.hasOwnProperty(prop)) {
        console.log(prop) //name, fight
    }
}

function a() { }
a.hasOwnProperty('call') //false, same for apply & bind
a.hasOwnProperty('name') //true 


function multiplyBy5(number) {
    return num * 5
}
multiplyBy5.__proto__ //point to Function.prototype
Function.prototype // same as multiplyBy5.__proto__
Object.prototype // base Object.prototype, that include __proto__
Object.prototype.__proto__ //null

const array = [];
array.hasOwnProperty('map') //false
array.__proto__.hasOwnProperty('map') //true

array.__proto__ === Array.prototype
/*
multiply has a propety __proto__ that links to the Function prototype
Function object has a protoype property, that contains __proto__ that links to 
the base Object
Base object has a protoype property, that contains __proto__ that links to null
*/


//never use __proto__ for performances reasons
//instead, we should use
var human = { mortal: true }
var socrates = Object.create(human); //Creates an object that has the specified prototype
human.isPrototypeOf(socrates); // true



/************ Only Functions has prototype property  !! ***********/

function multiplyBy5(number) {
    return num * 5
}
multiplyBy5.prototype //{constructor: f} 
//ici, notre fonction contient bien un protoype, celui ci est vide par contre
//le prototype que l'on utilise généralement est celui du Function object


Object.prototype // {constructor: f,....}
//Mais on vient de dire que prototype n'existe que dans les functions ????
//En effet, c'est une fonction, car js crée à partir de lui tous les objects
typeof Object // function
typeof Object.prototype // object
const obj = {} //js use the Base Object to create our object
typeof obj //object, because we create if from the Object constructor
obj.prototype //undefined, same for array

//All classes with capital letters are functions, with protoype property



/************ Exercices ***********/

//Array.map() => to print '🗺'
Array.prototype.map = function () { 
    arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push((this[i] + '🗺'));
    }
    return arr;
}
console.log([1, 2, 3].map())


//Date object => to have method .yesterday() which shows you yesterday's day in 'YYYY-MM-DD' format.
Date.prototype.lastYear = function () {
    return this.getFullYear() - 1;
}

new Date('1900-10-10').lastYear()