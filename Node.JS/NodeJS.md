# Node.js

## 1. What is Node.js and what makes it unique?

Node.js is an open-source, cross-platform JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows JavaScript to run outside the browser, enabling server-side development. What makes Node.js unique is its event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

## 2. What is JavaScript runtime environment?

A JavaScript runtime environment is a software system that provides the necessary infrastructure to execute JavaScript code. It includes the JavaScript engine (like V8), APIs for interacting with the operating system, memory management, and a call stack. Examples include web browsers (client-side) and Node.js (server-side).

## 3. What is V8 engine in Node.js?

The V8 engine is Google's open-source high-performance JavaScript and WebAssembly engine, written in C++. In Node.js, V8 compiles JavaScript directly to native machine code before executing it, providing excellent performance. It's the same engine used in Google Chrome and is responsible for executing JavaScript code, managing memory, and optimizing performance through just-in-time (JIT) compilation.

## 4. What is the difference between Node.js and JavaScript?

JavaScript is a programming language, while Node.js is a runtime environment that executes JavaScript code. JavaScript can run in browsers (client-side) and Node.js (server-side), but Node.js provides additional APIs and modules for server-side operations like file system access, networking, and OS interactions that aren't available in browser JavaScript.

## 5. What are the main features of Node.js?

- **Asynchronous and Event-Driven**: All APIs are asynchronous and non-blocking
- **Single-Threaded**: Uses a single thread with event looping for better scalability
- **High Performance**: Built on V8 engine for fast execution
- **NPM**: Largest ecosystem of open-source libraries
- **Cross-Platform**: Runs on Windows, Linux, macOS, etc.
- **Fast Execution**: Compiles JavaScript to machine code

## 6. What is single-threaded architecture in Node.js?

Node.js uses a single-threaded architecture where it maintains a single main thread to handle all operations. Instead of creating new threads for each request, it uses an event loop to handle multiple concurrent operations asynchronously. This approach reduces memory overhead and context switching, making it more efficient for I/O-bound applications.

## 7. What is non-blocking I/O in Node.js?

Non-blocking I/O means that when Node.js performs an I/O operation (like reading a file or making a network request), it doesn't wait for the operation to complete. Instead, it continues executing other code and handles the result when the I/O operation finishes through callbacks or promises. This prevents the application from becoming unresponsive during time-consuming operations.

## 8. What is event-driven programming in Node.js?

Event-driven programming is a paradigm where the flow of the program is determined by events. In Node.js, this is implemented through the EventEmitter class, where objects can emit named events and listeners can be registered to handle those events. The event loop continuously checks for events and executes the corresponding callback functions when events occur.

## 9. What is the difference between frontend and backend JavaScript?

**Frontend JavaScript**:
- Runs in web browsers
- Manipulates DOM, handles user interactions
- Limited browser APIs
- Security restrictions (same-origin policy)
- Frameworks: React, Vue, Angular

**Backend JavaScript (Node.js)**:
- Runs on servers
- File system access, database operations
- Full OS access and networking capabilities
- No browser security restrictions
- Frameworks: Express, NestJS, Koa

## 10. What are the advantages of using Node.js?

- **Fast Execution**: V8 engine provides excellent performance
- **Scalability**: Handles many concurrent connections efficiently
- **Unified Language**: Use JavaScript for both frontend and backend
- **Large Ecosystem**: NPM provides access to millions of packages
- **Real-time Applications**: Excellent for chat apps, gaming, streaming
- **Microservices**: Lightweight and ideal for microservice architecture
- **Cost-Effective**: Reduced development time and server resources
- **Active Community**: Strong support and regular updates
- **Cross-Platform**: Write once, run anywhere
- **Easy to Learn**: JavaScript developers can easily transition to backend development

## Core Modules and Global Objects

### 11. What are global objects in Node.js?

Global objects in Node.js are objects that are available in all modules without needing to be imported with `require()`. They are globally accessible throughout the application. These objects provide essential functionality and information about the Node.js runtime environment.

**Key Global Objects:**
- `global` - The global namespace object
- `process` - Information about the current Node.js process
- `console` - Used for printing to stdout and stderr
- `Buffer` - For handling binary data
- `__dirname` - Directory name of the current module
- `__filename` - File name of the current module
- `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval` - Timer functions

**Example:**
```javascript
// These are available everywhere without importing
console.log("Hello World"); // global console object
console.log(__dirname);     // current directory
console.log(__filename);    // current file path

setTimeout(() => {
    console.log("Executed after 2 seconds");
}, 2000);
```

### 12. What is the process object in Node.js?

The `process` object is a global object that provides information about, and control over, the current Node.js process. It's an instance of `EventEmitter` and provides access to process-related information and functionality.

**Key Properties and Methods:**
- `process.env` - Environment variables
- `process.argv` - Command line arguments
- `process.pid` - Process ID
- `process.platform` - Operating system platform
- `process.version` - Node.js version
- `process.exit()` - Exit the current process
- `process.cwd()` - Current working directory
- `process.memoryUsage()` - Memory usage information

