// Closures
    ==> USE CASES:
        In Memoization, while iterating in loops, Debouncing and throttling user input
EXAMPLE:
function firstFunc() {
    const outerValue = "OUTER VALUE"
    function secondFunc() {
        const innerValue = "INNER VALUE"
        console.log(outerValue)
    }
    return secondFunc()    //no need to send the value in params, without sending also it will take the value
}
firstFunc()


What is the use of call, apply, and bind?
 // call
 const value = {firstName: "Luffy"}
 function firstFunc(data) {
    console.log(this.firstName, data)
 }
 firstFunc.call(value, "Hi")

 // apply
 const value = {firstName: "Luffy"}
 function firstFunc(data, data2) {
    console.log(this.firstName, data)
 }
 firstFunc.apply(value, ["Hi", "Hello"])

 //bind
 const value = {firstName: "Luffy"} 
 function firstFunc(data) {
    console.log(this.firstName, data)
 }
 let func = firstFunc.bind(value)
 func("Hi")