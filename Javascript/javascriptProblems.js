// leaders
// const arr = [30, 10, 10, 5]
// arr.reverse()
// const leaders = []
// let maxElement = arr[0]
// leaders.push(arr[0])
// for(let i =1; i<arr.length; i++) {
//   if(arr[i] >= maxElement) {
//     maxElement = arr[i]
//     leaders.push(arr[i])
//   }
// }
// console.log(leaders)


// array duplicates
// const arr = [2, 3, 1, 2, 3]
// const obj = {}
// for(let i of arr) {
//     if(obj[i]) {
//         obj[i] = obj[i] + 1
//     } else {
//         obj[i] = 1
//     }
// }
// const duplicateArrays = []
// for(let [key, value] of Object.entries(obj)) {
//     if(value > 1) {
//         duplicateArrays.push(JSON.parse(key))
//     }
// }
// console.log(duplicateArrays)


// Majority Element
// const arr = [2, 13]
// const obj = {}
// for(let i of arr) {
//     if(obj[i]) {
//         obj[i] = obj[i] + 1
//     } else {
//         obj[i] = 1
//     }
// } 
// for(let [key, value] of Object.entries(obj)) {
//     if(value > (arr.length/2)) {
//         console.log(key)
//     } 
//     console.log(-1)
//     break
// }


// Minimum Platforms
// const arr = [900, 1235, 1100]
// const dep =  [1000, 1240, 1200]
// let arrLength = arr.length
// const obj = {}
// for(let i = 0; i < arrLength; i++) {
//     for(let j of arr) {
//         if((j > arr[i] && j < dep[i])) {
//             if (!obj[i]) {
//                 obj[i] = 1;
//             }
//             obj[i] = obj[i] + 1;
//         }
//     }
// }
// if(Object.keys(obj).length === 0) {
//     console.log(1)
// } else {
//     const maxPlatforms = Math.max(...Object.values(obj))
//     console.log(maxPlatforms)
// }


// Rotate Array
// const arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
// const r = 3
// for(let i = 0; i < r; i++) {
//     const lastValue = arr.shift()
//     arr.push(lastValue)
// }
// console.log(arr)



// Equilibrium Point
// const arr = [1, 2, 0, 3]
// let totalSum = arr.reduce((sum, num) => sum + num)
// let leftSum = 0
// for(let i = 0; i < arr.length; i++) {
//     totalSum = totalSum - arr[i]
//     if(totalSum === leftSum) {
//         console.log(i)
//     }
//     leftSum = leftSum + arr[i]   
// }


// Missing And Repeating
// const arr = [1,3,3]
// arr.sort((a, b) => a - b)
// let missing = -1
// let repeating = -1
// for(let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] === arr[i + 1]) {
//         repeating = arr[i]
//     }
//     if(arr[i + 1] - arr[i] > 1) {
//         missing = arr[i] + 1
//     }
// }
// console.log(missing, repeating)



// Peak Element
// const arr =  [1, 2, 3]
// const peakEle = []
// for(let i = 0; i < arr.length; i++) {
//     if(arr[i] > arr[i + 1] && arr[i] > arr[i -1]) {
//         peakEle.push(arr[i])
//     } else if ( i === arr.length - 1 && arr[i] > arr[i - 1]) {
//         peakEle.push(arr[i])
//     }
// }
// console.log(peakEle)



// Two sum -Pairs with 0 Sum
// const arr = [1, -1, 2, -2, 3]
// const duplicArr = []
// for(let i of arr) {
//     let subArr = []
//     if(arr.includes(i) && arr.includes(-i)) {
//         subArr.push(-i, i)
//         subArr.sort((a, b) => a-b)
//         duplicArr.push(subArr)
//     }
// }
// console.log([... new Set(duplicArr.map(JSON.stringify))].map(JSON.parse))



// Union of 2 Sorted Arrays
// const a = [2, 2, 3, 4, 5]
// const b = [1, 1, 2, 3, 4]
// const ab = ([...a, ...b]).sort((a, b) => a - b)
// console.log(...new Set(ab))


