const eater = (state) => ({
    eat(amount) {
        console.log(`${state.name} is eating.`)
        state.energy += amount
    }
})

const sleeper = state => ({
    sleep(length) {
        console.log(`${state.name} is sleeping.`);
        state.energy += length;
    }
});

const player = state => ({
    play() {
        console.log(`${state.name} is playing.`);
        state.energy -= length;
    }
});

const barker = state => ({
    bark() {
        console.log("Woof Woof!");
        state.energy -= 0.1;
    }
});

const meower = state => ({
    meow() {
        console.log("Meow!");
        state.energy -= 0.1;
    }
});

const adopter = state => ({
    adopt(pet) {
        state.pets.push(pet);
    }
});

const friender = state => ({
    befriend(friend) {
        state.friends.push(friend);
    }
});


function Dog(name, energy, breed) {
    let dog = {
        name,
        energy,
        breed,
    }

    return Object.assign(
        dog,
        eater(dog),
        sleeper(dog),
        player(dog),
        barker(dog),
    )
}

function Cat(name, energy, declawed) {
    let cat = {
        name,
        energy,
        declawed,
    }

    return Object.assign(
        cat,
        eater(cat),
        sleeper(cat),
        player(cat),
        meower(cat),
    )
}

function Cat(name, energy, declawed) {
    this.name = name
    this.energy = energy
    this.declawed = declawed

    return Object.assign(
        this,
        eater(this),
        sleeper(this),
        player(this),
        meower(this),
    )
}


const leo = Dog('Leo', 10, 'Goldendoodle')
leo.eat(10) // Leo is eating
leo.bark() // Woof Woof!