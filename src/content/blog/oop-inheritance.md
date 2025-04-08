---
title: "OOP: Inheritance"
description: "OOP: Inheritance"
pubDate: "Feb 15 2025 12:00"
heroImage: "/mc-blog/inheritance.webp"
---

## 1. Parent/Child Classes

```js
// Parent class (base class)
class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return "Some sound";
  }
}

// Child class (derived class)
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

const dog = new Dog("Rex", "German Shepherd");
console.log(dog.name); // "Rex"
console.log(dog.breed); // "German Shepherd"
```

## 2. Method Overriding

```js
class Animal {
  makeSound() {
    return "Some sound";
  }

  eat() {
    return "Eating...";
  }
}

class Dog extends Animal {
  // Override parent's method
  makeSound() {
    return "Woof!";
  }

  // Override and extend parent's method
  eat() {
    const parentResponse = super.eat();
    return `${parentResponse} dog food`;
  }
}

const dog = new Dog();
console.log(dog.makeSound()); // "Woof!"
console.log(dog.eat()); // "Eating... dog food"
```

## 3. Super/Base Class

```js
class Vehicle {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
  }

  getInfo() {
    return `${this.brand} from ${this.year}`;
  }
}

class Car extends Vehicle {
  constructor(brand, year, doors) {
    super(brand, year); // Call parent constructor
    this.doors = doors;
  }

  getInfo() {
    return `${super.getInfo()} with ${this.doors} doors`; // Call parent method
  }
}

const myCar = new Car("Toyota", 2020, 4);
console.log(myCar.getInfo()); // "Toyota from 2020 with 4 doors"
```

### Understanding super()

`super()` has two main uses:

## 1. Calling the parent class constructor

```js
class Animal {
  constructor(name) {
    this.name = name;
    this.energy = 100;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    // Must call super() before using 'this'
    super(name); // Calls Animal constructor
    this.breed = breed; // Now we can use 'this'
  }
}

const dog = new Dog("Rex", "German Shepherd");
```

Without `super()`

```js
class Dog extends Animal {
  constructor(name, breed) {
    // This will cause an error!
    this.breed = breed; // Error: 'this' is not allowed before super()
    super(name);
  }
}
```

## 2. Calling parent class methods

```js
class Animal {
  speak() {
    return "Some sound";
  }
}

class Dog extends Animal {
  speak() {
    // Call parent's speak method
    const parentSound = super.speak();
    return `${parentSound} and Woof!`;
  }
}

const dog = new Dog();
console.log(dog.speak()); // "Some sound and Woof!"
```

## Automatic super() call

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  // If we don't define a constructor,
  // JavaScript automatically adds:
  // constructor(...args) {
  //     super(...args);
  // }
}

const dog = new Dog("Rex"); // Works fine!
```

<p style="text-align:center;"><b>Common Mistakes and Best Practices</b></p>

```js
// MISTAKE 1: Forgetting super()
class Dog extends Animal {
  constructor(name) {
    // Error: Must call super first!
    this.name = name;
  }
}

// MISTAKE 2: Using 'this' before super()
class Dog extends Animal {
  constructor(name) {
    this.breed = "Labrador"; // Error!
    super(name);
  }
}

// CORRECT WAY
class Dog extends Animal {
  constructor(name) {
    super(name);
    this.breed = "Labrador"; // OK now
  }
}
```

## 4. Extending Classes

```js
// Multiple levels of inheritance
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Mammal extends Animal {
  feed() {
    return "Feeding with milk";
  }
}

class Dog extends Mammal {
  bark() {
    return "Woof!";
  }
}

// Extending built-in classes
class MyArray extends Array {
  first() {
    return this[0];
  }

  last() {
    return this[this.length - 1];
  }
}

const arr = new MyArray(1, 2, 3);
console.log(arr.first()); // 1
console.log(arr.last()); // 3
```

## Sources

[1] _W3Schools_. (2024). _JavaScript Class Inheritance_. Retrieved from https://www.w3schools.com/js/js_class_inheritance.asp

[2] _Claude 3.7 Sonnet_. (2024). _Comprehensive understanding of Object-Oriented Programming concepts_.

[3] _Author's personal experience and practical knowledge in JavaScript development_.
