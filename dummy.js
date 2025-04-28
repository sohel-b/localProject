import bcrypt from 'bcrypt'
import fs from 'fs'
let secretKey = ""
const createKey = async (value) => {
    const salt = 10
    secretKey = await bcrypt.hash(value, salt)
    fs.writeFile("./secretKey", secretKey, (error) => {
        if(error) {
            console.log("Error creating key")
        } else {
            console.log("Key created")
        }
    })
}
const compareKey = async (value) => {
    fs.readFile("./secretKey", "utf-8", (error, data) => {
        bcrypt.compare(value, data, (err, res) => {
            if(res) {
                console.log("Key matched")
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
    await compareKey("password")
}
first()
run()
