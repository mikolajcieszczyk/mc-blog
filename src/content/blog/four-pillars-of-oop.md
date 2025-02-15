---
title: "Four pillars of OOP"
description: "Four pillars of OOP"
pubDate: "Jan 18 2025"
heroImage: "/mc-blog/oop-code.png"
---

### What is Object Oriented Programming (OOP)?

A programming paradigm (style) centered around objects rather than functions.

## 4 PILLARS OF OOP

### Encapsulation

Grouping related variables and functions that operate on them into objects.

In other words, encapsulation combines data (fields, attributes) and methods operating on this data into one coherent whole (class), while protecting this data from unwanted external access.

**Procedural way**

```js
let firstNumber = 50;
let secondNumber = 1200;
let thirdNumber = 2137;

function calculate(firstNumber, secondNumber, rate) {
  // three parameters function - greater complexity
  return firstNumber + secondNumber + rate;
}
```

**OOP way**

```js
let calculatingObject = {
  firstNumber = 50,
  secondNumber = 1200,
  thirdNumber = 2137,
  calculate: function() { // zero parameters function - less complexity
    return this.firstNumber + this.secondNumber + this.rate;
  }
}

calculatingObject.calculate()
```

> _"The best functions are those with no parameters!"_
>
> **Robert C Martin** - american programmer and author of numerous books on software engineering.

**Key features of encapsulation:**

1. Combines data and methods into a single object
2. Controls access to an object's data through access modifiers (private, protected, public)
3. Hides implementation details from the outside world
4. Allows changing the internal implementation without affecting the code that uses the object

### Abstraction

Hiding complexity and showing only what is necessary for the user.

**Procedural way**

```js
const carState = {
  brand: "Toyota",
  engineStarted: false,
  gearShifted: false,
  speed: 0,
};

function startEngine(car) {
  car.engineStarted = true;
}

function shiftGear(car) {
  car.gearShifted = true;
}

function pressGas(car) {
  car.speed += 10;
}

// User (other programmer) needs to know all steps
startEngine(carState);
shiftGear(carState);
pressGas(carState);
```

**OOP way**

```js
class Car {
  constructor(brand) {
    this.brand = brand;
  }

  drive() {
    this.startEngine();
    this.shiftGear();
    this.pressGas();
  }

  // Implementation details are hidden
  startEngine() {
    /* complex logic */
  }
  shiftGear() {
    /* complex logic */
  }
  pressGas() {
    /* complex logic */
  }
}

// User (other programmer) sees only simple interface
const car = new Car("Toyota");
car.drive(); // doesn't need to know how it works inside
```

### Inheritance

A mechanism that allows a class to inherit properties and methods from another class. This allows us to share and reuse code.

In other words it helps us eliminate redundant code.

**OOP Way**

```js
// Parent (base) class
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return `${this.name} is eating.`;
  }

  sleep() {
    return `${this.name} is sleeping.`;
  }
}

// Child class inheriting from Animal
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // call parent constructor
    this.breed = breed;
  }

  bark() {
    return `${this.name} is barking!`;
  }

  // Override parent method
  eat() {
    return `${this.name} is eating dog food.`;
  }
}

// Using the classes
const myDog = new Dog("Rex", "German Shepherd");
console.log(myDog.eat()); // "Rex is eating dog food."
console.log(myDog.sleep()); // "Rex is sleeping."
console.log(myDog.bark()); // "Rex is barking!"
```

### Polymorphism

Polymorphism is the ability of objects of different classes to respond to the same message (method) in different ways.

In other words, the same method can work differently for different types of objects.

**Procedural way**

```js
// 1. We need to somehow mark the types of shapes
const SHAPE_TYPE = {
  CIRCLE: "circle",
  RECTANGLE: "rectangle",
};

function createShape(type, dimensions) {
  return {
    type: type,
    dimensions: dimensions,
  };
}

// 2. The function must check the type and choose the appropriate calculation
function calculateArea(shape) {
  switch (shape.type) {
    case SHAPE_TYPE.CIRCLE:
      return Math.PI * shape.dimensions.radius * shape.dimensions.radius;
    case SHAPE_TYPE.RECTANGLE:
      return shape.dimensions.width * shape.dimensions.height;
    default:
      return 0;
  }
}

const circle = createShape(SHAPE_TYPE.CIRCLE, { radius: 5 });
const rectangle = createShape(SHAPE_TYPE.RECTANGLE, { width: 4, height: 6 });

console.log(`Area: ${calculateArea(circle)}`); // Area: 78.54...
console.log(`Area: ${calculateArea(rectangle)}`); // Area: 24
```

In the procedural approach, we have to explicitly check the type of the shape and perform the appropriate calculations, which leads to less flexible code.

**OOP way**

```js
// 1. We define the base interface (each shape will have this method)
// Base class
class Shape {
  calculateArea() {
    return 0;
  }
}

// 2. We create different shapes - each implements the method in its own way
// Different implementations for different shapes
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius; // circle calculates area π*r²
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height; // rectangle calculates area w*h
  }
}

// 3. Using polymorphism we use the same function works with different shapes!
function printArea(shape) {
  // the function doesn't need to know what shape it is
  console.log(`Area: ${shape.calculateArea()}`); // just calls the method
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

printArea(circle); // Area: 78.54...
printArea(rectangle); // Area: 24
```

In the OOP approach, each class implements the calculateArea() method in its own way, and the calling code does not need to know what specific shape it is working with.

**Key difference:**

**In OOP:** each object "knows" how to calculate its area. The `printArea` function simply calls the `calculateArea()` method and does not need to know what shape it is working with
**In the procedural approach**: the `calculateArea` function needs to know all the types of shapes and know how to calculate the area of ​​each of them

**A practical example of the consequences:**

Let's say we want to add a new shape - a triangle:

**In OOP**, we just need to add a new class:

```js
class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }

  calculateArea() {
    return (this.base * this.height) / 2;
  }
}

// Done! The printArea function will work as is
```

**In the procedural approach**, we need to modify an existing function:

```js
function calculateArea(shape) {
  if (shape.type === SHAPE_TYPE.CIRCLE) {
    return Math.PI * shape.dimensions.radius * shape.dimensions.radius;
  } else if (shape.type === SHAPE_TYPE.RECTANGLE) {
    return shape.dimensions.width * shape.dimensions.height;
  }
  // We need to add a new case
  else if (shape.type === SHAPE_TYPE.TRIANGLE) {
    return (shape.dimensions.base * shape.dimensions.height) / 2;
  }
}
```

## BENEFITS OF OOP

**Encapsulation** - reduce complexity + increase reusability

**Abstraction** - reduce complexity + isolate impact of changes

**Inheritance** - Eliminate redundant code

**Polymorphism** - Refactor ugly switch/case statements

_Sources_:

**Video:** ["Object-oriented Programming in JavaScript: Made Super Simple | Mosh"](https://www.youtube.com/watch?v=PFmuCDHHpwk) by **Mosh Hamedani**