**Example:**
```javascript
// Access command line arguments
console.log(process.argv); 
// Output: ['node', 'script.js', 'arg1', 'arg2']

// Access environment variables
console.log(process.env.NODE_ENV); // undefined unless set
console.log(process.env.PATH);     // System PATH

// Process information
console.log("Process ID:", process.pid);
console.log("Platform:", process.platform);
console.log("Node.js Version:", process.version);

// Memory usage
const memory = process.memoryUsage();
console.log("Memory Usage:", {
    rss: `${Math.round(memory.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(memory.external / 1024 / 1024)} MB`
});

// Exit process with code
if (someCondition) {
    process.exit(1); // Exit with error code
}
```

### 13. What is the global object in Node.js?

The `global` object is the global namespace object in Node.js. It's similar to the `window` object in browsers. Variables declared without `var`, `let`, or `const` become properties of the `global` object, though this is not recommended practice.

### 14. What are the main built-in modules in Node.js?

Node.js provides several built-in modules that don't require installation via npm. These modules provide core functionality for file system operations, networking, data manipulation, and more.

**Main Built-in Modules:**
- `fs` - File System operations
- `path` - Path and file path utilities
- `http` - HTTP server and client
- `https` - HTTPS server and client
- `url` - URL parsing and resolution
- `querystring` - Query string utilities
- `util` - Utility functions
- `events` - Event emitter
- `stream` - Stream handling
- `crypto` - Cryptographic functions
- `os` - Operating system utilities
- `buffer` - Buffer handling
- `child_process` - Child process management
- `cluster` - Cluster management
- `net` - TCP networking
- `dns` - DNS resolution
- `readline` - Readable streams for command line


### 15. How do you use the fs module in Node.js?

The `fs` (File System) module provides APIs for interacting with the file system. It offers both synchronous and asynchronous methods for file operations.

**Key Methods:**
- `fs.readFile()` - Read file asynchronously
- `fs.readFileSync()` - Read file synchronously
- `fs.writeFile()` - Write file asynchronously
- `fs.writeFileSync()` - Write file synchronously
- `fs.appendFile()` - Append to file
- `fs.existsSync()` - Check if file exists
- `fs.mkdir()` - Create directory
- `fs.readdir()` - Read directory contents
- `fs.unlink()` - Delete file

**Example:**
```javascript
const fs = require('fs');
const path = require('path');

// Asynchronous file reading
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

// Synchronous file reading (use with caution)
try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('File content (sync):', data);
} catch (err) {
    console.error('Error reading file:', err);
}

// Writing to a file
const content = 'Hello, Node.js File System!';
fs.writeFile('output.txt', content, 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});

// Using promises with fs.promises
const fsPromises = require('fs').promises;

async function readFileAsync() {
    try {
        const data = await fsPromises.readFile('example.txt', 'utf8');
        console.log('File content (promise):', data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

// Check if file exists
if (fs.existsSync('example.txt')) {
    console.log('File exists');
} else {
    console.log('File does not exist');
}

// Create directory
fs.mkdir('new-folder', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Directory created');
});

// Read directory
fs.readdir('.', (err, files) => {
    if (err) throw err;
    console.log('Directory contents:', files);
});
```

### 16. How do you use the path module in Node.js?

The `path` module provides utilities for working with file and directory paths. It helps create cross-platform compatible path handling since different operating systems use different path separators.

**Key Methods:**
- `path.join()` - Join path segments
- `path.resolve()` - Resolve absolute path
- `path.basename()` - Get file name from path
- `path.dirname()` - Get directory name from path
- `path.extname()` - Get file extension
- `path.parse()` - Parse path into object
- `path.normalize()` - Normalize path

**Example:**
```javascript
const path = require('path');

// Join path segments (cross-platform)
const fullPath = path.join('users', 'john', 'documents', 'file.txt');
console.log('Joined path:', fullPath);
// Output on Windows: 'users\john\documents\file.txt'
// Output on Unix: 'users/john/documents/file.txt'

// Resolve to absolute path
const absolutePath = path.resolve('users', 'john', 'file.txt');
console.log('Absolute path:', absolutePath);

// Get file name (basename)
const fileName = path.basename('/users/john/documents/file.txt');
console.log('File name:', fileName); // 'file.txt'

// Get file name without extension
const fileNameWithoutExt = path.basename('/users/john/documents/file.txt', '.txt');
console.log('File name without extension:', fileNameWithoutExt); // 'file'

// Get directory name
const dirName = path.dirname('/users/john/documents/file.txt');
console.log('Directory name:', dirName); // '/users/john/documents'

// Get file extension
const extName = path.extname('/users/john/documents/file.txt');
console.log('Extension:', extName); // '.txt'

// Parse path into object
const parsedPath = path.parse('/users/john/documents/file.txt');
console.log('Parsed path:', parsedPath);
/*
Output:
{
    root: '/',
    dir: '/users/john/documents',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
}
*/

// Normalize path (removes redundant segments)
const normalizedPath = path.normalize('/users//john/../john/./documents/file.txt');
console.log('Normalized path:', normalizedPath);
// Output: '/users/john/documents/file.txt'

// Check if path is absolute
console.log('Is absolute:', path.isAbsolute('/users/john/file.txt')); // true
console.log('Is absolute:', path.isAbsolute('users/john/file.txt')); // false

// Get relative path between two paths
const relativePath = path.relative('/users/john/documents', '/users/john/pictures');
console.log('Relative path:', relativePath); // '../pictures'
```


### 17. How do you use the http module in Node.js?

The `http` module provides an HTTP server and client API for Node.js. It allows you to create web servers and make HTTP requests.

**Key Classes and Methods:**
- `http.createServer()` - Create HTTP server
- `http.request()` - Make HTTP request
- `http.get()` - Make GET request
- `http.Server` - Server class
- `http.IncomingMessage` - Request object
- `http.ServerResponse` - Response object

**Example:**
```javascript
// simple HTTP server in NodeJS
import http from 'http'
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000/');
});

Handling Different Routes
import http from 'http'
const server = http.createServer((req, res) => {
    if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello, JSON!' }));
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page</h1>');
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello, HTML World!</h1>');
    }
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

### 18. How do you use the url module in Node.js?

The `url` module provides utilities for URL resolution and parsing. It helps break down URLs into their components and construct URLs from components.

**Key Methods:**
- `url.parse()` - Parse URL string into object
- `url.format()` - Format URL object into string
- `url.resolve()` - Resolve relative URL against base URL

### 19. How do you use the querystring module in Node.js?

The `querystring` module provides utilities for parsing and formatting URL query strings. Note: In modern Node.js, the `URLSearchParams` API is preferred, but `querystring` is still available for legacy support.

**Key Methods:**
- `querystring.parse()` - Parse query string into object
- `querystring.stringify()` - Convert object to query string
- `querystring.escape()` - URL-escape characters
- `querystring.unescape()` - URL-unescape characters

### 20. How do you use the util module in Node.js?

The `util` module provides utility functions that are primarily for internal Node.js use, but many are useful for application developers. It includes functions for debugging, type checking, callback to promise conversion, and more.

**Key Methods:**
- `util.inspect()` - String representation of objects
- `util.promisify()` - Convert callback-based functions to promises
- `util.callbackify()` - Convert promise-based functions to callbacks
- `util.format()` - Format strings (similar to printf)
- `util.types` - Type checking utilities
- `util.inherits()` - Prototype inheritance (deprecated)


**21. What is CommonJS in Node.js?**  
CommonJS is the original module system used by Node.js. It defines a synchronous `require()` function to load modules and an `exports` object (or `module.exports`) to expose functionality. Modules are wrapped in a function scope, providing isolation and allowing each file to act as its own module.

**22. How does `require()` work in Node.js?**  
When `require('module')` is called, Node.js resolves the module identifier to a file path, loads the file, wraps its code in a function, executes it, and caches the exported value. The returned value is whatever the module assigned to `module.exports` (or `exports`). Subsequent calls return the cached export without re‑executing the module.

**23. What is `module.exports` in Node.js?**  
`module.exports` is the object (or any value) that a module chooses to expose to other modules. Whatever is assigned to `module.exports` becomes the result of `require()` for that module. By default it is an empty object `{}`.

**24. What is the difference between `module.exports` and `exports`?**  
`exports` is a **reference** to `module.exports`. You can add properties to `exports` (e.g., `exports.foo = …`) and they will appear on `module.exports`. However, reassigning `exports` (e.g., `exports = function(){}`) breaks the reference, and the new value will **not** be exported. To export a single value, assign directly to `module.exports`.

**25. What is the module caching mechanism in Node.js?**  
After a module is loaded and its code executed, Node.js stores the resulting `module.exports` in an internal cache keyed by the resolved filename. Future `require()` calls for the same module return the cached export instantly, preventing re‑execution and improving performance. The cache can be cleared manually via `delete require.cache[require.resolve('./myModule')]`.

**26. What are the different types of modules in Node.js?**  
1. **Core (built‑in) modules** – shipped with Node (e.g., `fs`, `path`, `http`).  
2. **Third‑party (npm) modules** – installed via npm/yarn and located in `node_modules`.  
3. **Local (user‑defined) modules** – files you create in your project and load with relative paths.

**27. How do you create custom modules in Node.js?**  
Create a JavaScript file (e.g., `myUtil.js`) and assign the public API to `module.exports` or `exports`. Then import it elsewhere with `const myUtil = require('./myUtil');`.

```js
// myUtil.js
function add(a, b) { return a + b; }
module.exports = { add };
```

**28. What is the difference between `require` and `import`?**  
- `require` is the CommonJS synchronous loader, available in all Node versions.  
- `import` is the ES‑module (ESM) syntax, which is asynchronous (static) and must be used in files interpreted as ES modules (`.mjs` or with `"type": "module"` in `package.json`). `import` supports named and default exports, while `require` works with the whole `module.exports` object.

**29. What are ES modules in Node.js?**  
ES modules (ESM) are the standardized JavaScript module system defined by the ECMAScript specification. In Node.js they use the `import` / `export` syntax, support static analysis, and enable features like tree‑shaking. Files are treated as ES modules when they have a `.mjs` extension or when the nearest `package.json` contains `"type": "module"`.

**30. How do you enable ES modules in Node.js?**  
1. Add `"type": "module"` to your project's `package.json`, **or**  
2. Use the `.mjs` file extension for module files.  

After that, you can write:

```js
// utils.mjs
export function greet(name) { console.log(`Hello, ${name}`); }

// main.mjs
import { greet } from './utils.mjs';
greet('World');
```


**31. What is the event loop in Node.js?**  
The event loop is a core mechanism in Node.js that enables non‑blocking I/O by continuously checking for and processing events (callbacks, timers, I/O completions, etc.) from various queues. It allows Node.js to handle many concurrent operations on a single thread.

**32. How does the event loop work in Node.js?**  
When the Node.js process starts, it initializes the event loop and executes the top‑level code. After the call stack is empty, the event loop enters a series of phases. In each phase it processes callbacks from the corresponding queue, then moves to the next phase. This continues until there are no more callbacks, timers, or I/O tasks pending, at which point the process exits.

**33. What are the different phases of the event loop?**  
1. **timers** – executes callbacks scheduled by `setTimeout` and `setInterval`.  
2. **pending callbacks** – executes I/O callbacks deferred to the next loop iteration.  
3. **idle, prepare** – internal use only.  
4. **poll** – retrieves new I/O events; executes I/O callbacks ready to be processed.  
5. **check** – executes callbacks scheduled by `setImmediate`.  
6. **close callbacks** – executes `close` event callbacks (e.g., `socket.on('close')`).  

After each phase, the event loop also processes the **microtask queue** (promises, `process.nextTick`) before moving to the next phase.

**34. What is the difference between `setTimeout` and `setImmediate`?**  
- `setTimeout(fn, delay)` schedules `fn` to run after at least `delay` milliseconds. The callback is placed in the **timers** phase.  
- `setImmediate(fn)` schedules `fn` to run on the **check** phase, after the poll phase completes. It executes as soon as possible, without a minimum delay, but always after I/O callbacks in the poll phase.

**35. What is the difference between `process.nextTick` and `setImmediate`?**  
- `process.nextTick(fn)` queues `fn` in the **next‑tick queue**, which is processed **immediately after the current operation** and **before** the event loop proceeds to the next phase. It has higher priority than microtasks.  
- `setImmediate(fn)` queues `fn` in the **check** phase, which runs after the poll phase. It is executed later than `process.nextTick`.

**36. How does the event loop handle timers?**  
When `setTimeout` or `setInterval` is called, Node.js stores the callback with its target timestamp. In the **timers** phase, the loop checks which timers have expired (current time ≥ target time) and moves their callbacks to the timer queue for execution.

**37. How does the event loop handle I/O operations?**  
Node.js delegates I/O to the libuv thread pool or the operating system’s asynchronous APIs. When an I/O operation completes, its callback is placed in the **poll** queue. During the **poll** phase, the event loop processes these callbacks. If the poll queue is empty, the loop may block waiting for new I/O events or move to the **check** phase.

**38. What are microtasks and macrotasks in Node.js?**  
- **Microtasks**: tasks that run after the current operation and before the event loop proceeds to the next phase. In Node.js, this includes promise reaction jobs (`.then/.catch/.finally`) and `process.nextTick` callbacks.  
- **Macrotasks** (or tasks): callbacks scheduled by timers (`setTimeout`, `setInterval`), I/O callbacks, `setImmediate`, and `close` callbacks. They are processed in their respective event‑loop phases.

**39. How does the event loop handle promises?**  
When a promise is resolved or rejected, its `.then/.catch/.finally` handlers are queued as **microtasks**. After the current JavaScript stack empties, the event loop processes the microtask queue before moving to the next phase, ensuring promise callbacks run before any macrotasks scheduled for that iteration.

**40. What is the difference between callback queue and microtask queue?**  
- **Callback queue (macrotask queue)**: holds callbacks from timers, I/O, `setImmediate`, and other phase‑specific queues. These are processed in the order defined by the event‑loop phases.  
- **Microtask queue**: holds promise callbacks and `process.nextTick` callbacks. It is processed **immediately after each phase** (and after the current call stack) and has higher priority, meaning microtasks run before the next macrotask phase begins.



**41. What is callback hell in Node.js?**  
Callback hell (also called “pyramid of doom”) occurs when multiple asynchronous operations are nested within each other’s callbacks, leading to deeply indented, hard‑to‑read, and difficult‑to‑maintain code.

**42. How do you avoid callback hell?**  
- Use **Promises** or **async/await** to flatten the control flow.  
- Modularize code: extract each asynchronous step into a named function.  
- Leverage control‑flow libraries (e.g., `async`).  
- Apply functional composition or reactive patterns (RxJS).

**43. What are promises in Node.js?**  
A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It provides a `then`/`catch` interface for chaining and handling outcomes.

**44. How do you create a promise in Node.js?**  
```js
const myPromise = new Promise((resolve, reject) => {
  // asynchronous work
  if (/* success */) {
    resolve(result);
  } else {
    reject(error);
  }
});
```

**45. What are promise states in Node.js?**  
1. **Pending** – initial state, neither fulfilled nor rejected.  
2. **Fulfilled** – operation completed successfully; `resolve` called.  
3. **Rejected** – operation failed; `reject` called.

  **46. How do you handle promise rejections?**  
- Attach a `.catch()` handler: `promise.catch(err => { /* handle */ });`  
- Provide a second argument to `.then()`: `promise.then(onFulfilled, onRejected);`  
- Use `try/catch` with `await` inside an async function.

**47. What is `Promise.all()` in Node.js?**  
`Promise.all(iterable)` returns a single Promise that fulfills when **all** promises in the iterable have fulfilled, yielding an array of their results. If any promise rejects, the returned promise rejects immediately with that reason. (OR)  Waits for all promises in the iterable to settle. | Resolves with an array of each promise’s fulfilled value, preserving order. | Rejects immediately when the first promise rejects, with that rejection reason

const promise1 = Promise.resolve("Promise 1");
const promise2 = Promise.resolve("Promise 2")

Promise.all([promise1, promise2])
  .then(values => {
    console.log(values); // Output: ["Promise 1", "Promise 2"]
  })
  .catch(error => {
    console.error(error);
  });


**48. What is `Promise.race()` in Node.js?**  
`Promise.race(iterable)` returns a Promise that settles (either fulfills or rejects) as soon as any of the input Promises settles, regardless of whether it fulfills or rejects. The outcome of Promise.race() will be the outcome of the first Promise to settle.

 
**49. What is `Promise.allSettled()` in Node.js?**  
`Promise.allSettled(iterable)` returns a Promise that fulfills after **all** input promises have settled (either fulfilled or rejected). The result is an array of objects describing each outcome: `{ status: "fulfilled", value: … }` or `{ status: "rejected", reason: … }`.

**50. What is `Promise.any()` in Node.js?**
`Promise.any(iterable)` returns a Promise that fulfills as soon as **any** of the input promises fulfills, with the value of the first fulfilled promise. If all promises reject, it rejects with an `AggregateError` containing all rejection reasons.

const promise1 = Promise.resolve("Promise 1");
const promise2 = Promise.resolve("Promise 2")
const promise3 = Promise.reject("Promise 3")

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// Expected output: "quick"


**51. What is async/await in Node.js?**  
`async`/`await` is syntactic sugar built on top of Promises that allows asynchronous code to be written in a synchronous‑style fashion. An `async` function always returns a Promise, and the `await` keyword pauses execution of that function until the awaited Promise settles.

**52. How does async/await work under the hood?**  
When the JavaScript engine encounters `await expr` inside an `async` function, it:
1. Evaluates `expr` and converts it to a Promise (if it isn’t already).  
2. Suspends the current async function, returning control to the event loop.  
3. Registers the rest of the function as a `.then`/`.catch` continuation on the Promise.  
4. Once the Promise resolves or rejects, the engine resumes the function, injecting the resolved value (or throwing the rejection).

**53. What are the advantages of async/await over promises?**  
- **Readability:** Linear, top‑to‑bottom flow without nested `.then` chains.  
- **Error handling:** Use standard `try/catch` instead of separate `.catch` callbacks.  
- **Debugging:** Stack traces are clearer; stepping through code feels like synchronous code.  
- **Control flow:** Easier to write loops, conditionals, and early returns with asynchronous operations.

**54. How do you handle errors with async/await?**  
Wrap `await` calls in `try/catch` blocks:

```js
async function fetchData() {
  try {
    const result = await someAsyncOperation();
    return result;
  } catch (err) {
    console.error('Operation failed:', err);
    // handle or re‑throw
    throw err;
  }
}
```

If you want a single‑line handling, you can also use `.catch` on the returned Promise.

**55. How do you use async/await with loops?**  
- **Sequential iteration:** Use `for…of` with `await` inside the loop.

```js
for (const item of items) {
  await process(item);   // waits for each iteration
}
```

- **Parallel iteration:** Map to Promises and `await Promise.all`.

```js
await Promise.all(items.map(item => process(item)));
```

Avoid `Array.prototype.forEach` with `await` because it doesn’t wait for the callbacks.

**56. How do you use async/await with Promise.all?**  
Combine `await` with `Promise.all` to run multiple async operations concurrently and wait for all to finish:

```js
async function fetchAll(urls) {
  const promises = urls.map(url => fetch(url).then(r => r.json()));
  const results = await Promise.all(promises);
  return results;
}
```

If any promise rejects, `Promise.all` rejects and the `await` throws, which you can catch with `try/catch`.

**57. What is the difference between async functions and regular functions?**  
- **Return value:** An `async` function always returns a Promise; a regular function returns whatever you explicitly return.  
- **Awaitability:** Only inside `async` functions can you use the `await` keyword.  
- **Implicit promise handling:** Errors thrown inside an `async` function automatically reject the returned Promise.

**58. How do you convert callback‑based functions to async/await?**  
Wrap the callback API in a Promise (often called “promisify”):

```js
const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);

