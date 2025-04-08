---
title: "OOP: Classes and objects"
description: "OOP: Classes and objects"
pubDate: "Feb 15 2025 11:30"
heroImage: "/mc-blog/classes-and-objects.webp"
---

## Class Structure

A class is a "template" for creating objects. It can be compared to the blueprint of a house - it defines what all objects created based on it will look like.

```js
class Person {
  // 1. Class fields (properties)
  name;
  age;

  // 2. Constructor
  constructor() {}

  // 3. Methods and private methods
  introduceYourself() {}
  #privateMethod() {}

  // 4. Getters/Setters
  get fullName() {}
  set fullName(value) {}
}
```

## 1. Class fields (properties)

Properties are data stored in an object. In JS we have several ways to define them:

```js
class Car {
  // 1. Public class fields (modern syntax)
  brand = ""; // default value
  model = "";

  // 2. Private fields (not accessible outside the class)
  #vin = null;
  #mileage = 0;

  // 3. Dynamic properties (created in constructor)
  constructor(config) {
    this.productionYear = config.year; // will create a new property
    this.color = config.color;

    // Properties can also be objects
    this.engine = {
      power: config.power,
      capacity: config.pojemnosc,
    };
  }
}

const auto = new Samochod({
  year: 2020,
  kolor: "red",
  power: 150,
  capacity: 2.0,
});

console.log(auto.brand); // access to public field
console.log(auto.#vin); // ERROR - cannot access private field
```

## 2. Constructor

A constructor is a special method called when you create a new object. It's where you "prepare" the new object for use.

```js
class Person {
  // constructor can take parameters
  constructor(name, age) {
    // this points to the object being created
    this.name = name;
    this.age = age;

    // You can also perform other initialization operations
    this.dateAdded = new Date();
    this.id = Math.random();

    // You can call other methods
    this.#initializePrivateData();
  }

  #zainicjujDanePrivate() {
    // initialization of private data
  }
}

// Usage examples:
const person1 = new Person("Jan", 25); // with parameters
const person2 = new Person(); // without parameters - name and age will be undefined
```

## 3. Methods, getters and setters

Methods are functions belonging to a class. They can operate on the object's data and perform various operations.

```js
class BankAccount {
  #balance = 0;
  #history = [];

  // 1. Public method
  donate(checkAmount) {
    if (this.#checkAmount(checkAmount)) {
      this.#balance += checkAmount;
      this.#addToHistory(`Donation: ${checkAmount}`);
      return true;
    }
    return false;
  }

  // 2. Private method
  #checkAmount(checkAmount) {
    return checkAmount > 0 && Number.isFinite(checkAmount);
  }

  // 3. Getter - used as a property
  get balance() {
    return this.#balance;
  }

  // 4. Setter - used as a property
  set dailyLimit(value) {
    if (value >= 0) {
      this.#dailyLimit = value;
    }
  }

  // 5. Async method
  async checkExchangeRate() {
    const response = await fetch("api/exchangeRate");
    return await response.json();
  }

  // 6. Method with default parameters
  #addToHistory(entry, data = new Date()) {
    this.#history.push({ entry, data });
  }
}

const account = new BankAccount();
account.donate(100); // using method
console.log(account.balance); // using gettera
account.dailyLimit = 1000; // using settera
```

## 4. Instance Creation

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }
}

// Different ways to create instances:
const user1 = new User("John", "john@email.com"); // Basic
const user2 = new User("Anna"); // Partial parameters
const users = [
  // Multiple instances
  new User("John", "john@email.com"),
  new User("Anna", "anna@email.com"),
];

// Factory pattern - alternative way of creating instances
class UserFactory {
  static createAdmin(name) {
    const user = new User(name);
    user.role = "admin";
    return user;
  }

  static createGuest() {
    return new User("Guest");
  }
}

const admin = UserFactory.createAdmin("Admin");
const guest = UserFactory.createGuest();
```

## 5. Singleton

A design pattern ensuring only one instance of a class exists:

```js
class Singleton {
  // Private static field storing the single instance
  // # means it's private, accessible only inside the class
  static #instance = null;

  // Constructor - called when creating a new object
  constructor() {
    // Checks if instance already exists
    if (Singleton.#instance) {
      // If it exists, returns the existing instance
      return Singleton.#instance;
    }
    // If it doesn't exist, saves the new instance
    Singleton.#instance = this;
  }

  // Static method to get the instance
  // static means the method belongs to class, not instance
  static getInstance() {
    // Checks if instance exists
    if (!Singleton.#instance) {
      // If it doesn't exist, creates new one
      Singleton.#instance = new Singleton();
    }
    // Returns instance (existing or newly created)
    return Singleton.#instance;
  }
}

// Usage examples:

// Creates first instance
const instance1 = new Singleton();
// Tries to create second instance, but gets the same one
const instance2 = new Singleton();
// Compares if it's the same object (true)
console.log(instance1 === instance2);

// Alternative way using static method:
// Gets instance using static method
const instance3 = Singleton.getInstance();
// Gets same instance again
const instance4 = Singleton.getInstance();
// Compares if it's the same object (true)
console.log(instance3 === instance4);
```

## 6. Static Members

Static members belong to the class itself, not to instances:

```js
class MathUtils {
  // Static properties
  static PI = 3.14159;
  static #secretKey = "xyz123"; // private static property

  // Static methods
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  // Static initialization block
  static {
    this.VERSION = "1.0";
    this.initialized = true;
  }

  // Static getter
  static get random() {
    return Math.random();
  }

  // Private static method
  static #validate(num) {
    return typeof num === "number";
  }

  // Using private static method
  static calculate(a, b) {
    if (this.#validate(a) && this.#validate(b)) {
      return this.add(a, b);
    }
    throw new Error("Invalid numbers");
  }
}

// Using static members:
// You don't need an instance of the class to use them!

console.log(MathUtils.PI); // 3.14159

console.log(MathUtils.add(5, 3)); // 8

console.log(MathUtils.random); // random number

console.log(MathUtils.VERSION); // "1.0"

// Trying to access private static method
console.log(MathUtils.#validate(5)); // Error!
```

## 7. Protected Members Convention

```js
class Example {
  _protectedProperty = "protected"; // This is still accessible from outside

  doSomething() {
    this._helperMethod(); // Convention suggests this is internal use only
  }

  _helperMethod() {
    // By convention, should only be used internally or by child classes
  }
}

const ex = new Example();
ex._protectedProperty; // Still works! Not actually protected
ex._helperMethod(); // Still works! Just a convention
```

## Sources

[1] _W3Schools_. (2024). _JavaScript Objects_. Retrieved from https://www.w3schools.com/js/js_objects.asp

[2] _Claude 3.7 Sonnet_. (2024). _Comprehensive understanding of Object-Oriented Programming concepts_.

[3] _Author's personal experience and practical knowledge in JavaScript development_.
