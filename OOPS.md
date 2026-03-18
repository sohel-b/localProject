# Object‑Oriented Programming (OOP) in JavaScript

Object‑oriented programming is a paradigm that models software as a collection of **objects** that combine state (properties) and behavior (methods).  
JavaScript, although prototype‑based, fully supports OOP concepts such as **classes**, **inheritance**, **encapsulation**, **abstraction**, and **polymorphism** (since ES6).

---

## Core Concepts

| Concept          | Description | JavaScript Syntax |
|------------------|-------------|-------------------|
| **Class**        | Blueprint for creating objects. | `class Person { … }` |
| **Object**       | Instance of a class (or a plain object). | `const p = new Person();` |
| **Encapsulation**| Hides internal state, exposing only needed behavior. | Private fields (`#balance`) or closures. |
| **Abstraction**  | Exposes only essential features while hiding implementation details. | Public methods that hide internal logic; see example below. |
| **Inheritance**  | New classes derive from existing ones, reusingclass Employee extends Person { … }` |
| **Polymorphism** | Same method name works differently in subclasses. | Overriding `speak()` in `Dog` vs `Cat`. |

---

*Shows how UI elements can be modeled as classes, with inheritance adding extra visual features.*

### 4️⃣ **Abstraction Example** – Hiding Implementation Details

```js
// abstraction-example.js
class P {
  constructor(name, age) {
    this.name = name;   // public property
    this.age = age;     // public property
  }

  // Public method that abstracts the internal representation
  getName() {
    // The method hides the string‑building logic from callers
    console.log(`Hi, My name is ${this.name} and my age is ${this.age}`);
  }
}

// Client code
const person = new P('Luffy', 22);
person.getName(); // Output: Hi, My name is Luffy and my age is 22
```

**Why this illustrates abstraction**

* **Public Interface:** The class exposes only the `getName()` method. Callers do **not** need to know how the greeting string is constructed; they just request the behavior.
* **Implementation Hiding:** The internal string interpolation (`\`Hi, My name is ${this.name} …\``) is hidden inside the method. If the implementation changes (e.g., localization, different formatting), the client code remains unchanged.
* **Simplified Usage:** Users of `P` work with a simple, high‑level operation—*getting a greeting*—instead of dealing with the details of string concatenation or formatting.

This pattern is the essence of abstraction: providing a clear, simple interface while keeping the complex or change‑prone details private.


### Inheritance Example

```js
class One {
    constructor(name) {
        this.name = name;
    }
    firstFun() {
        console.log(`Hi, This is ${this.name}`);
    }
}

class Two extends One {
    // constructor(name) {
    //     super(name);
    // }
}

const third = new Two("Luffy");
third.firstFun(); // Hi, This is Luffy
```

**Why this illustrates inheritance**

* **Extends keyword:** `Two` uses `extends One` to inherit properties and methods from `One`.
* **Super call:** `super(name)` invokes the parent constructor, initializing the inherited `name` property.
* **Method reuse:** `third.firstFun()` is defined in `One` but callable on a `Two` instance, demonstrating code reuse and hierarchical relationships.


### Polymorphism Example

```js
class Animal {
    speak() {
        console.log("Animal Speaks");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Dog Barks");
    }
}

class Cat extends Animal {
    speak() {
        console.log("Cat Meows");
    }
}

const value = new Animal();
value.speak(); // Animal Speaks

const dog = new Dog();
dog.speak(); // Dog Barks

const cat = new Cat();
cat.speak(); // Cat Meows
```

**Why this illustrates polymorphism**

* **Method overriding:** Subclasses `Dog` and `Cat` provide their own implementation of `speak()` while sharing the same method name defined in the base class `Animal`.
* **Dynamic dispatch:** At runtime, the actual object type determines which `speak()` method is executed, enabling the same call `instance.speak()` to produce different behaviors.
* **Code flexibility:** New animal types can be added with their own `speak()` implementation without modifying existing code that uses the `Animal` interface.



## REAL WORLD EXAMPELS

Polymorphism is the ability to exist in many forms.
Example 1: We can take a boy as a real-world example. This boy can be a student, a player, and a writer. So that this boy can exist in different ways in different situations.
Example 2: Sound of animals. People have the same sound but different animals make different sounds. The following diagram shows few different sounds make by animals.


Inheritance means it allows classes to inherit common properties from the parent class.
Example 1: let's assume that there is a class as Vehicle. All vehicles are not the same. We can inherit common properties like color, size, type from the parent vehicle class and create classes like Car, Bus, Bike.
Example 2: let's take another parent class as Animals. Here also we can inherit common properties like name, sound, color, breed from Animal class and create classes like Dog, Cat, Horse and etc.


Encapsulation means it binds data and code together into one unit.
Example1; the most commonly used example is the medical capsule. This capsule mixes few types of medicines and stored in one capsule.
Example 2: another example for encapsulation is a large organization. An organization is consists of several departments like the production department, purchase department, sales department, and Accounts department. It combines all these departments together and had formed the organization.


In abstraction, it displays only the important information by hiding the implementation part.
Example 1: Let's take the ATM machine. In an ATM machine, we can perform functions like withdraw cash, deposit cash, check balance, print bills, and so on. Even though it performs a lot of actions it doesn’t show us the process. It has hidden its process by showing only the main things like getting inputs and giving the output.
Example 2: The next example is the most commonly used mobile phones. On a mobile phone, we can perform so many actions like making a call, sending messages, take pictures, download software and etc. We perform a lot of things but here also we don't know the inside process of these things. Which means the implementation parts are hidden.