// Now you can use it with await
async function loadConfig() {
  const data = await readFile('config.json', 'utf8');
  return JSON.parse(data);
}
```

If you prefer manual wrapping:

```js
function asyncFn(arg) {
  return new Promise((resolve, reject) => {
    callbackBasedFn(arg, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
```

**59. What are the common pitfalls with async/await?**  
- **Uncaught rejections:** Forgetting `try/catch` leads to unhandled Promise rejections.  
- **Serial vs. parallel:** Using `await` inside a loop unintentionally serializes operations.  
- **Returning non‑Promise values:** Accidentally returning a value without `await` can cause subtle bugs.  
- **Mixing with `.then`/`.catch`:** Can make code harder to read; stick to one style per function.  
- **Blocking the event loop:** `await` does not block the thread, but CPU‑heavy synchronous code before an `await` still blocks.

**60. How do you debug async/await code?**  
- **Source maps & breakpoints:** Modern debuggers (VS Code, Chrome DevTools) understand async stack traces; set breakpoints on `await` lines.  
- **`console.log` before/after await:** Shows when the function pauses and resumes.  
- **Node’s `--inspect` flag:** Run `node --inspect-brk file.js` and attach a debugger.  
- **`async_hooks` module:** For advanced tracing of async resources.  
- **`try/catch` with logging:** Capture errors around `await` to see stack traces.


**61. What are the different types of errors in Node.js?**  
- **SyntaxError** – thrown when JavaScript code cannot be parsed.  
- **ReferenceError** – occurs when a non‑existent variable is accessed.  
- **TypeError** – raised when a value is not of the expected type.  
- **RangeError** – thrown when a numeric value is out of allowed range (e.g., invalid array length).  
- **EvalError** – related to the use of `eval()` (rare in modern code).  
- **URIError** – occurs when `encodeURI`/`decodeURI` receive malformed strings.  
- **System/OS errors** – represented by `Error` objects with an `code` property (e.g., `ENOENT`, `EACCES`).  
- **Custom errors** – user‑defined classes extending `Error`.

**62. How do you handle synchronous errors in Node.js?**  
Wrap the code that may throw in a `try…catch` block:

```js
try {
  // synchronous operation that may throw
  const data = JSON.parse(jsonString);
  // further processing
} catch (err) {
  console.error('Synchronous error:', err);
  // handle or re‑throw
}
```

**63. How do you handle asynchronous errors in Node.js?**  
- **Callback‑based APIs** – follow the error‑first callback pattern (`function(err, result)`).  
- **Promise‑based APIs** – attach `.catch()` handlers or use `try/catch` with `await`.  
- **Event emitters** – listen for `'error'` events on streams, servers, etc.

**64. What is `uncaughtException` in Node.js?**  
`process.on('uncaughtException', handler)` captures exceptions that bubble out of the event loop without being caught. It is a last‑resort safety net; the process is usually in an undefined state, so the recommended action is to log the error and gracefully shut down.

```js
process.on('uncaughtException', err => {
  console.error('Uncaught exception:', err);
  // clean up resources, then exit
  process.exit(1);
});
```

**65. What is `unhandledRejection` in Node.js?**  
`process.on('unhandledRejection', handler)` catches Promise rejections that have no `.catch()` handler attached. Like `uncaughtException`, it should be used to log the issue and terminate or restart the process.

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1);
});
```

**66. How do you create custom errors in Node.js?**  
Extend the built‑in `Error` class:

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    // optional custom properties
    this.statusCode = 400;
  }
}

// usage
throw new ValidationError('Invalid input data');
```

**67. What is the error‑first callback pattern?**  
A convention where the first argument of a callback is an error object (or `null` if no error), followed by the successful result(s). Example:

```js
fs.readFile('file.txt', (err, data) => {
  if (err) {
    // handle error
    return console.error(err);
  }
  // use data
  console.log(data.toString());
});
```

**68. How do you handle errors with promises?**  
Attach a `.catch()` handler to the promise chain:

```js
someAsyncOperation()
  .then(result => {
    // process result
  })
  .catch(err => {
    console.error('Promise error:', err);
    // recover or re‑throw
  });
```

**69. How do you handle errors with async/await?**  
Wrap `await` calls in `try…catch` blocks:

```js
async function run() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error('Async/await error:', err);
  }
}
```

**70. What are the best practices for error handling in Node.js?**  
- Use **error‑first callbacks** or **Promises** consistently.  
- Centralize error handling (e.g., Express error‑handling middleware).  
- Log errors with sufficient context (stack trace, request ID).  
- Do not swallow errors; propagate them to a higher level.  
- Gracefully shut down the process on `uncaughtException` / `unhandledRejection`.  
- Validate inputs early and throw/return meaningful errors.  
- Create and use **custom error classes** for domain‑specific failures.  
- Avoid blocking the event loop in error handlers; keep them asynchronous when possible.


**71. What are streams in Node.js?**  
Streams are abstract interfaces for working with streaming data—reading or writing data piece‑by‑piece instead of loading the entire dataset into memory. They enable efficient processing of large or infinite data sources such as files, network sockets, or HTTP requests.

**72. What are the different types of streams in Node.js?**  
1. **Readable** – sources of data (e.g., `fs.createReadStream`).  
2. **Writable** – destinations for data (e.g., `fs.createWriteStream`).  
3. **Duplex** – both readable and writable (e.g., TCP sockets).  
4. **Transform** – a duplex stream that modifies or transforms the data as it passes through (e.g., `zlib.createGzip`).

**73. What is the difference between readable and writable streams?**  
- **Readable streams** emit `'data'` events (or can be read via `.read()`) to provide chunks of data to the consumer.  
- **Writable streams** expose a `.write(chunk)` method (or accept `'data'` via piping) to receive chunks and eventually emit `'finish'` when all data has been written.

**74. What is a duplex stream in Node.js?**  
A duplex stream implements both the readable and writable interfaces, allowing data to flow in both directions independently. Common examples are network sockets (`net.Socket`) and `fs.createReadStream` piped into `fs.createWriteStream` via `stream.Duplex`.

**75. What is a transform stream in Node.js?**  
A transform stream is a specialized duplex stream that processes input data and outputs transformed data. It implements a `_transform(chunk, encoding, callback)` method where you manipulate the chunk and push the result downstream. Examples include compression (`zlib.createGzip`) and encryption streams.

**76. How do you create custom streams in Node.js?**  
Extend the appropriate base class from the `stream` module and implement required methods:

```js
const { Transform } = require('stream');

