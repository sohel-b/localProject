
//CLASS
// class Object {
//     constructor(name, age) {
//         this.name = name
//         this.age = age       
//     }
//     goal() {
//         console.log(`${this.name} will become Pirate King`)
//     }
// }
// const car1 = new Object("Luffy", 21, "Become Pirate King")
// car1.goal()


//EXPRESS.JS BASIC
// const express = require('express')
// const app = express()
// const port = 3000
// app.get("/", (req, res) => {
//     res.send("Pirate King")
// })
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })


//HAPI.JS BASIC
// const Hapi = require("@hapi/hapi")
// const init = () => {
//     const server = Hapi.server({
//         port: 3000,
//         host: 'localhost'
//     })
//     server.route({
//         method: 'GET',
//         path: '/',
//         handler: (request, h) => {
//             return 'Pirate King'
//         }
//     })
//     server.start()
//     console.log(`Server is running on ${server.info.uri}`)
// } 
// init()


//EXPRESS.JS MIDDLEWARE
// const express = require('express')
// const app = express()
// const port = 3000
// const middleWareFun = (req, res, next) => {
//     console.log(`[${new Date().toISOString()}], ${req.method}, ${req.url}`)
//     next()
// }
// app.use(middleWareFun)
// app.get("/", (req, res) => {
//     res.send("Pirate King")
// })
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })


//EXPRESS.JS POST CALL
// const express = require("express")
// const app = express()
// const port = 3000
// app.use(express.json())
// app.post("/", (req, res) => {
//     const payload = req.body
//     res.send(payload)
// })
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })


//AXIOS GET CALL
// const axios = require('axios')
// async function getAxiosCall() {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
//     console.log(response.data)
// }
// getAxiosCall()


//AXIOS POST CALL
// const axios = require('axios')
// async function postAxiosCall() {
//     const object = {
//         userId: 1,
//         body: "This is my new post",
//         title: "My new post"
//     }
//     const response = await axios.post('https://jsonplaceholder.typicode.com/posts', object)
//     console.log(response.data)
// }
// postAxiosCall()


//MONGODB CONNECTION
// const { MongoClient } = require("mongodb")
// const uri = "mongodb+srv://myAtlasDBUser:Sohel2001@myatlasclusteredu.am1dh.mongodb.net/"
// const client = new MongoClient(uri)
// const mongoDBConnection = async () => {
//     await client.connect()
//     const db = client.db("loginData")
//     const collection = db.collection("LoginDetails")
//     const document = await collection.find({}).toArray()
//     console.log(document)
// }
// mongoDBConnection()


//AXIOS GET CALL .then()
// import axios from 'axios'
// import { response } from 'express'
// async function getAxiosCall() {
//     await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
//     .then(response => {
//       return response.data
//     })
//     .then(data => {
//         console.log(data[0])
//     })
//     .catch(error => {
//         console.log(error)
//     })
// }
// getAxiosCall()


// ✅ Why use async/await instead of PROMISE?
// Makes code easier to read
// Avoids callback hell
// Uses try...catch for error handling
//PROMISES
// const promise = new Promise((resolve, reject) => {
//     const value = true
//     if(value) {
//         resolve("SUCCESS")
//     } else {
//         reject("FAILURE")
//     }
// })
// promise
// .then((response) => {
//     console.log("SUCCESS")
// })
// .catch((error) => {
//     console.log("FAILURE")
// })

// function myDuplicatePromise(value) {
//     return new Promise((resolve, reject) => {
//         if(value) {
//             resolve("SUCCESS")
//         } else {
//             reject("FAILURE")
//         }
//     })
// }
// const value = false
// const myPromise = myDuplicatePromise(value)
// myPromise
// .then((response) => {
//     console.log("SUCCESS")
// })
// .catch((error) => {
//     console.log("FAILURE")
// })

// filereading without async/await
// import fs from 'fs'
// const text = "Hello World"
// const value = {
//     key: "value"
// }
// fs.writeFile("./data.json", JSON.stringify(value, null, 2), (error) => {
//     if(error){
//         console.log(error)
//     } else {
//         console.log("File created")
//     }
// })
// fs.readFile("./data.json", "utf-8", (error, data) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(data)
//     }
// })

//filereading with async/await
// const object = {
//     key1: "value1",
// }
// const fdsfa = fs.writeFileSync('example.json', JSON.stringify(object))

// const data = fs.readFileSync('example.json')
// console.log(JSON.parse(data))


//simple HTTP server in NodeJS
// import http from 'http'
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello, World!');
// });
// server.listen(3000, () => {
//   console.log('Server is running at http://localhost:3000/');
// });

//Handling Different Routes
// import http from 'http'
// const server = http.createServer((req, res) => {
//     if (req.url === '/json') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Hello, JSON!' }));
//     } else if (req.url === '/about') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end('<h1>About Page</h1>');
//     } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end('<h1>Hello, HTML World!</h1>');
//     }
// });
// server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });


// import bcrypt from 'bcrypt'
// import fs from 'fs'
// let secretKey = ""
// const createKey = async (value) => {
//     const salt = 10
//     secretKey = await bcrypt.hash(value, salt)
//     fs.writeFile("./secretKey", secretKey, (error) => {
//         if(error) {
//             console.log("Error creating key")
//         } else {
//             console.log("Key created")
//         }
//     })
// }
// const compareKey = async (value) => {
//     fs.readFile("./secretKey", "utf-8", (error, data) => {
//         bcrypt.compare(value, data, (err, res) => {
//             if(res) {
//                 console.log("Key matched")
//             } else {
//                 console.log("Key not matched")
//             }
//         })
//         return data
//     })
// }
// const first = async () => {
//     const value = await createKey("password")
//     return value
// }
// const run = async () => { 
//     await compareKey("password")
// }
// first()
// run()


// Fetch call
const fetchFunc = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if(!response.ok) {
        console.log(response.status)
    }
    const data = await response.json()
    console.log(data)
}
fetchFunc()


// Streams
import express from 'express'
import fs from 'fs'
const app = express()
app.get("/get", (req, res) => {
    const stream = fs.createReadStream("./data", "utf-8")
    stream.on("data", (chunk) => res.send(chunk))
    stream.on("end", () => res.end())
})
app.listen(3000, (err) => {
    console.log("Server is running at http://localhost:3000")
})





















