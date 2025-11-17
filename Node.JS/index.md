## What is Node.JS?
Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to execute JavaScript code outside of a web browser.
It's primarily used for building fast, scalable server-side and networking applications.
Key Components and Concepts
    V8 Engine:
        Node.js uses Google's V8 JavaScript engine (the same one used in Chrome) to execute JavaScript code. 
        This engine is written in C++ and compiles JavaScript directly into native machine code, making it very fast.

    Event-Driven Architecture:
        Event-Driven Architecture means your program is focused on reacting to things that happen ("events") rather than waiting for them to finish.
        Start a task, then move on without waiting for them to complete

    Non-Blocking I/O (Input/Output):

    Single-Threaded Event Loop:
        Node.js is often described as single-threaded because the Event Loop—the part that executes your JavaScript code and handles callbacks—runs on a single thread.


## What is Runtime Environment?
A Runtime Environment is essentially the engine and necessary tools that execute code written in a specific programming language outside of its original intended place. 
It provides the core environment to run a program.
    Role: Executes code.
    Example: Node.js


## What is Framework?
A Framework is a pre-defined, structured platform that provides a skeleton for building applications.
It defines the structure and flow of your application and forces you to follow its rules.
    Role: Defines the application's structure and controls the flow of execution.
    Example: Express.js (for Node.js)


## What is  Library?
A Library is a collection of pre-written code (functions, classes, or modules) that you can call upon to perform specific, narrow tasks. 
You use it to make your coding easier and avoid reinventing the wheel.
    Role: Provides specific functionality that you actively use within your code.
    Example: Lodash (utility functions) or fs module (file system operations)


## What are callbacks, promises and async and await functions?
Callbacks, Promises, and async/await are three different methods used in Node.js and JavaScript to manage asynchronous operations (like non-blocking I/O). 
They handle what should happen after a long-running task finishes.

Callbacks:
    A callback is simply a function passed as an argument to another function, intended to be executed later, 
    after the main function has completed its task.
    Example:
        fs.readFile('/path/to/file', (err, data) => { // This is the callback function
        if (err) {
            console.error(err);
            return;
        }
        console.log('File data:', data);
        });

Promises:
    A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. 
    It provides a more structured way to manage asynchronous code than callbacks.
    States: A Promise exists in one of three states:
        Pending: The initial state, neither fulfilled nor rejected.
        Fulfilled (Resolved): The operation completed successfully.
        Rejected: The operation failed (an error occurred).
    How it works: Instead of passing a callback, the asynchronous function returns a Promise object. 
                  You attach handlers using the .then() method (for success) and the .catch() method (for failure).


## What is axios, fetch and what are the differences between them?
Fetch:
    Fetch is a native Web API built into modern browsers and Node.js environments (available globally without installation).
    Native to Node.js (global object, no install needed).
    Manual JSON parsing required via a second promise call: response.json().
    Requires manually setting the body property and using JSON.stringify().
    Requires the use of an AbortController.
    Example: 
        const fetchFunc = () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts")
            if(!response.ok) {
                console.log(response.status)
            }
            const data = await response.json()          (here we have to use await and make it parse using response.json()) 
            console.log(data)
        }

Axios:
    Axios is a third-party, promise-based HTTP client library that requires installation (via npm).
    Requires installation (npm install axios).	
    Automatic JSON data transformation. The response body is available directly in response.data.	
    For POST/PUT, the data object is passed directly and automatically stringified.	
    Built-in support for cancelling requests.	
    Example:
        import axios from 'axios'
        const axiosFun = () => {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
            console.log(response.data)
        }


## What is Streams in Node.js?
A stream is an abstract interface for working with data flowing from one place to another over time. 
Instead of loading an entire data set into memory at once, streams allow you to read or write data in small, manageable chunks.
Streams solve two major problems in data handling:
    ==> Memory Efficiency: Without streams, when dealing with a large file (e.g., a 2GB video), you would have to load the entire 2GB into your 
    server's RAM before you could process it. Streams, however, only hold a small chunk of data (e.g., 64KB) 
    in memory at any time, processing it and then freeing the memory before loading the next chunk.
    ==> Time Efficiency: You don't have to wait for the whole data operation to complete. 
    Processing can start immediately as soon as the first chunk arrives, reducing the overall time it 
    takes for a user to receive the data (e.g., a file download can begin immediately).

Types of Streams
    1. Readable Streams: Streams from which data can be read (the source).
    Examples: fs.createReadStream() (reading a file), an HTTP request object on the server.
    2. Writable Streams: Streams to which data can be written (the destination).
    Examples: fs.createWriteStream() (writing to a file), an HTTP response object on the server.
    3. Duplex Streams: Streams that are both Readable and Writable (like a two-way street).
    Examples: A TCP socket.
    4. Transform Streams: A type of Duplex stream that can modify or transform the data as it is being written and read.
    Examples: Zlib streams (for compression/decompression).