class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}
module.exports = UpperCaseTransform;
```

For readable or writable streams, extend `Readable` or `Writable` and implement `_read` or `_write` respectively.

**77. What is pipe() method in streams?**  
`readable.pipe(writable)` connects a readable stream to a writable stream, automatically handling data flow, backpressure, and end events. It returns the destination stream, allowing chaining (e.g., `src.pipe(gzip).pipe(dest)`).

**78. How do you handle stream errors?**  
Listen for the `'error'` event on each stream involved:

```js
stream.on('error', err => {
  console.error('Stream error:', err);
  // cleanup or abort
});
```

When using `pipe`, you can also attach an error handler to the source or destination, or use `pipeline` from `stream` which forwards errors and provides a callback.

**79. What is backpressure in streams?**  
Backpressure occurs when a writable destination cannot process incoming data as fast as the readable source provides it. The stream mechanism throttles the source, causing `write()` to return `false` and pausing the `'data'` events until the destination drains.

**80. How do you handle backpressure in Node.js?**  
- Respect the return value of `writable.write(chunk)`. If it returns `false`, pause the readable stream (`readable.pause()`) and resume it on the `'drain'` event.  
- Use `pipe`, which automatically manages backpressure.  
- For custom streams, implement proper `_write` handling and emit `'drain'` when ready for more data.



**81. What are buffers in Node.js?**  
Buffers are fixed‑size raw binary data containers. They allow handling of binary data (e.g., files, network streams) directly in memory without converting to strings.

**82. How do you create buffers in Node.js?**  
You can create a Buffer using the `Buffer` constructor (deprecated), `Buffer.from()`, `Buffer.alloc()`, or `Buffer.allocUnsafe()`.

**83. What are the different ways to create buffers?**  

| Method | Description |
|--------|-------------|
| `Buffer.from(array)` | Creates a Buffer from an array of bytes. |
| `Buffer.from(string, [encoding])` | Creates a Buffer from a string using the specified encoding (default `'utf8'`). |
| `Buffer.from(buffer)` | Copies an existing Buffer. |
| `Buffer.alloc(size[, fill[, encoding]])` | Allocates a Buffer of `size` bytes, filled with `fill` (default `0`). |
| `Buffer.allocUnsafe(size)` | Allocates a Buffer of `size` bytes **without** zero‑filling (faster, but may contain old data). |
| `new Buffer(size)` | Legacy constructor (deprecated). |

**84. How do you read from buffers?**  
Use methods like `buf.toString([encoding], [start], [end])` to get a string, or read individual bytes with `buf[index]`. You can also slice a portion with `buf.slice(start, end)`.

**85. How do you write to buffers?**  
- `buf.write(string, offset, length, encoding)` writes a string into the buffer.  
- Direct assignment: `buf[index] = value` for a single byte.  
- `buf.copy(targetBuffer, targetStart, sourceStart, sourceEnd)` copies data between buffers.

**86. What is the difference between buffers and strings?**  
- Buffers store raw binary data; strings are sequences of characters encoded in a specific charset.  
- Buffers have a fixed length; strings are immutable in JavaScript.  
- Buffers are ideal for binary protocols, file I/O, and network communication, while strings are for textual data.

**87. How do you convert buffers to strings?**  
`buffer.toString([encoding], [start], [end])` – common encodings: `'utf8'`, `'hex'`, `'base64'`, `'ascii'`.

**88. How do you convert strings to buffers?**  
`Buffer.from(string, [encoding])` – e.g., `Buffer.from('hello', 'utf8')`.

**89. What are buffer methods in Node.js?**  
- `buf.length` – size in bytes.  
- `buf.slice(start, end)` – returns a new view.  
- `buf.copy(target, targetStart, sourceStart, sourceEnd)` – copy data.  
- `buf.equals(otherBuffer)` – compare equality.  
- `buf.compare(otherBuffer)` – lexical comparison.  
- `buf.fill(value[, offset[, end]][, encoding])` – fill with a value.  
- `buf.indexOf(value[, byteOffset][, encoding])` – search.  
- `buf.includes(value[, byteOffset][, encoding])` – boolean check.  
- `buf.readUInt8(offset)`, `buf.readInt16LE(offset)`, etc. – read integers.  
- `buf.writeUInt8(value, offset)`, `buf.writeInt16LE(value, offset)`, etc. – write integers.

**90. How do you handle binary data in Node.js?**  
- Use Buffers for in‑memory binary manipulation.  
- Stream binary data with `fs.createReadStream` / `fs.createWriteStream` or network sockets.  
- Convert between Buffers and other formats (strings, TypedArrays) as needed.  
- When dealing with large files, pipe streams to avoid loading the entire file into memory.

## File System

**91. What is the `fs` module in Node.js?**  
`fs` (File System) is a core Node.js module that provides an API for interacting with the file system: reading, writing, updating, deleting files and directories, both synchronously and asynchronously.

**92. What is the difference between synchronous and asynchronous `fs` methods?**  
- **Asynchronous** methods (`fs.readFile`, `fs.writeFile`, etc.) accept a callback or return a Promise (when using `fs.promises`). They do not block the event loop; execution continues while I/O is performed.  
- **Synchronous** methods (`fs.readFileSync`, `fs.writeFileSync`, etc.) block the event loop until the operation completes, returning the result directly. Use them only in scripts or startup code where blocking is acceptable.

**93. How do you read files in Node.js?**  

```js
// Asynchronous (callback)
const fs = require('fs');
fs.readFile('path/to/file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Asynchronous (Promise)
fs.promises.readFile('path/to/file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Synchronous
const data = fs.readFileSync('path/to/file.txt', 'utf8');
console.log(data);
```

**94. How do you write files in Node.js?**  

```js
// Asynchronous (callback)
fs.writeFile('out.txt', 'Hello World', 'utf8', err => {
  if (err) throw err;
  console.log('File written');
});

// Asynchronous (Promise)
await fs.promises.writeFile('out.txt', 'Hello World', 'utf8');

// Synchronous
fs.writeFileSync('out.txt', 'Hello World', 'utf8');
```

**95. How do you append to files in Node.js?**  

```js
// Asynchronous
fs.appendFile('log.txt', 'New line\n', err => {
  if (err) throw err;
});

// Promise
await fs.promises.appendFile('log.txt', 'New line\n');

// Synchronous
fs.appendFileSync('log.txt', 'New line\n');
```

**96. How do you delete files in Node.js?**  

```js
// Asynchronous
fs.unlink('old.txt', err => {
  if (err) throw err;
});

// Promise
await fs.promises.unlink('old.txt');

// Synchronous
fs.unlinkSync('old.txt');
```

**97. How do you check if a file exists in Node.js?**  
- **Deprecated**: `fs.exists(path, callback)` (still works but not recommended).  
- **Recommended**: Use `fs.access` or `fs.promises.access`:

```js
fs.access('file.txt', fs.constants.F_OK, err => {
  console.log(err ? 'Does not exist' : 'Exists');
});

// Promise
await fs.promises.access('file.txt', fs.constants.F_OK);
```

**98. How do you work with directories in Node.js?**  

```js
// Create directory
fs.mkdir('myDir', { recursive: true }, err => { /* ... */ });
await fs.promises.mkdir('myDir', { recursive: true });

// Read directory contents
fs.readdir('myDir', (err, files) => { /* ... */ });
await fs.promises.readdir('myDir');

// Remove directory
fs.rmdir('myDir', err => { /* ... */ });
await fs.promises.rmdir('myDir');

// Remove non‑empty directory (Node 12+)
fs.rm('myDir', { recursive: true, force: true }, err => { /* ... */ });
await fs.promises.rm('myDir', { recursive: true, force: true });
```

**99. How do you watch for file changes in Node.js?**  

```js
const watcher = fs.watch('file.txt', (eventType, filename) => {
  console.log(`Event: ${eventType} on ${filename}`);
});

// Using fs.watchFile (polling)
fs.watchFile('file.txt', (curr, prev) => {
  console.log('File changed');
});
```

**100. What are file streams in Node.js?**  
File streams are `Readable` and `Writable` stream objects that handle file I/O piece‑by‑piece, which is memory‑efficient for large files.

```js
// Read stream
const readStream = fs.createReadStream('large.txt', { encoding: 'utf8' });
readStream.on('data', chunk => console.log(chunk));
readStream.on('end', () => console.log('Done'));

// Write stream
const writeStream = fs.createWriteStream('out.txt');
writeStream.write('First line\n');
writeStream.end('Last line\n');
```

You can also pipe streams:

```js
fs.createReadStream('source.txt')
  .pipe(fs.createWriteStream('dest.txt'));
```


**101. What is the `path` module in Node.js?**  
The `path` module is a core Node.js library that provides utilities for working with file and directory paths in a way that is safe across different operating systems.

**102. How do you join paths in Node.js?**  
Use `path.join(...segments)` to concatenate path segments, inserting the appropriate platform‑specific separator (`/` on POSIX, `\` on Windows).

```js
const path = require('path');
const fullPath = path.join('folder', 'subfolder', 'file.txt'); // "folder/subfolder/file.txt"
```

**103. How do you get the file extension in Node.js?**  
`path.extname(filePath)` returns the extension, including the leading dot.

```js
const ext = path.extname('archive.tar.gz'); // ".gz"
```

**104. How do you get the directory name in Node.js?**  
`path.dirname(filePath)` returns the directory portion of a path.

```js
const dir = path.dirname('/usr/local/bin/node'); // "/usr/local/bin"
```

**105. How do you get the base name in Node.js?**  
`path.basename(filePath, [ext])` returns the last portion of a path. Supplying the optional `ext` removes that extension from the result.

```js
const base = path.basename('/home/user/file.txt'); // "file.txt"
const name = path.basename('/home/user/file.txt', '.txt'); // "file"
```

**106. How do you normalize paths in Node.js?**  
`path.normalize(p)` resolves `..`, `.` and duplicate separators, producing a canonical path.

```js
const normalized = path.normalize('foo//bar/../baz'); // "foo/baz"
```

**107. How do you resolve paths in Node.js?**  
`path.resolve(...segments)` resolves a sequence of paths to an absolute path, using the current working directory as the base when needed.

```js
const absolute = path.resolve('src', '..', 'dist'); // e.g., "/home/user/project/dist"
```

**108. What is the difference between `path.join` and `path.resolve`?**  
- `path.join` simply concatenates segments and normalizes the result; it does **not** guarantee an absolute path.  
- `path.resolve` processes the segments from right to left, stops at the first absolute segment, and returns an absolute path. If no absolute segment is found, it uses `process.cwd()` as the base.

**109. How do you work with absolute and relative paths?**  
- Use `path.isAbsolute(p)` to test if a path is absolute.  
- Convert a relative path to absolute with `path.resolve(p)` or `path.join(process.cwd(), p)`.  
- Convert an absolute path to a relative one with `path.relative(from, to)`.

```js
const rel = path.relative('/data/projects', '/data/projects/app/index.js'); // "app/index.js"
```

**110. How do you handle cross‑platform path issues?**  
- Always use the `path` module instead of manual string concatenation.  
- Prefer `path.sep` when you need the platform‑specific separator.  
- Use `path.posix` or `path.win32` for explicit POSIX or Windows behavior if required.  
- Avoid hard‑coded separators (`/` or `\`) in code that runs on multiple OSes.

## HTTP Module

**111. What is the `http` module in Node.js?**  
The `http` module is a core library that provides the ability to create HTTP servers and make HTTP client requests. It implements the HTTP/1.1 protocol.

**112. How do you create an HTTP server in Node.js?**  
Use `http.createServer([requestListener])` which returns an `http.Server` object. Call `.listen(port, [hostname], [callback])` to start listening.

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');
});

server.listen(3000, () => console.log('Server running on port 3000'));
```

**113. How do you make HTTP requests in Node.js?**  
Use `http.request(options, callback)` for custom requests or `http.get(url, callback)` for simple GET requests. Both return an `http.ClientRequest` object.

```js
const http = require('http');

http.get('http://example.com', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
```

**114. What are HTTP methods in Node.js?**  
The standard methods are `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, and `TRACE`. They are sent as the `method` property in the request options.

```js
const options = { method: 'POST', hostname: 'example.com', path: '/api' };
http.request(options, res => { /* ... */ });
```

**115. How do you handle HTTP headers in Node.js?**  
- In a server, read incoming headers via `req.headers` (lower‑cased keys).  
- Set response headers with `res.setHeader(name, value)` or `res.writeHead(statusCode, headers)`.  
- In a client request, provide a `headers` object in the options.

```js
// Server side
res.setHeader('Content-Type', 'application/json');

// Client side
const options = { headers: { 'Accept': 'application/json' } };
http.request(options, res => { /* ... */ });
```

**116. How do you handle query parameters in Node.js?**  
Parse the URL using the built‑in `url` module or `new URL()`.

```js
const { URL } = require('url');
const reqUrl = new URL(req.url, `http://${req.headers.host}`);
const query = Object.fromEntries(reqUrl.searchParams);
```

**117. How do you handle request body in Node.js?**  
Collect data chunks from the `'data'` event and process them on `'end'`. For JSON, `JSON.parse` the accumulated string.

```js
let body = '';
req.on('data', chunk => body += chunk);
req.on('end', () => {
  const data = JSON.parse(body);
  // handle data
});
```

**118. How do you handle file uploads in Node.js?**  
The core `http` module only provides raw streams. Use a multipart parsing library such as `multer`, `formidable`, or `busboy`. These libraries consume the request stream and write files to disk or memory.

```js
// Example with busboy
const Busboy = require('busboy');
app.post('/upload', (req, res) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename) => {
    file.pipe(fs.createWriteStream(`./uploads/${filename}`));
  });
  busboy.on('finish', () => res.end('Upload complete'));
  req.pipe(busboy);
});
```

**119. How do you handle cookies in Node.js?**  
Parse incoming cookies from `req.headers.cookie` (a semicolon‑separated string) and set cookies via the `Set-Cookie` response header. Helper libraries like `cookie` or `cookie-parser` simplify this.

```js
// Parsing
const cookie = require('cookie');
const cookies = cookie.parse(req.headers.cookie || '');

// Setting
res.setHeader('Set-Cookie', cookie.serialize('sessionId', 'abc123', {
  httpOnly: true,
  maxAge: 3600
}));
```

**120. How do you handle sessions in Node.js?**  
Sessions are typically managed with middleware (e.g., `express-session` for Express). The middleware stores a session identifier in a cookie and keeps session data in memory, a database, or a cache (Redis, MongoDB).

```js
const session = require('express-session');
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
```

In a plain `http` server you would manually generate a session ID, store session data in a store (object, Redis, etc.), and set the ID as a cookie on the response.


**121. What is Express.js?**  
Express.js is a minimal and flexible web application framework for Node.js that provides a robust set of features for building single‑page, multi‑page, and hybrid web applications. It simplifies routing, middleware management, and request/response handling.

**122. How do you set up an Express.js application?**  
1. Initialize a Node.js project (`npm init -y`).  
2. Install Express (`npm install express`).  
3. Create an entry file (e.g., `app.js`) and write:

```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

4. Run the app with `node app.js` (or `npm start` if a start script is defined).

**123. What is middleware in Express.js?**  
Middleware are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the request‑response cycle (`next`). They can execute code, modify `req`/`res`, end the request, or call `next()` to pass control.

**124. How do you create custom middleware in Express.js?**  

```js
function myLogger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // pass control to the next middleware
}

// Use it globally
app.use(myLogger);
```

You can also create route‑specific middleware by passing the function as an argument to a route handler.

**125. What is the order of middleware execution in Express.js?**  
Middleware are executed in the order they are added with `app.use()` or route definitions. Global middleware runs first, then route‑specific middleware, and finally the route handler. If a middleware does not call `next()`, the chain stops.

**126. How do you handle routing in Express.js?**  

```js
// Simple route
app.get('/users', (req, res) => {
  res.send('User list');
});

// Route with multiple methods
app.route('/product')
   .get((req, res) => res.send('Get product'))
   .post((req, res) => res.send('Create product'));
```

You can also use an `express.Router()` instance to modularize routes.

**127. How do you handle route parameters in Express.js?**  

```js
app.get('/users/:id', (req, res) => {
  const userId = req.params.id; // e.g., /users/42 -> '42'
  res.send(`User ID: ${userId}`);
});
```

Multiple parameters can be defined (`/posts/:postId/comments/:commentId`).

**128. How do you handle query parameters in Express.js?**  

```js
app.get('/search', (req, res) => {
  const term = req.query.q; // URL: /search?q=node
  const page = req.query.page || 1;
  res.send(`Search term: ${term}, page: ${page}`);
});
```

`req.query` is an object containing parsed query‑string values.

**129. How do you serve static files in Express.js?**  

```js
app.use(express.static('public')); // serves files from ./public
// Example: http://localhost:3000/images/logo.png
```

You can specify a virtual prefix:

```js
app.use('/static', express.static('public'));
```

**130. How do you handle errors in Express.js?**  
Define an error‑handling middleware with four arguments (`err, req, res, next`):

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

Place this after all other routes/middleware. You can also use `next(err)` to forward errors.

## NPM and Package Management

**131. What is NPM in Node.js?**  
NPM (Node Package Manager) is the default package manager for Node.js. It hosts a public registry of reusable packages, handles dependency installation, versioning, and script execution.

**132. How do you initialize a Node.js project?**  

