# JavaScript Advanced Concepts for MERN Interviews

## 🔥 Execution Context & Hoisting

### Execution Context Types
```javascript
// 1. Global Execution Context
console.log(this === window); // true in browser

// 2. Function Execution Context
function outerFunction() {
    const outerVar = 'I am outer';
    
    function innerFunction() {
        const innerVar = 'I am inner';
        console.log(outerVar); // Closure - accesses outer scope
    }
    
    return innerFunction;
}

// 3. Eval Execution Context (avoid in production)
```

### Hoisting Deep Dive
```javascript
// Function Declaration Hoisting
console.log(hoistedFunction()); // "I am hoisted!"
function hoistedFunction() {
    return "I am hoisted!";
}

// Function Expression - Not Hoisted
console.log(notHoisted); // undefined
var notHoisted = function() {
    return "I am not hoisted!";
};

// Let/Const Temporal Dead Zone
// console.log(letVar); // ReferenceError
let letVar = 'I am let';

// Class Hoisting
// const instance = new MyClass(); // ReferenceError
class MyClass {
    constructor() {
        this.name = 'Class';
    }
}
```

## 🧠 Closures & Scope Chain

### Closure Patterns
```javascript
// 1. Function Factory
function createCounter() {
    let count = 0;
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
        reset: () => count = 0
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2

// 2. Private Variables with Closures
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit: (amount) => {
            if (amount > 0) balance += amount;
            return balance;
        },
        withdraw: (amount) => {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return balance;
            }
            return 'Insufficient funds';
        },
        getBalance: () => balance
    };
}

// 3. Memoization with Closures
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('From cache:', key);
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        console.log('Computed:', key);
        return result;
    };
}

const expensiveFunction = memoize((n) => {
    console.log('Computing...');
    return n * n;
});
```

## 🔄 Event Loop & Concurrency

### Event Loop Phases
```javascript
// Understanding Event Loop Phases
console.log('Start');

setTimeout(() => console.log('Timer 1'), 0);
setTimeout(() => console.log('Timer 2'), 0);
Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));
process.nextTick(() => console.log('Next Tick 1'));
process.nextTick(() => console.log('Next Tick 2'));

console.log('End');

// Output Order:
// Start
// End
// Next Tick 1
// Next Tick 2
// Promise 1
// Promise 2
// Timer 1
// Timer 2
```

### Microtasks vs Macrotasks
```javascript
// Microtasks: Promise callbacks, queueMicrotask, MutationObserver
// Macrotasks: setTimeout, setInterval, setImmediate, I/O operations

function demonstrateTaskQueue() {
    console.log('Script Start');
    
    setTimeout(() => console.log('Timeout'), 0);
    
    Promise.resolve()
        .then(() => console.log('Promise 1'))
        .then(() => console.log('Promise 2'));
    
    queueMicrotask(() => console.log('Microtask'));
    
    console.log('Script End');
}

demonstrateTaskQueue();
```

## 🏗️ Prototypes & Inheritance

### Prototype Chain
```javascript
// Constructor Function Pattern
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// Inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    return `${this.name} barks`;
};

// ES6 Classes (Syntactic Sugar)
class AnimalES6 {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
    
    static getSpecies() {
        return 'Animal';
    }
}

class DogES6 extends AnimalES6 {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    
    speak() {
        return `${this.name} barks`;
    }
    
    // Private fields (ES2022)
    #privateMethod() {
        return 'Private method';
    }
}
```

## 🎯 Advanced ES6+ Features

### Destructuring Patterns
```javascript
// Array Destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object Destructuring with defaults
const user = { name: 'John', age: 30 };
const { name, age = 25, country = 'USA' } = user;

// Nested Destructuring
const data = {
    user: {
        profile: {
            name: 'Jane',
            address: {
                city: 'NYC'
            }
        }
    }
};

const { user: { profile: { name: userName, address: { city } } } } = data;

// Function Parameter Destructuring
function createUser({ name, age, role = 'user' }) {
    return { name, age, role };
}
```

### Spread & Rest Operators
```javascript
// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Rest Operator
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

// Combining Spread and Rest
const [head, ...tail] = [1, 2, 3, 4];
const { a, ...rest } = { a: 1, b: 2, c: 3 };
```

## 🔄 Async Patterns Deep Dive

### Promise Chaining vs Async/Await
```javascript
// Promise Chain
function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => fetch(`/api/posts/${user.id}`))
        .then(response => response.json())
        .then(posts => ({ user, posts }))
        .catch(error => console.error('Error:', error));
}

// Async/Await (Cleaner)
async function fetchUserDataAsync(userId) {
    try {
        const userResponse = await fetch(`/api/users/${userId}`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`/api/posts/${user.id}`);
        const posts = await postsResponse.json();
        
        return { user, posts };
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw for caller to handle
    }
}

// Parallel Async Operations
async function fetchMultipleData() {
    const [users, posts, comments] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/posts').then(r => r.json()),
        fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
}

// Race Condition Handling
async function fetchWithTimeout(url, timeout = 5000) {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), timeout)
    );
    
    return Promise.race([fetchPromise, timeoutPromise]);
}
```

## 🎨 Design Patterns in JavaScript

### Module Pattern
```javascript
// IIFE Module
const ShoppingCart = (function() {
    let cart = [];
    let total = 0;
    
    function addItem(item) {
        cart.push(item);
        total += item.price;
        return cart;
    }
    
    function removeItem(itemId) {
        const index = cart.findIndex(item => item.id === itemId);
        if (index > -1) {
            total -= cart[index].price;
            cart.splice(index, 1);
        }
        return cart;
    }
    
    function getTotal() {
        return total;
    }
    
    function getCart() {
        return [...cart]; // Return copy
    }
    
    return {
        addItem,
        removeItem,
        getTotal,
        getCart
    };
})();

// ES6 Module Pattern
export class ShoppingCartES6 {
    #cart = [];
    #total = 0;
    
    addItem(item) {
        this.#cart.push(item);
        this.#total += item.price;
        return this.#cart;
    }
    
    // ... other methods
}
```

