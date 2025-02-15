---
title: "OOP: Polymorphism"
description: "OOP: Polymorphism"
pubDate: "Feb 15 2025 12:30"
heroImage: "/mc-blog/oop-polymorphism.png"
---

## 1. Interfaces

While JavaScript doesn't have built-in interfaces, we can simulate them:

```js
// Simulate interface using a class with empty methods
class VehicleInterface {
  accelerate() {
    throw new Error("Must implement accelerate");
  }
  brake() {
    throw new Error("Must implement brake");
  }
}

// Implement the interface
class Car extends VehicleInterface {
  accelerate() {
    return "Speeding up";
  }
  brake() {
    return "Slowing down";
  }
}
```

## 2. Abstract Methods

Methods that must be implemented by child classes:

```js
class Shape {
  // Abstract method
  calculateArea() {
    throw new Error("Must implement calculateArea");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}
```

## 3. Runtime Polymorphism

Objects can be treated as their parent type:

```js
// Different types can be used interchangeably
function makeAnimalSound(animal) {
  // Will call the specific animal's implementation
  console.log(animal.makeSound());
}

const dog = new Dog();
const cat = new Cat();
makeAnimalSound(dog); // "Woof!"
makeAnimalSound(cat); // "Meow!"
```

## 4. Type Checking - Verifying object types at runtime

```js
const animal = new Dog();

// Check instance type
console.log(animal instanceof Dog); // true
console.log(animal instanceof Animal); // true

// Check constructor
console.log(animal.constructor === Dog); // true
```

## 4. Dependency Injection

Injecting dependencies instead of creating them inside

```js
class Logger {
  log(msg) {
    console.log(msg);
  }
}

class UserService {
  // Inject logger dependency
  constructor(logger) {
    this.logger = logger;
  }

  createUser(user) {
    this.logger.log(`Creating user: ${user}`);
    // ... user creation logic
  }
}

// Inject the dependency
const logger = new Logger();
const userService = new UserService(logger);
```