```bash
npm init          # interactive prompts
npm init -y       # accept defaults and create package.json automatically
```

This creates a `package.json` file that describes the project and its dependencies.

**133. What is package.json in Node.js?**  
`package.json` is a manifest file that contains metadata (name, version, description), scripts, dependencies, devDependencies, engine requirements, and more. It is used by npm to install and manage packages.

**134. What is package-lock.json in Node.js?**  
`package-lock.json` records the exact version tree of installed packages, ensuring deterministic installs across environments. It locks dependencies (including transitive ones) to specific versions.

**135. How do you install packages in Node.js?**  

```bash
npm install express          # installs and adds to dependencies
npm install --save-dev jest  # installs as a devDependency
npm i                       # installs all dependencies listed in package.json
```

**136. What is the difference between dependencies and devDependencies?**  
- **dependencies**: Packages required at runtime (e.g., Express, Mongoose).  
- **devDependencies**: Packages needed only during development or testing (e.g., ESLint, Mocha). They are not installed when `npm install --production` is used.

**137. How do you update packages in Node.js?**  

```bash
npm outdated                # shows packages with newer versions
npm update                  # updates packages respecting semver ranges
npm install package@latest   # install a specific newer version
```

For major version bumps, manually adjust the version in `package.json` and reinstall.

**138. How do you uninstall packages in Node.js?**  

```bash
npm uninstall express       # removes from node_modules and package.json
npm uninstall --save-dev jest
```

**139. What are semantic versions in NPM?**  
Semantic Versioning (semver) follows `MAJOR.MINOR.PATCH`:

- **MAJOR** version when you make incompatible API changes.  
- **MINOR** version when you add functionality in a backward‑compatible manner.  
- **PATCH** version when you make backward‑compatible bug fixes.

Version ranges (`^1.2.3`, `~1.2.3`, `>=1.0.0 <2.0.0`) let npm resolve compatible versions.

**140. How do you publish packages to NPM?**  

1. Ensure you have an npm account (`npm login`).  
2. Set a unique name and version in `package.json`.  
3. Run `npm publish` from the project root.  
4. For scoped packages, use `npm publish --access public` (or `restricted` for private).  

To unpublish a version, use `npm unpublish <package>@<version>` (subject to npm’s unpublish policy).


## Event Emitter

**141. What is `EventEmitter` in Node.js?**  
`EventEmitter` is a class from the built‑in `events` module that provides a publish/subscribe pattern. Objects that inherit from it can emit named events and allow listeners to react to those events.

**142. How do you create custom event emitters?**  
Extend `EventEmitter` or instantiate it directly:

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter(); // or new EventEmitter()
```

**143. How do you emit events in Node.js?**  
Call the `.emit(eventName, ...args)` method on an emitter instance:

```js
myEmitter.emit('data', { id: 1, value: 'test' });
```

**144. How do you listen to events in Node.js?**  
Use `.on(eventName, listener)` for persistent listeners or `.once(eventName, listener)` for a single‑shot listener:

```js
myEmitter.on('data', payload => console.log(payload));
```

**145. How do you remove event listeners in Node.js?**  
- Remove a specific listener: `myEmitter.removeListener('event', listener)` or its alias `off`.
- Remove all listeners for an event: `myEmitter.removeAllListeners('event')`.

**146. What is the `once()` method in `EventEmitter`?**  
`once(event, listener)` registers a listener that is automatically removed after it is invoked the first time.

**147. How do you handle errors with `EventEmitter`?**  
Emit an `'error'` event when something goes wrong. If no `'error'` listener is attached, Node will throw the error and crash the process, so always add an error handler:

```js
myEmitter.on('error', err => console.error('Error:', err));
myEmitter.emit('error', new Error('Something bad'));
```

**148. What are the best practices for using `EventEmitter`?**  
- Always handle `'error'` events.  
- Keep the number of distinct event names reasonable to avoid confusion.  
- Document the event contract (payload shape).  
- Use `once` for one‑time events (e.g., initialization).  
- Avoid memory leaks: remove listeners when they are no longer needed.

**149. How do you debug `EventEmitter` issues?**  
- Use `emitter.listenerCount('event')` to check how many listeners are attached.  
- Log `emitter.eventNames()` to see all registered events.  
- Enable the `--trace-event` flag or use `node --inspect` and set breakpoints on `.emit`.  
- For large applications, consider libraries like `eventemitter3` that provide better diagnostics.

**150. What is the difference between `EventEmitter` and callbacks?**  
- **Callbacks** are usually one‑off, passed directly to a function.  
- **EventEmitter** allows multiple independent listeners, can emit events multiple times, and decouples the emitter from the consumers. It is ideal for long‑lived objects that need to broadcast many events over time.

## Child Process

**151. What are child processes in Node.js?**  
Child processes are separate OS processes spawned by a Node.js script. They run concurrently, have their own memory space, and can execute other programs or separate Node scripts.

**152. What are the different ways to create child processes?**  
- `spawn(command, args, options)` – streams I/O, suitable for long‑running processes.  
- `exec(command, options, callback)` – buffers the whole output, good for short commands.  
- `execFile(file, args, options, callback)` – like `exec` but runs a file directly without a shell.  
- `fork(modulePath, args, options)` – spawns a new Node.js instance with IPC channel (used for clustering).

**153. What is the `spawn()` method in `child_process`?**  
`spawn` launches a new process with given command and arguments, returning a `ChildProcess` object whose `stdout`, `stderr`, and `stdin` are streams.

```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);
ls.stdout.on('data', data => console.log(`OUT: ${data}`));
```

**154. What is the `exec()` method in `child_process`?**  
`exec` runs a command in a shell, buffers the entire output, and invokes a callback with `(error, stdout, stderr)` when the process ends.

```js
const { exec } = require('child_process');
exec('pwd', (err, out) => {
  if (err) return console.error(err);
  console.log('Current dir:', out.trim());
});
```

**155. What is the `execFile()` method in `child_process`?**  
`execFile` executes a file directly (no shell), which is safer and faster for running scripts or binaries with arguments.

```js
execFile('node', ['script.js'], (err, out) => {
  if (err) console.error(err);
  else console.log(out);
});
```

**156. What is the `fork()` method in `child_process`?**  
`fork` spawns a new Node.js process running a specified module and sets up an IPC channel (`process.send` / `process.on('message')`) for communication.

```js
const { fork } = require('child_process');
const child = fork('worker.js');
child.send({ cmd: 'start' });
child.on('message', msg => console.log('From child:', msg));
```

**157. How do you communicate with child processes?**  
- For `spawn`/`exec`/`execFile`: use the standard streams (`stdin`, `stdout`, `stderr`).  
- For `fork`: use the built‑in IPC channel with `child.send()` and `process.on('message')`.  
- You can also use `child.stdout.pipe(...)` to pipe data between processes.

**158. How do you handle child process errors?**  
Listen to the `'error'` event on the `ChildProcess` object and check the `code`/`signal` in the `'exit'` event:

```js
child.on('error', err => console.error('Spawn error:', err));
child.on('exit', (code, signal) => {
  if (code !== 0) console.error(`Exited with code ${code}`);
});
```

**159. How do you kill child processes?**  
Call `child.kill([signal])`. The default signal is `'SIGTERM'`. You can also send other signals like `'SIGKILL'`.

```js
child.kill('SIGINT');
```

**160. What are the use cases for child processes?**  
- Running CPU‑intensive tasks without blocking the event loop.  
- Executing external commands (e.g., Git, FFmpeg).  
- Isolating potentially unsafe code.  
- Implementing worker pools for parallelism.  
- Using `fork` for multi‑process Node.js applications (e.g., clustering).

## Cluster Module

**161. What is the `cluster` module in Node.js?**  
The `cluster` module enables creation of a pool of Node.js worker processes that share the same server port, allowing multi‑core scaling.

**162. How do you create a cluster in Node.js?**  

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Optionally restart
    cluster.fork();
  });
} else {
  // Workers share the same TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Handled by worker ${process.pid}`);
  }).listen(3000);
}
```

**163. What is the difference between master and worker processes?**  
- **Master**: Runs the clustering logic, forks workers, monitors them, and can manage IPC. It does not handle HTTP requests directly.  
- **Worker**: Executes the application code (e.g., HTTP server) and handles incoming requests. Each worker is a separate Node.js process.

**164. How do you handle load balancing with `cluster`?**  
Node’s internal round‑robin load balancer distributes incoming connections across workers. On Windows, the OS performs the balancing. You can also implement custom strategies via the `cluster` IPC channel.

**165. How do you communicate between master and worker processes?**  
Use the built‑in IPC channel:

```js
// Master
worker.send({ cmd: 'status' });
worker.on('message', msg => console.log('From worker:', msg));

// Worker
process.on('message', msg => {
  if (msg.cmd === 'status') process.send({ pid: process.pid, status: 'ok' });
});
```

**166. How do you handle worker process crashes?**  
Listen to the `'exit'` event on the `cluster` object and optionally restart the worker:

```js
cluster.on('exit', (worker, code, signal) => {
  console.warn(`Worker ${worker.id} died`);
  cluster.fork(); // restart
});
```

**167. How do you restart worker processes?**  
Gracefully disconnect a worker with `worker.disconnect()` (stops accepting new connections) and then kill it after existing connections close. You can also send a custom message to trigger a restart.

```js
for (const id in cluster.workers) {
  cluster.workers[id].send({ cmd: 'shutdown' });
}
```

**168. What are the benefits of using the `cluster` module?**  
- Utilizes multiple CPU cores, improving throughput.  
- Provides fault isolation: a crashed worker does not bring down the whole app.  
- Enables zero‑downtime restarts by rolling replacement of workers.  
- Simple API compared to external process managers.

**169. How do you scale Node.js applications with `cluster`?**  
- Spawn a worker per CPU core (or more for I/O‑bound workloads).  
- Use a load balancer (e.g., Nginx) in front of multiple Node.js instances for horizontal scaling across machines.  
- Combine `cluster` with PM2 or Docker for process management and orchestration.

**170. What are the limitations of the `cluster` module?**  
- Workers do not share memory; sharing state requires IPC or external stores (Redis, databases).  
- Not suitable for CPU‑bound tasks that need fine‑grained parallelism (worker threads may be better).  
- On Windows, the built‑in load balancer is less efficient than the round‑robin used on Unix.  
- Managing many workers can become complex; dedicated process managers may be preferable.


## Worker Threads

**171. What are worker threads in Node.js?**  
Worker threads are a built‑in module (`worker_threads`) that allows JavaScript code to run in parallel on multiple threads within a single Node.js process. Each worker has its own V8 instance, event loop, and memory heap, but they can share memory via `SharedArrayBuffer` and `MessageChannel`.

**172. How do worker threads differ from child processes?**  
- **Isolation:** Child processes run in separate OS processes with independent memory; worker threads share the same process memory space.  
- **Communication:** Child processes communicate via IPC (stdin/stdout, `process.send`), while worker threads use `postMessage`/`on('message')` and can share memory directly.  
- **Overhead:** Worker threads have lower startup overhead and faster data exchange compared to spawning a new process.  
- **Use case:** Worker threads are ideal for CPU‑bound JavaScript tasks; child processes are better for running external binaries or isolating unsafe code.

**173. How do you create worker threads in Node.js?**  

```js
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', {
  workerData: { foo: 'bar' } // optional data passed to the worker
});
```

**174. How do you communicate between main thread and worker threads?**  

```js
// Main thread
worker.on('message', msg => console.log('From worker:', msg));
worker.postMessage({ cmd: 'start' });