// Maximum SubArray 
// const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// let currentSum = arr[0];
// let maxSum = arr[0];
// let start = 0;
// let end = 0;
// let tempStart = 0;
// for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > currentSum + arr[i]) {
//         currentSum = arr[i];
//         tempStart = i;
//     } else {
//         currentSum += arr[i];
//     }
//     if (currentSum > maxSum) {
//         maxSum = currentSum;
//         start = tempStart;
//         end = i;
//     }
// }
// console.log(arr.slice(start, end + 1))



// Sorting Without Sort
// const arr = [1, 3, 2, 4]
// for(let i = 0; i < arr.length; i++) {
//     if(arr[i] > arr[i+1]) {
//         let temp = arr[i]
//         arr[i] = arr[i+1]
//         arr[i+1] = temp
//         i = 1
//     }
// }
// console.log(arr)




// Next Greater Element
// const arr =[6, 8, 0, 1, 3]
// const greaterArr = []
// for(let i = 0; i < arr.length; i++) {
//     let found = false
//     for(let j = i + 1; j < arr.length; j++) {
//         if(arr[j] > arr[i]) {
//             greaterArr.push(arr[j])
//             found = true
//             break;
//         }
//     }
//     if(!found) {
//         greaterArr.push(-1)
//     }
// }
// console.log(greaterArr)



// Index of Element
// const arr = [1,3,4,5,6]
// for(let i = 0; i < arr.length; i++) {
//     if(arr[i] === 6) {
//         console.log(i)
//         break; // stops after finding the first element
//     }
// }


// Array Subset
// const a = [11, 7, 1, 13, 21, 3, 3]
// const b = [11, 3, 1, 7]
// const obj = {}
// for(let i = 0; i < a.length; i++) {
//     if(!obj[a[i]]) {
//         obj[a[i]] = 1
//     } else {
//         obj[a[i]] = obj[a[i]] + 1
//     }
// }
// console.log(obj)
// for(let i = 0; i < b.length; i++) {
//     if(!obj[b[i]]) {
//         console.log(false)
//         break;
//     } else {
//         obj[b[i]] = obj[b[i]] - 1
//     }
// }



// Union of Arrays with Duplicates
// const a = [1, 2, 1, 1, 2] 
// const b = [2, 2, 1, 2, 1] 
// console.log([...new Set([...a, ...b])])


// Smallest Positive Missing
// let arr = [5, 3, 2, 5, 1]
// arr.sort((a, b) => a - b)
// arr = [...new Set(arr)]
// console.log(arr)
// for(let i = 0; i < arr.length; i++) {
//     if(arr[i] > 0 && (arr[i]+1 !== arr[i+1])) {
//         console.log(arr[i] + 1, "Is Missing")
//         break
//     }
// }


// Common in 3 Sorted Arrays
//  const arr1 = [1, 5, 10, 20, 40, 80]
//  const  arr2 = [6, 7, 20, 80, 100] 
//  const arr3 = [3, 4, 15, 20, 30, 70, 80, 120]
//  let obj = {}
//  const creObj = (arr) => {
//      for(let i = 0; i < arr.length; i++) {
//         if(!obj[arr[i]]) {
//             obj[arr[i]] = 1
//         } else {
//             obj[arr[i]] = obj[arr[i]] + 1
//         }
//      }
//  }
//  creObj(arr1)
//  creObj(arr2)
//  creObj(arr3)
// for(let [key, value] of Object.entries(obj)) {
//     if(value === 3) {
//         console.log(key)
//     }
// }


// Anagram
// const str1 = 'listenn'
// const str2 = 'silent'
// const map1 = {}
// const map2 = {}
// let isAnagram = true
// for(let i of str1) {
//     if(map1[i]) {
//         map1[i] = map1[i] + 1 
//     } else {
//         map1[i] = 1
//     }
// }
// for(let i of str2) {
//     if(map2[i]) {
//         map2[i] = map2[i] + 1 
//     } else {
//         map2[i] = 1
//     }
// }
// for(let [key, value] of Object.entries(map1)) {
//     if((map1[key] !== map2[key]) || map1[value] !== map2[value]) {
//         isAnagram = false
//         break
//     }
// }
// console.log(isAnagram)



function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5))


