### Observer Pattern
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return this;
    }
    
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(...args));
        }
        return this;
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
        return this;
    }
}

// Usage
const emitter = new EventEmitter();
emitter.on('data', (data) => console.log('Received:', data));
emitter.emit('data', { message: 'Hello World' });
```

### Factory Pattern
```javascript
class Vehicle {
    constructor(type, brand, model) {
        this.type = type;
        this.brand = brand;
        this.model = model;
    }
    
    drive() {
        return `${this.brand} ${this.model} is driving`;
    }
}

class VehicleFactory {
    static createVehicle(type, brand, model) {
        switch(type.toLowerCase()) {
            case 'car':
                return new Vehicle('car', brand, model);
            case 'truck':
                return new Vehicle('truck', brand, model);
            case 'motorcycle':
                return new Vehicle('motorcycle', brand, model);
            default:
                throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
}

const myCar = VehicleFactory.createVehicle('car', 'Toyota', 'Camry');
```

## 🚀 Performance Optimization

### Memoization & Caching
```javascript
// Function Memoization
function memoizeWithWeakMap(fn) {
    const cache = new WeakMap();
    
    return function(obj) {
        if (cache.has(obj)) {
            return cache.get(obj);
        }
        
        const result = fn.call(this, obj);
        cache.set(obj, result);
        return result;
    };
}

// Debouncing
import React, {useState, useEffect} from 'react';

export function App(props) {
  const [value, setValue] = useState("")
  const [debounce, setDebounce] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => {
      if(value) {
        setDebounce(value)
      }
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [value])
  useEffect(() => {
    if(debounce) {
      console.log("Api Call is Triggered")
    }
  })
  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input type="text" placeholder="Search..." value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
// Log to console
console.log('Hello console')

// Throttling
import React, {useState, useEffect, useCallback} from 'react';

export function App(props) {
  const [searchTerm, setSearchTerm] = useState('');

  // Define a throttled version of the API call function
  const throttledAPICall = useCallback(throttle((searchTerm) => {
    console.log('API call with search term:', searchTerm);
  }, 3000), []);

  useEffect(() => {
    throttledAPICall(searchTerm);
  }, [searchTerm, throttledAPICall]);

  function throttle(func, limit) {
  let inThrottle = false;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

  return (
    <div className="App">
      <header className="App-header">
        <p> Search  </p>
        <input type='text' onChange={(e) => setSearchTerm(e.target.value)} />
      </header>
    </div>
  );
}
// Log to console
console.log('Hello console')

// Usage Examples
const debouncedSearch = debounce((query) => {
    console.log('Searching for:', query);
}, 300);

const throttledScroll = throttle(() => {
    console.log('Scroll event');
}, 100);
```

## 🔧 Memory Management

### Memory Leaks & Prevention
```javascript
// Common Memory Leak: Event Listeners
class Component {
    constructor() {
        this.handleClick = this.handleClick.bind(this);
        document.addEventListener('click', this.handleClick);
    }
    
    handleClick() {
        console.log('Clicked');
    }
    
    // Cleanup method to prevent memory leak
    destroy() {
        document.removeEventListener('click', this.handleClick);
    }
}

// WeakMap for Private Data
const privateData = new WeakMap();

class User {
    constructor(name) {
        privateData.set(this, { name, id: Math.random() });
    }
    
    getName() {
        return privateData.get(this).name;
    }
}

// WeakSet for Tracking
const processed = new WeakSet();

function processItem(item) {
    if (processed.has(item)) {
        return 'Already processed';
    }
    
    // Process item
    processed.add(item);
    return 'Processed';
}
```

## 🧪 Interview Questions & Answers

### Q1: Explain Event Loop in detail
**Answer:** The Event Loop is a fundamental concept in Node.js that allows for non-blocking I/O operations despite being single-threaded. It has several phases:

1. **Timers Phase**: Executes setTimeout/setInterval callbacks
2. **Pending Callbacks Phase**: Executes I/O callbacks deferred to the next loop iteration
3. **Idle, Prepare Phase**: Used internally by Node.js
4. **Poll Phase**: Retrieve new I/O events and execute their callbacks
5. **Check Phase**: Executes setImmediate callbacks
6. **Close Callbacks Phase**: Executes close event callbacks

Microtasks (Promises, queueMicrotask) are processed after each phase before moving to the next phase.

### Q2: What is the Temporal Dead Zone?
**Answer:** The Temporal Dead Zone (TDZ) is the period between entering a scope where a variable is declared and the actual declaration line. For `let` and `const`, variables cannot be accessed before declaration, unlike `var` which is initialized with `undefined`.

### Q3: How does prototypal inheritance work?
**Answer:** Each object has an internal `[[Prototype]]` property that points to another object. When accessing a property, JavaScript first looks at the object itself, then its prototype, then the prototype's prototype, continuing up the chain until reaching `null`.

---

## 💡 Practice Exercises

1. **Implement a Promise-based queue system**
2. **Create a custom event emitter with priority support**
3. **Build a memoization decorator for functions**
4. **Implement a debounce function with immediate execution option**
5. **Create a module system using closures**

This covers the essential JavaScript concepts you'll need for advanced MERN stack interviews. Practice these patterns and understand the underlying mechanisms thoroughly!