// worker.js
const { parentPort, workerData } = require('worker_threads');
parentPort.on('message', data => {
  // handle command
  parentPort.postMessage({ result: 'done' });
});
```

**175. How do you share data between worker threads?**  
Use `SharedArrayBuffer` (raw binary buffer) together with typed arrays, or `MessageChannel` for structured cloning. Example:

```js
const shared = new SharedArrayBuffer(4);
const view = new Uint32Array(shared);
view[0] = 42; // visible to all workers
```

**176. What is `SharedArrayBuffer` in worker threads?**  
`SharedArrayBuffer` is a fixed‑size binary buffer that can be accessed concurrently by multiple threads. It enables lock‑free communication and atomic operations via the `Atomics` API.

**177. How do you handle worker thread errors?**  

```js
worker.on('error', err => {
  console.error('Worker error:', err);
});
worker.on('exit', code => {
  if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
});
```

**178. How do you terminate worker threads?**  

```js
worker.terminate().then(() => console.log('Worker terminated'));
```

**179. What are the use cases for worker threads?**  
- CPU‑intensive calculations (e.g., image processing, encryption, data parsing).  
- Parallelizing heavy JavaScript algorithms.  
- Offloading work from the main event loop to keep the server responsive.

**180. How do worker threads improve performance?**  
By moving CPU‑bound tasks to separate threads, the main event loop remains non‑blocking, allowing I/O to continue while heavy computation runs in parallel, effectively utilizing multi‑core CPUs.

## Performance and Optimization

**181. How do you profile Node.js applications?**  
- Use the built‑in `--inspect` flag with Chrome DevTools (`node --inspect app.js`).  
- `node --prof` generates V8 profiling data (`node --prof app.js`).  
- `clinic` suite (`clinic doctor`, `clinic flame`) for flame graphs.  
- `0x` for generating flamegraphs.  
- `process.hrtime()` or `performance.now()` for custom timing.

**182. What are the common performance bottlenecks in Node.js?**  
- Synchronous/blocking code (CPU‑heavy loops, heavy JSON parsing).  
- Excessive I/O latency (slow DB queries, network calls).  
- Memory leaks causing GC pressure.  
- Unoptimized event loop (too many timers, large callback queues).  
- Inefficient algorithms or data structures.

**183. How do you optimize CPU‑intensive operations in Node.js?**  
- Offload to worker threads or child processes.  
- Use native addons (C/C++) for critical sections.  
- Leverage streaming APIs to process data chunk‑by‑chunk.  
- Optimize algorithms, avoid unnecessary allocations.  
- Use `setImmediate`/`process.nextTick` to break long loops.

**184. How do you optimize memory usage in Node.js?**  
- Release references when objects are no longer needed.  
- Use streams instead of loading whole files into memory.  
- Prefer Buffers over strings for binary data.  
- Limit the size of caches and use LRU eviction.  
- Monitor heap size (`process.memoryUsage()`) and tune `--max-old-space-size`.

**185. What is the cluster module for performance?**  
The `cluster` module creates multiple Node.js worker processes that share the same server port, allowing the application to utilize all CPU cores and handle more concurrent connections.

**186. How do you use worker threads for performance?**  
Create a pool of workers (e.g., using `workerpool` or a custom pool) and dispatch CPU‑bound tasks to idle workers, reusing them to avoid the cost of repeatedly spawning new threads.

**187. What are the best practices for Node.js performance?**  
- Keep the event loop non‑blocking.  
- Profile regularly and address hotspots.  
- Use async I/O and streams.  
- Cache results where appropriate.  
- Limit synchronous code and large JSON parsing.  
- Monitor and tune GC (e.g., `--max-old-space-size`).  
- Deploy behind a reverse proxy (NGINX) for TLS termination and static asset caching.

**188. How do you monitor Node.js application performance?**  
- Use APM tools (New Relic, Datadog, Elastic APM).  
- Export metrics with `prom-client` and scrape via Prometheus.  
- Log response times and error rates.  
- Monitor event loop lag (`perf_hooks.monitorEventLoopDelay`).  
- Track process metrics (`process.cpuUsage()`, `process.memoryUsage()`).

**189. What are the tools for Node.js performance analysis?**  
- Chrome DevTools (`--inspect`).  
- `clinic` (doctor, flame, bubbleprof).  
- `0x` flamegraph generator.  
- `node --prof` + `node --prof-process`.  
- `pm2` monitoring dashboard.  
- `nsolid` (NodeSource) for deep profiling.

**190. How do you handle memory leaks in Node.js?**  
- Identify leaks with heap snapshots (`node --inspect` → Memory tab).  
- Use `clinic heap` or `memwatch-next`.  
- Look for global variables, event listeners not removed, timers not cleared, and closures retaining large objects.  
- Fix by removing references, clearing caches, and ensuring proper cleanup in `close`/`exit` handlers.

## Memory Management

**191. How does Node.js manage memory?**  
Node.js relies on the V8 engine’s garbage collector. Memory is allocated on the heap for objects and on the stack for primitives. V8 performs incremental and generational garbage collection to reclaim unreachable objects.

**192. What is the V8 garbage collector?**  
V8 uses a generational GC with two main spaces: **Young (New) Space** for short‑lived objects and **Old (Old) Space** for long‑lived objects. It employs **Scavenger** (minor GC) for the young space and **Mark‑Sweep/Mark‑Compact** (major GC) for the old space.

**193. What are the different generations in V8 garbage collection?**  
- **New Generation (Young Space):** Small, fast‑collecting, holds newly allocated objects.  
- **Old Generation (Old Space):** Larger, collected less frequently, holds objects that survived several minor GCs.  
- **Large Object Space:** Stores objects > 256 KB, collected separately.

**194. How do you detect memory leaks in Node.js?**  
- Take heap snapshots and compare over time.  
- Monitor `process.memoryUsage().heapUsed` for steady growth.  
- Use `node --inspect` → Memory tab, or tools like `clinic heap`, `memwatch-next`.  
- Look for increasing event‑listener counts (`process._getActiveHandles()`).

**195. What are the common causes of memory leaks in Node.js?**  
- Unremoved event listeners.  
- Timers/intervals that are never cleared.  
- Global variables or closures retaining large objects.  
- Caches that grow without eviction.  
- Improper use of `require` caching for large modules.

**196. How do you fix memory leaks in Node.js?**  
- Remove listeners with `emitter.removeListener`/`off`.  
- Clear intervals/timeouts when no longer needed.  
- Implement cache eviction (LRU, TTL).  
- Avoid storing large objects in long‑lived scopes.  
- Use `WeakMap`/`WeakSet` for temporary associations.

**197. What is a heap snapshot in Node.js?**  
A heap snapshot is a point‑in‑time capture of the V8 heap, showing all objects, their sizes, and reference relationships. It is used to analyze memory usage and locate leaks.

**198. How do you analyze heap snapshots?**  
- Open the snapshot in Chrome DevTools (Memory tab) or VS Code’s debugger.  
- Look for detached DOM trees, large retained sizes, and objects that should have been garbage‑collected.  
- Compare multiple snapshots to see growth patterns.  
- Use the “Containment” view to trace reference chains.

**199. What are the best practices for memory management?**  
- Keep object lifetimes short; release references promptly.  
- Use streams for large data.  
- Limit the size of in‑memory caches.  
- Prefer immutable data structures when possible.  
- Monitor GC pauses (`--trace-gc`).  
- Set appropriate `--max-old-space-size` for production workloads.

**200. How do you optimize memory usage in Node.js?**  
- Tune V8 flags (`--max-old-space-size`, `--initial-old-space-size`).  
- Use `Buffer.allocUnsafe` only when you will overwrite the buffer immediately.  
- Serialize data efficiently (e.g., protobuf, msgpack).  
- Avoid unnecessary JSON.stringify/parse cycles.  
- Profile and refactor memory‑heavy code paths.



## Security

**201. What are the common security vulnerabilities in Node.js?**  
- **SQL Injection** – unsanitized input used in database queries.  
- **Cross‑Site Scripting (XSS)** – injecting malicious scripts into web pages.  
- **Cross‑Site Request Forgery (CSRF)** – unauthorized actions performed on behalf of an authenticated user.  
- **Insecure Deserialization** – unsafe handling of serialized data.  
- **Prototype Pollution** – modifying object prototypes to affect all objects.  
- **Directory Traversal** – accessing files outside the intended directory.  
- **Sensitive Data Exposure** – leaking secrets, passwords, or tokens.  
- **Denial‑of‑Service (DoS)** – resource exhaustion via unbounded requests or heavy computation.

**202. How do you prevent SQL injection in Node.js?**  
- Use parameterized queries / prepared statements (e.g., `pg` with `$1`, `mysql2` with `?`).  
- Prefer ORM/Query Builder libraries that handle escaping (e.g., Sequelize, Knex).  
- Validate and whitelist input values.  
- Never concatenate raw user input into SQL strings.

**203. How do you prevent XSS attacks in Node.js?**  
- Encode output before inserting into HTML (e.g., `escape-html`, `he`).  
- Use templating engines that auto‑escape (e.g., Pug, EJS with `<%= %>`).  
- Set `Content‑Security‑Policy` headers.  
- Sanitize user‑generated HTML with libraries like `DOMPurify` (server‑side) or `sanitize-html`.

**204. How do you prevent CSRF attacks in Node.js?**  
- Use anti‑CSRF tokens (e.g., `csurf` middleware for Express).  
- Require same‑site cookies (`SameSite=Lax` or `Strict`).  
- Verify `Origin` and `Referer` headers for state‑changing requests.  
- For APIs, prefer stateless authentication (JWT) and require custom headers (`X‑Requested‑With`).

**205. What is Helmet in Node.js security?**  
Helmet is an Express middleware collection that sets various HTTP headers to improve security, such as `Content‑Security‑Policy`, `X‑Frame‑Options`, `X‑Content‑Type‑Options`, `Strict‑Transport‑Security`, and more.

**206. How do you handle authentication in Node.js?**  
- **Session‑based**: Use `express-session` with a store (Redis, Mongo).  
- **Token‑based**: Issue JWTs (`jsonwebtoken`) after verifying credentials.  
- **OAuth / OpenID Connect**: Use libraries like `passport`, `grant`, or `openid-client`.  
- Always hash passwords with a strong algorithm (`bcrypt`, `argon2`) and use TLS for transport.

**207. How do you handle authorization in Node.js?**  
- Role‑based Access Control (RBAC): Assign roles/permissions and check them in route middleware.  
- Attribute‑based Access Control (ABAC): Evaluate policies based on user attributes and resource attributes.  
- Use libraries like `casl`, `accesscontrol`, or custom middleware that inspects `req.user`.

**208. What is JWT in Node.js?**  
JSON Web Token (JWT) is a compact, URL‑safe token format that contains a header, payload (claims), and signature. It is used for stateless authentication; the server signs the token and the client presents it on subsequent requests.

**209. How do you implement JWT authentication?**  
1. **Login**: Verify credentials, then `jwt.sign(payload, secret, { expiresIn })`.  
2. **Send**: Return the token (usually in an `Authorization: Bearer <token>` header).  
3. **Protect routes**: Middleware extracts the token, verifies it with `jwt.verify`, and attaches the decoded payload to `req.user`.  
4. **Refresh**: Optionally implement refresh tokens to rotate access tokens.

**210. What are the best practices for Node.js security?**  
- Keep dependencies up‑to‑date; use `npm audit` and `npm audit fix`.  
- Run Node with least privileges; avoid running as root.  
- Enable `helmet` and other security headers.  
- Validate and sanitize all external input.  
- Use HTTPS everywhere (TLS termination).  
- Store secrets outside source code (environment variables, secret managers).  
- Limit request size (`body-parser` limits) and rate‑limit endpoints.  
- Implement proper error handling without leaking stack traces.  
- Use `process.env.NODE_ENV === 'production'` to disable debug features.

## Testing

**211. What are the different types of testing in Node.js?**  
- **Unit Testing** – testing individual functions/modules in isolation.  
- **Integration Testing** – testing interactions between multiple components (e.g., DB + API).  
- **End‑to‑End (E2E) Testing** – testing the whole application from the user’s perspective (browser or API).  
- **Functional / Acceptance Testing** – verifying business requirements.  
- **Performance / Load Testing** – measuring throughput and latency.

**212. How do you unit test Node.js applications?**  
- Choose a test runner (Mocha, Jest, Ava).  
- Use an assertion library (`chai`, built‑in Jest assertions).  
- Mock dependencies with `sinon`, `jest.mock`, or `proxyquire`.  
- Keep tests fast and deterministic; run them with `npm test`.

**213. How do you integration test Node.js applications?**  
- Spin up real or in‑memory services (e.g., `mongodb-memory-server`, Docker containers).  
- Use the same test runner but avoid heavy mocking; test actual data flow.  
- Clean up state between tests (reset DB, clear caches).  
- Example with Supertest for Express APIs:  

```js
const request = require('supertest');
const app = require('../app');

