
/************ Asynchrnous processus ***********/
/*

Le Js Engine est embarqué dans le JS Runtime, au coté de la web API.
Les fonctions à effectuer sont placés les une sur les autres dans la call stack fournit par le JS Engine.
Lorsque le JS Engine rencontre des fonctions qui ne sont pas propres à javascript, mais à la web API, telles
que setTimeout, ou setInterval, ils les enléve de la call stack, et les envoie à la Web API qui sait comment les traiter.

Une fois leur traitement terminé, la web API envoie les callback dans une callback queue.
Cette queue est une file qui contient tous les callback à effectuer.
Cette queue est analysé constamment par l'event loop, qui regarde chaque instant si la callback queue contient quelque chose.

Si c'est le cas, elle les prend et les envoie une par une dans la call stack
A LA CONDITION que cette dernière soit vide.
L'event loop attend donc que la call stack soit entiérement vide pour lui passer les callback
C'est la raison pour laquelle les fonctions avec setTimeout s'effectueront toujours en dernier
Même si le timeout était de 0 secondes.

Pour ce qui est des Promises, celles ci font partie du langage javascript, et non d'une api externe.
Cependant, une fois leur traitement terminé, celles ci sont envoyés dans une Job Queue, une queue différente de la callback queue.
Elle est plus légére que la callback queue, et possède une plus haute priorité.
Ainsi, la event loop regarde d'abord la job queue, avant de regarder la callback queue.
Si la job queue contient des promises à résoudre, l'event loop va prendre ces promises et les push dans la callstack, mais 
la encore à la condition que cette dernière soit vide.
Ensuite, une fois que la job queue est vide, l'event loop va alors regarder la callback queue
C'est la raison pour laquelle les Promises sont affichés avant le setTimeout

*/


/************ Parallel, Sequenece and Race ***********/

const promisify = (item, delay) =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve(item), delay));

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);

//Execute all promises at the same time
async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `prallel is done: ${output1} ${output2} ${output3}`
}

//Execute all promises at the same time, but only keep the first one that succeed
async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

//Execute the promises one after another
async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();
  return `sequence is done ${output1} ${output2} ${output3}`
}

sequence().then(console.log)
parallel().then(console.log)
race().then(console.log)

//Output
// race is done: a
// prallel is done: a b c
// sequence is done a b c


/************ Threads ***********/
/*

  Lorsqu'on ouvre une nouvelle fenetre sur notre navigateur, le navigateur crée un nouveau thread.
  Chaque thread contient sa propre call stack, memory heap etc

  Le navigateur contient également des Web Workers, qui se charge d'effectuer des longues
  opérations en fond, sans que l'on soit au courant
  On peut créer un worker : 

  const worker = New Worker("file")
  worker.postMessage("message") pour poster un message dans un autre thread

  Dans le thread principale, on peut écouter ce message
  addEventListener("message")



*/