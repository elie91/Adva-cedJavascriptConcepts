/************ Closures  - The 1 pillars ***********/
/*

Closure is a combination of function and the lexical environment from which it was declared.
Closures allow a function to access variables from an enclosing scope or environment even after it leaves
the scope in which it was declared.
Closures are also called lexical scoping. (lexical: where it is written , scoping: what variable we have access)

They have benefits of : 
    - Memory Efficient
    - Encapsulation

Lorsque le js engine voit une fonction qui retourne une autre fonction, 
et qui utilise une var censé disparaitre lorsque la fonction principale est pop de la callstack
il va sauvegarder dans un endroit spécial de la mémoire, dans une sorte de boite à closures, 
ces variables, et ne pas les supprimer (garbage collector) même si elles n'ont pas actuellement de référence

---  1 :
*/
function callMeMaybe() {
    setTimeout(function () {
        console.log(callMe);
    }, 4000);
    const callMe = 'Hi!';
}
/*
Ici, la fonction va afficher Hi, au bout de 4 secondes
Il n'y a pas de problême de hosting, bien que la variable soit défini après, en tant que const
Ce qui se passe est: 
La function callMeMaybe() est appelé
La function setTimeout est envoyé à la web api, qui attend et renvoie le callback
Pendant ce temps, callMeMaybe crée la variable callMe, l'assigne, fini de s'éxecuter, et est pop de la callstack
MAIS comme le JS Engine constate que la function setTimeout imbriquée
 utilise callMe, il va créer une closure, et permettre ainsi au callback du setTimeout d'utiliser callMe


--- 2 : Closures and memory
*/
function heavyDuty(item) {
    const bigArray = new Array(7000).fill('😄')
    console.log('created!');
    return bigArray[item]
}

heavyDuty(699)
heavyDuty(699)
heavyDuty(699)
//Le problème avec la fonction ici est qu'a chaque fois qu'on l'appelle, le bigArray est recrée à chaque fois
//Dans un cas réel ou il s'agit d'une longue opération par ex, cela n'est pas vraiment performant


function heavyDuty2() {
    const bigArray = new Array(7000).fill('😄')
    console.log('created Again!')
    return function (item) {
        return bigArray[item]
    }
}
const getHeavyDuty = heavyDuty2();
getHeavyDuty(699)
getHeavyDuty(699)
getHeavyDuty(699)

//En utilisant plutot une closure, on rend la fonction tt de suite plus performante;
//Le bigArray va être crée une seule fois, lors de l'appel de heavyDuty2(), que l'on assigne à une variable
//Comme elle retourne une autre fonction, on peut donc utiliser la variable pour appeler notre seconde fonction
//Donc, on ne sera rentré qu'une fois dans la 1er fonction, qui crée notre array, et le console log ne sera affiche qu'1 fois
//Ici, c'est une closure, car heavyDuty2() est appelé1 seule fois et pop de la callstack
//Mais on peut tjr utiliser le bigArray dans les appels suivants


//--- 3 : Closures and encapsulation
const makeNuclearButton = () => {
    let timeWithoutDestruction = 0;
    const passTime = () => timeWithoutDestruction++;
    const totalPeaceTime = () => timeWithoutDestruction;
    const launch = () => {
        timeWithoutDestruction = -1;
        return '💥';
    }

    setInterval(passTime, 1000);
    return { totalPeaceTime }
}

const ww3 = makeNuclearButton();
ww3.totalPeaceTime()
/*

L'intéret ici de créer des fonctions imbriqués, et de retourner un objet à la fin, est 
afin d'encapsuler notre fonction. C'est à dire, qu'ici, personne n'aura accès à l'extérieur à la
fonction launch(), mais uniquement à la fonction totalPeaceTime
Donc, en créant des fonctions imbriqués, qui utilisent des closures pour accéder aux variables de la 
fonction principale, on peut choisir les fonctions que l'on souhaite retourner, afin d'ajouter une couche 
de sécurité

*/

/************ Exercices ***********/
const array = [1, 2, 3, 4];
for (var i = 0; i < array.length; i++) {
    setTimeout(function () {
        console.log('I am at index ' + i)
    }, 3000)
}

/*
After 4 seconde, the result is I am at index 4 , 4 times (due to event queue etc)
To fix this, we can use let. With let, the result is index 0 , index 1 ..
Because, with let, we create a new scop for each iteration ???? pas clair
On peut aussi résoudre ce problème avec une closure
*/
const array = [1, 2, 3, 4];
for (var i = 0; i < array.length; i++) {
    (function (closureI) {
        setTimeout(function () {
            console.log('I am at index ' + closureI)
        }, 3000)
    })(i)
}