describe('API integration', () => {
  it('GET /users returns list', async () => {
    const res = await request(app).get('/users').expect(200);
    expect(res.body).to.be.an('array');
  });
});
```

**214. How do you end‑to‑end test Node.js applications?**  
- Use tools that drive the UI or API: **Cypress**, **Playwright**, **Puppeteer**, or **TestCafe** for browser‑based apps.  
- For pure APIs, use **Postman/Newman** or **Dredd**.  
- Run tests against a deployed environment or a Docker compose stack that mimics production.

**215. What are the popular testing frameworks for Node.js?**  
- **Jest** – all‑in‑one runner, assertions, mocking, snapshot testing.  
- **Mocha** – flexible test runner; often paired with Chai and Sinon.  
- **Ava** – minimalistic, runs tests concurrently.  
- **Jasmine** – built‑in assertions and spies.  
- **Tap** / **Tape** – simple TAP output.

**216. How do you use Mocha for testing Node.js?**  
1. Install: `npm install --save-dev mocha chai`.  
2. Add script: `"test": "mocha \"test/**/*.spec.js\""` in `package.json`.  
3. Write tests:  

```js
const { expect } = require('chai');
const sum = require('../src/sum');

describe('sum()', () => {
  it('adds two numbers', () => {
    expect(sum(2, 3)).to.equal(5);
  });
});
```

4. Run `npm test`.

**217. How do you use Jest for testing Node.js?**  
1. Install: `npm install --save-dev jest`.  
2. Add script: `"test": "jest"` in `package.json`.  
3. Write tests in `__tests__` or `*.test.js` files:  

```js
const sum = require('../src/sum');

test('adds 2 + 3 = 5', () => {
  expect(sum(2, 3)).toBe(5);
});
```

4. Run `npm test`. Jest provides built‑in mocking (`jest.mock`) and coverage.

**218. How do you mock dependencies in Node.js tests?**  
- **Jest**: `jest.mock('moduleName')` or manual mock files in `__mocks__/`.  
- **Sinon**: `sinon.stub(obj, 'method').returns(value)`.  
- **proxyquire**: replace required modules at load time.  
- Use **test doubles** (stubs, fakes) to isolate the unit under test.

**219. How do you test asynchronous code in Node.js?**  
- Return a Promise from the test and `await` it (Jest/Mocha).  
- Use `done` callback in Mocha: `it('...', done => { asyncFn().then(() => done()); });`.  
- For callbacks, wrap with `util.promisify` or use `async/await`.  
- Ensure timers are handled (`jest.useFakeTimers()` or `sinon.useFakeTimers()`).

**220. What are the best practices for testing Node.js applications?**  
- Keep tests isolated; mock external services.  
- Aim for high coverage but focus on critical paths.  
- Use a separate test configuration (different DB, env vars).  
- Run tests in CI on every push.  
- Keep test data deterministic; seed fixtures.  
- Write descriptive test names.  
- Clean up resources (`afterEach`, `afterAll`).  
- Prefer fast unit tests; run slower integration/E2E tests less frequently.

## Debugging

**221. How do you debug Node.js applications?**  
- Use the built‑in debugger (`node inspect` or `node --inspect`).  
- Attach Chrome DevTools or VS Code debugger.  
- Insert `debugger;` statements in code.  
- Log strategically with `console.debug` or a logger (winston, pino).

**222. What are the different debugging techniques in Node.js?**  
- **Interactive debugging** with Chrome DevTools / VS Code.  
- **Logging** (structured logs, log levels).  
- **Core dumps** (`node --abort-on-uncaught-exception`).  
- **Profiling** (`--inspect`, `clinic`, `0x`).  
- **Tracing** (`node --trace-warnings`, `--trace-gc`).  
- **Remote debugging** via `--inspect-brk=0.0.0.0:9229`.

**223. How do you use Node.js debugger?**  
```bash
node inspect index.js          # starts CLI debugger
node --inspect-brk index.js   # pauses at first line, connect via Chrome
```
In the CLI you can use commands like `n` (next), `c` (continue), `repl` (evaluate expressions), `watch('var')`.

**224. How do you use Chrome DevTools for Node.js debugging?**  
1. Start Node with `--inspect` or `--inspect-brk`.  
2. Open `chrome://inspect` in Chrome.  
3. Click “Open dedicated DevTools for Node”.  
4. Set breakpoints, step through code, inspect variables, view call stack.

**225. How do you use VS Code for Node.js debugging?**  
- Create a launch configuration in `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch Program",
  "program": "${workspaceFolder}/index.js",
  "runtimeArgs": ["--inspect-brk"]
}
```

- Press F5 to start debugging; use the UI to set breakpoints, watch variables, and view the call stack.

**226. How do you debug asynchronous code in Node.js?**  
- Use async‑aware breakpoints (VS Code/Chrome will pause inside `async` functions).  
- Enable “Async Call Stacks” in Chrome DevTools to see the logical stack across `await`.  
- Log promise rejections (`process.on('unhandledRejection')`).  
- Use `node --trace-async-hooks` for low‑level async tracing.

**227. How do you debug memory leaks in Node.js?**  
- Take heap snapshots (`node --inspect` → Memory tab).  
- Use `clinic heap` or `memwatch-next` to monitor heap growth.  
- Look for growing `process.memoryUsage().heapUsed`.  
- Identify retained objects via the “Containment” view in Chrome DevTools.  
- Fix by removing references, clearing caches, and ensuring listeners are removed.

**228. How do you debug performance issues in Node.js?**  
- Profile with `--inspect` and the “Performance” tab.  
- Use `clinic doctor` or `0x` to generate flame graphs.  
- Measure event‑loop lag (`perf_hooks.monitorEventLoopDelay`).  
- Identify hot functions and optimize them (e.g., move to worker threads).  
- Check GC pauses (`--trace-gc`).

**229. What are the common debugging tools for Node.js?**  
- Built‑in `node inspect` / `--inspect`.  
- Chrome DevTools.  
- VS Code debugger.  
- **ndb** – improved Chrome DevTools experience.  
- **node‑inspect** (npm package).  
- **clinic** suite (doctor, flame, bubbleprof).  
- **0x**, **lighthouse**, **pm2 logs**.

**230. What are the best practices for debugging Node.js applications?**  
- Reproduce the issue locally with minimal code.  
- Add meaningful logs with correlation IDs.  
- Use structured logging (JSON) for easier searching.  
- Enable source maps for transpiled code (TypeScript, Babel).  
- Keep debugging sessions short; automate detection with monitoring/alerts.  
- Clean up breakpoints before committing code.  
- Document known issues and their resolutions.


## Database Connectivity

**241. How do you connect Node.js to MongoDB?**  
Use the official MongoDB driver or an ODM like Mongoose.

```js
// Using the native driver
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  await client.connect();
  const db = client.db('myDatabase');
  return db;
}
```

**242. How do you connect Node.js to MySQL?**  
Use `mysql2` (supports promises) or `sequelize` as an ORM.

```js
const mysql = require('mysql2/promise');

async function connect() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'mydb'
  });
  return connection;
}
```

**243. How do you connect Node.js to PostgreSQL?**  
Use `pg` (node‑postgres) or an ORM such as `sequelize`/`typeorm`.

```js
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'secret',
  database: 'mydb',
  port: 5432
});

async function query(sql, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(sql, params);
    return res.rows;
  } finally {
    client.release();
  }
}
```

**244. How do you connect Node.js to Redis?**  
Use `ioredis` or `redis` (v4+).

```js
const Redis = require('ioredis');
const redis = new Redis(); // defaults to 127.0.0.1:6379

await redis.set('key', 'value');
const val = await redis.get('key');
```

**245. What are ORMs in Node.js?**  
Object‑Relational Mappers map database tables to JavaScript classes, providing a higher‑level API for CRUD operations, migrations, and relationships. Popular Node.js ORMs include **Sequelize**, **TypeORM**, **Objection.js**, and **Prisma**.

**246. How do you use Mongoose with Node.js?**  
Mongoose is an ODM for MongoDB.

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Example CRUD
await User.create({ name: 'Alice', email: 'alice@example.com' });
const users = await User.find();
```

**247. How do you use Sequelize with Node.js?**  

```js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/mydb');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true }
});

await sequelize.sync(); // creates tables
await User.create({ name: 'Bob', email: 'bob@example.com' });
const users = await User.findAll();
```

**248. How do you use TypeORM with Node.js?**  

```ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'secret',
  database: 'mydb',
  entities: [User],
  synchronize: true, // auto‑create tables (disable in prod)
});

await AppDataSource.initialize();

const userRepo = AppDataSource.getRepository(User);
await userRepo.save({ name: 'Carol', email: 'carol@example.com' });
const users = await userRepo.find();
```

**249. How do you handle database connections in Node.js?**  
- **Connection pooling**: Use pool objects (`pg.Pool`, `mysql2.createPool`, `ioredis` built‑in pool).  
- **Graceful shutdown**: Close pools on `process.on('SIGTERM')`.  
- **Error handling**: Listen for `error` events on pools and reconnect if needed.  
- **Reuse connections**: Do not create a new connection per request; acquire from the pool instead.

**250. What are the best practices for database operations in Node.js?**  
- Use parameterized queries / ORM to avoid SQL injection.  
- Keep queries short and indexed; avoid SELECT *.  
- Implement proper transaction handling for multi‑step operations.  
- Limit result set size (pagination).  
- Cache frequently accessed data (Redis, in‑memory).  
- Monitor query performance (slow‑query logs, APM).  
- Close idle connections; set appropriate pool size.  
- Store credentials securely (environment variables, secret manager).  

## REST APIs

**251. What is a REST API in Node.js?**  
A REST (Representational State Transfer) API exposes resources over HTTP using standard verbs (GET, POST, PUT, DELETE, etc.) and stateless interactions. In Node.js it is typically built with Express, Fastify, or Koa.

**252. How do you design REST APIs in Node.js?**  
- Identify resources (e.g., `/users`, `/orders`).  
- Use nouns for endpoints, HTTP verbs for actions.  
- Keep URLs hierarchical and versioned (`/api/v1/users`).  
- Return appropriate status codes and JSON payloads.  
- Document with OpenAPI/Swagger.

**253. What are REST principles in Node.js?**  
1. **Statelessness** – each request contains all information needed.  
2. **Cacheability** – responses must define cache directives.  
3. **Uniform Interface** – use standard HTTP methods and status codes.  
4. **Layered System** – can add load balancers, proxies.  
5. **Client‑Server separation** – UI and data logic are independent.

**254. How do you handle HTTP status codes in Node.js?**  

```js
app.get('/resource/:id', (req, res) => {
  const item = find(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(item);
});
```

Common codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Server Error.

**255. How do you version REST APIs in Node.js?**  
- Include version in the URL: `/api/v1/users`.  
- Use request header `Accept: application/vnd.myapp.v1+json`.  
- Keep old versions stable; deprecate with proper notices.

**256. How do you handle pagination in REST APIs?**  

```js
app.get('/users', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const users = await User.findAll({ limit, offset });
  res.json({ page, limit, data: users });
});
```

Alternatively use cursor‑based pagination (`?cursor=abc`).

**257. How do you handle sorting and filtering in REST APIs?**  

```js
app.get('/products', (req, res) => {
  const { sort = 'name', order = 'asc', category } = req.query;
  const where = category ? { category } : {};
  const products = await Product.findAll({
    where,
    order: [[sort, order.toUpperCase()]]
  });
  res.json(products);
});
```

Validate allowed fields to prevent injection.

**258. How do you validate request data in REST APIs?**  
- Use schema validation libraries: **Joi**, **Yup**, **express-validator**, **zod**.  
- Validate body, query, params before processing.

```js
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

