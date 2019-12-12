/************ Javascript Types ***********/

//Primitive Types 
//data that represent a single value - the variable directly contain the value
    typeof 5     // number
    typeof true  //boolean
    typeof 'hey' //string
    typeof undefined //undefined - absence of definition
    typeof null //object - absence of value
    typeof Symbol('string') //symbol (ES6)

//Non-Primitive Types *
//The variable doesnt containe the value directly - Instead, he has a reference where the value is
    typeof {} //object
    typeof [] //object
    typeof function(){} //function, but function are objects



/************ Pass by Reference VS by Value ***********/

// Primitive types are passed by value
 let a = 5;
 let b = a;
 b++;
 console.log(a) // 5 , just copie the value

 // Objects (& array) passed by reference
let obj1 = {name: 'Yao', password: '123'};
let obj2 = obj1;
obj2.password = 'easypeasy';
console.log(obj1) // {name: 'Yao', password: 'easypeasy'}
//Both objects point to the same value in memory

let clone = [].concat(myArray)  // clone an array, only values
let clone = Object.assign({}, obj);   // clone object
let clone2 = {...obj}  // clone  object
//Pour clone un object contenant d'autres obj imbriqués (deep clone)
let superclone = JSON.parse(JSON.stringify(obj));

/************ Type Coercion ***********/

//Coercion means the language converting a certain type to another type.
1 == '1' // true
