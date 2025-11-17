console.log("Pirate")

import fs from 'fs'

function readFile () {
    console.log("Started Reading File:")
    const response = fs.readFile("./data", "utf-8", (err, data) => {
        if(err) return err
        console.log(data)
    })
    console.log("Ended Reading File")
}

readFile()
console.log("King")