app.post('/register', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  // proceed with value
});
```

**259. How do you document REST APIs in Node.js?**  
- Write an OpenAPI (Swagger) spec (`swagger.yaml` or JSON).  
- Use tools like **swagger-jsdoc** + **swagger-ui-express** to serve interactive docs.  
- Keep docs in sync with code (generate from annotations or use TypeScript decorators).

**260. What are the best practices for REST API design?**  
- Use nouns, not verbs, in URLs.  
- Keep endpoints shallow; avoid deep nesting.  
- Return consistent response format (e.g., `{ data, meta, error }`).  
- Implement proper error handling with standardized error objects.  
- Enforce rate limiting and authentication.  
- Use HTTPS exclusively.  
- Provide pagination, filtering, and sorting.  
- Version your API from day one.  

## GraphQL

**261. What is GraphQL in Node.js?**  
GraphQL is a query language and runtime for APIs that lets clients request exactly the data they need. In Node.js it is typically implemented with **Apollo Server**, **express-graphql**, or **Mercurius**.

**262. How do you set up GraphQL with Node.js?**  

```js
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

async function start() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  app.listen(4000, () => console.log('🚀 Server ready at http://localhost:4000/graphql'));
}
start();
```

**263. What is the difference between REST and GraphQL?**  
- **Data fetching**: REST returns fixed resources; GraphQL lets the client specify fields.  
- **Over‑fetching/under‑fetching**: GraphQL eliminates both.  
- **Versioning**: GraphQL evolves via schema changes; REST often needs versioned endpoints.  
- **Caching**: REST benefits from HTTP caching; GraphQL requires custom caching strategies.  
- **Complexity**: GraphQL adds a schema layer and requires resolvers; REST is simpler to implement.

**264. How do you define GraphQL schemas?**  
Using SDL (Schema Definition Language) or programmatically.

```js
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;
```

**265. How do you create GraphQL resolvers?**  

```js
const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id)
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      const user = new User({ name, email });
      return await user.save();
    }
  }
};
```

Resolvers map each field to a function that fetches the required data.

**266. How do you handle GraphQL mutations?**  
Define them in the schema (`type Mutation`) and implement resolver functions that perform create, update, or delete operations, then return the affected object or a status payload.

**267. How do you handle GraphQL subscriptions?**  
Use WebSocket transport (e.g., `graphql-ws` or `subscriptions-transport-ws`). Apollo Server supports subscriptions:

```js
const { ApolloServer } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
  }

  type Subscription {
    messageAdded: Message!
  }

  type Mutation {
    addMessage(content: String!): Message!
  }
`;

const resolvers = {
  Mutation: {
    addMessage: (_, { content }) => {
      const msg = { id: Date.now().toString(), content };
      pubsub.publish('MESSAGE_ADDED', { messageAdded: msg });
      return msg;
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_ADDED')
    }
  }
};
```

**268. How do you authenticate GraphQL APIs?**  
- Verify a token (e.g., JWT) in the request headers before creating the Apollo Server context.  
- Attach the user object to the context so resolvers can check permissions.

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    const user = token ? verifyJwt(token) : null;
    return { user };
  }
});
```

**269. How do you handle GraphQL errors?**  
- Throw `ApolloError` or custom error classes with a `code` property.  
- Use `formatError` to mask internal details.  
- Return partial data with `errors` array as per GraphQL spec.

**270. What are the best practices for GraphQL in Node.js?**  
- Keep the schema small and modular; use schema stitching or federation for large services.  
- Implement input validation (e.g., **Joi**, **zod**) in resolvers or via custom directives.  
- Use DataLoader to batch and cache database calls, preventing N+1 queries.  
- Set depth and complexity limits to protect against overly expensive queries.  
- Enable persisted queries for security and performance.  
- Document the schema with GraphQL Playground or GraphiQL.  
- Use proper authentication/authorization in the context layer.  
- Monitor performance (resolver timings) and error rates.



## WebSockets

**271. What are WebSockets in Node.js?**  
WebSockets provide a full‑duplex, persistent communication channel over a single TCP connection. In Node.js they enable real‑time, bidirectional data exchange between client and server without the overhead of repeated HTTP requests.

**272. How do you implement WebSockets in Node.js?**  
Use the `ws` library (or the built‑in `http` server with `WebSocketServer`):

```js
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', msg => console.log('received:', msg));
  ws.send('welcome');
});

server.listen(8080);
```

**273. What is Socket.io in Node.js?**  
Socket.io is a higher‑level library that abstracts WebSocket details and provides fallbacks (long‑polling) for browsers that don’t support native WebSockets. It adds features like rooms, namespaces, and automatic reconnection.

**274. How do you handle WebSocket connections?**  
- **Accept** connections in the `connection` event.  
- **Maintain** a map of active sockets (e.g., `const clients = new Set();`).  
- **Close** sockets on `close` event and clean up resources.  
- **Validate** the handshake (origin, auth token) before accepting.

**275. How do you broadcast messages with WebSockets?**  

```js
wss.clients.forEach(client => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({ type: 'update', payload: data }));
  }
});
```

With Socket.io:

```js
io.emit('update', data); // broadcast to all connected sockets
```

**276. How do you handle WebSocket authentication?**  
- **Token in query string**: Verify JWT during the `connection` event.

```js
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});
```

- **Cookie/session**: Parse cookies from the handshake headers.

**277. How do you handle WebSocket errors?**  
Listen for the `error` event on each socket and on the server:

```js
ws.on('error', err => console.error('Socket error:', err));
wss.on('error', err => console.error('Server error:', err));
```

Implement reconnection logic on the client side and optionally send error codes to the client.

**278. How do you scale WebSocket applications?**  
- **Horizontal scaling** with a message broker (Redis, NATS) to share events across instances.  
- Use **sticky sessions** (session affinity) so a client always reaches the same server instance (required for in‑memory socket state).  
- Deploy behind a **load balancer** that supports WebSocket upgrades (NGINX, HAProxy).  
- Consider **Socket.io adapter** (`socket.io-redis`) for broadcasting across nodes.

**279. What are the use cases for WebSockets?**  
- Real‑time chat / messaging.  
- Live dashboards / notifications.  
- Multiplayer games.  
- Collaborative editing.  
- Streaming sensor data / IoT telemetry.

**280. What are the best practices for WebSocket implementation?**  
- Validate and authenticate during the handshake.  
- Use a **heartbeat/ping‑pong** to detect dead connections.  
- Limit message size and rate‑limit to prevent abuse.  
- Gracefully handle `close` and clean up resources.  
- Keep payloads small (JSON or binary).  
- Log connection lifecycle events for observability.  
- Use a **message broker** for scaling and decoupling.

## Microservices

**281. What are microservices in Node.js?**  
Microservices are an architectural style where an application is composed of small, independently deployable services, each owning a specific business capability. In Node.js each service runs its own process (or container) and communicates over the network.

**282. How do you design microservices with Node.js?**  
- **Domain‑driven**: Identify bounded contexts and map each to a service.  
- **Single responsibility**: Keep each service focused on one concern.  
- **Statelessness**: Store state in external stores (databases, caches).  
- **API contract**: Define clear request/response schemas (OpenAPI, gRPC).  
- **Independent CI/CD** pipelines for each service.

**283. How do microservices communicate with each other?**  
- **Synchronous HTTP/REST** (Express, Fastify).  
- **gRPC** for binary, contract‑first RPC.  
- **Message brokers** (RabbitMQ, Kafka, NATS) for asynchronous events.  
- **Event sourcing** and **CQRS** patterns for decoupled state changes.

**284. What is service discovery in microservices?**  
Service discovery allows services to locate each other dynamically. Implementations include:

- **Client‑side**: Use a DNS‑based registry (Consul, etcd) and let the client resolve service addresses.  
- **Server‑side**: A load balancer (Envoy, NGINX) queries a registry and routes traffic.

**285. How do you handle inter‑service communication?**  
- **Retry & circuit breaker** (e.g., `opossum` library).  
- **Idempotency keys** for safe retries.  
- **Timeouts** to avoid hanging calls.  
- **Versioning** of APIs to allow gradual rollout.

**286. How do you implement API gateways in Node.js?**  
Use a gateway framework like **Express‑gateway**, **Kong**, **Traefik**, or **Apollo Gateway** for GraphQL. The gateway handles routing, authentication, rate limiting, and aggregation.

```js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/users', createProxyMiddleware({ target: 'http://user-service:3000', changeOrigin: true }));
app.use('/orders', createProxyMiddleware({ target: 'http://order-service:3000', changeOrigin: true }));
```

**287. How do you handle service registry in Node.js?**  
Register each service on startup with a registry (Consul, etcd, Eureka) via its HTTP API. Deregister on shutdown. Use health‑check endpoints (`/health`) so the registry can evict unhealthy instances.

**288. How do you monitor microservices?**  
- **Metrics**: Prometheus client (`prom-client`) + Grafana dashboards.  
- **Tracing**: OpenTelemetry or Jaeger for distributed tracing.  
- **Logging**: Structured JSON logs (Winston, Pino) shipped to ELK/EFK stack.  
- **Health checks**: `/health` endpoint for liveness/readiness.

**289. How do you handle distributed transactions?**  
- Prefer **saga pattern** (choreography or orchestration) to coordinate a series of local transactions with compensating actions.  
- Use **two‑phase commit** only when a strong ACID guarantee is required (rare in microservices).  
- Leverage **outbox pattern** to ensure reliable event publishing.

**290. What are the best practices for microservices in Node.js?**  
- Keep services small and focused.  
- Externalize configuration (12‑factor).  
- Use **containerization** for consistent runtime.  
- Implement **observability** (metrics, logs, traces).  
- Secure inter‑service traffic (mTLS).  
- Automate deployments with CI/CD.  
- Version APIs and maintain backward compatibility.  
- Apply **circuit breakers** and **bulkheads** to increase resilience.

## Docker and Containerization

**291. How do you containerize Node.js applications?**  
Create a `Dockerfile` that installs dependencies, copies source code, and runs the app. Use a lightweight base image (e.g., `node:18-alpine`).

**292. What is Dockerfile for Node.js applications?**  

```dockerfile
# Stage 1 – build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Stage 2 – runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["node", "index.js"]
```

**293. How do you optimize Docker images for Node.js?**  
- Use **multi‑stage builds** to exclude dev dependencies and build tools.  
- Choose **Alpine** or **Slim** base images to reduce size.  
- Leverage **layer caching** by copying `package*.json` first.  
- Run `npm ci --only=production` to install only production deps.  
- Remove unnecessary files (`.git`, docs) with `.dockerignore`.

**294. How do you manage environment variables in Docker?**  
- Pass them at runtime with `docker run -e VAR=value`.  
- Use a `.env` file together with `docker compose` (`env_file`).  
- Keep secrets out of images; use Docker secrets or external secret managers (Vault, AWS Secrets Manager).

**295. How do you handle multi‑stage builds in Docker?**  
As shown in the Dockerfile above: first stage builds the app (installs deps, compiles TypeScript), second stage copies only the built artifacts and runtime dependencies, resulting in a minimal final image.

**296. How do you orchestrate Node.js containers?**  
- **Docker Compose** for local multi‑container setups.  
- **Kubernetes** for production orchestration (Deployments, Services, ConfigMaps, Secrets).  
- Use **Helm charts** to package and version Kubernetes manifests.

**297. What is Docker Compose for Node.js?**  
A YAML file that defines services, networks, and volumes. Example:

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

**298. How do you handle data persistence in containers?**  
- Use **named volumes** or **bind mounts** for databases and stateful services.  
- For production, attach external storage (cloud disks, EBS).  
- Ensure backup strategies (snapshot, dump) are in place.

**299. How do you monitor containerized Node.js applications?**  
- Export Prometheus metrics from the app and scrape them via **cAdvisor** or **Prometheus Operator**.  
- Use **ELK/EFK** stack for logs (Docker logging driver).  
- Leverage **Kubernetes health probes** (`livenessProbe`, `readinessProbe`).  
- Use APM agents (New Relic, Datadog) that run as sidecars or integrate with the app.

**300. What are the best practices for containerizing Node.js applications?**  
- Keep the container **stateless**; externalize state.  
- Use **multi‑stage builds** to minimize image size.  
- Set a **non‑root user** in the final image (`USER node`).  
- Define **healthcheck** in Dockerfile.  
- Pin exact **base image tags** for reproducibility.  
- Limit **resource usage** (`--memory`, `--cpus`).  
- Store **secrets** outside the image (env vars, Docker secrets).  
- Keep **dependency versions** locked (`package-lock.json`).  
- Regularly scan images for vulnerabilities (`docker scan`, Trivy).

