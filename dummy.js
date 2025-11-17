import bcrypt from 'bcrypt'
import fs from 'fs'
let secretKey = "PIRATE KING"
const createKey = async (value) => {
    const salt = 10
    secretKey = await bcrypt.hash(value, salt)
    secretKey = "SOHEL"
    const fdsfa = fs.writeFileSync('./secretKey', JSON.stringify(secretKey))
    // fs.writeFile("./secretKey", secretKey, (error) => {
    //     if(error) {
    //         console.log("Error creating key")
    //     } else {
    //         console.log("Key created")
    //     }
    // })
}
const compareKey = async (value) => {
    fs.readFile("./secretKey", "utf-8", (error, data) => {
        bcrypt.compare(value, data, (err, res) => {
            if(res) {
                console.log("Key matched")
                return data
            } else {
                console.log("Key not matched")
            }
        })
        return data
    })
}
const first = async () => {
    const value = await createKey("password")
    return value
}
const run = async () => { 
    const value = await compareKey("password")
    return value
}
first()
run()



// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken"
const user = { id: "123", name: "Sohel" };
const token = jwt.sign(user, "PIRATE", { expiresIn: "1h" });

console.log(token);
try {
  const decoded = jwt.verify(token, "PIRATE");
  console.log(decoded); // { id: "123", name: "Sohel", iat: ..., exp: ... }
} catch (err) {
  console.log("Invalid token");
}
