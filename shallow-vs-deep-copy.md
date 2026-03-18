# Shallow Copy vs Deep Copy

## Overview

Shallow copy and deep copy are two different ways to duplicate objects in programming. The key difference lies in how they handle nested objects and references.

## Shallow Copy

### Definition
A shallow copy creates a new object that shares the same references as the original object. Only the top-level properties are copied, while nested objects still reference the same memory locations.

### Characteristics
- Copies only the first level of properties
- Nested objects/arrays are still referenced, not duplicated
- Faster and uses less memory
- Changes to nested properties affect both original and copy

### JavaScript Examples

#### Using Spread Operator (...)
```javascript
const original = {
  name: "John",
  age: 30,
  hobbies: ["reading", "coding"],
  address: {
    city: "New York",
    country: "USA"
  }
};

const shallowCopy = { ...original };

// Modifying primitive values - only affects the copy
shallowCopy.name = "Jane";
console.log(original.name); // "John" (unchanged)
console.log(shallowCopy.name); // "Jane"

// Modifying nested objects - affects both!
shallowCopy.hobbies.push("gaming");
console.log(original.hobbies); // ["reading", "coding", "gaming"] (changed!)
console.log(shallowCopy.hobbies); // ["reading", "coding", "gaming"]

shallowCopy.address.city = "Boston";
console.log(original.address.city); // "Boston" (changed!)
console.log(shallowCopy.address.city); // "Boston"
```

#### Using Object.assign()
```javascript
const original = {
  name: "John",
  details: { age: 30, job: "Developer" }
};

const shallowCopy = Object.assign({}, original);

shallowCopy.details.age = 25;
console.log(original.details.age); // 25 (changed!)
```

## Deep Copy

### Definition
A deep copy creates a completely independent duplicate of an object, including all nested objects and arrays. All levels are recursively copied.

### Characteristics
- Copies all levels of properties
- Nested objects/arrays are completely duplicated
- Slower and uses more memory
- Changes to any property don't affect the original

### JavaScript Examples

#### Using JSON Methods
```javascript
const original = {
  name: "John",
  age: 30,
  hobbies: ["reading", "coding"],
  address: {
    city: "New York",
    country: "USA"
  }
};

const deepCopy = JSON.parse(JSON.stringify(original));

// Modifying primitive values - only affects the copy
deepCopy.name = "Jane";
console.log(original.name); // "John" (unchanged)

// Modifying nested objects - only affects the copy
deepCopy.hobbies.push("gaming");
console.log(original.hobbies); // ["reading", "coding"] (unchanged)
console.log(deepCopy.hobbies); // ["reading", "coding", "gaming"]

deepCopy.address.city = "Boston";
console.log(original.address.city); // "New York" (unchanged)
console.log(deepCopy.address.city); // "Boston"
```
## Comparison Table

| Aspect | Shallow Copy | Deep Copy |
|--------|-------------|-----------|
| **Performance** | Fast | Slower |
| **Memory Usage** | Less | More |
| **Nested Objects** | Shared references | Independent copies |
| **Isolation** | Partial | Complete |
| **Use Case** | Simple objects, performance-critical | Complex objects, need isolation |

## When to Use Each

### Use Shallow Copy When:
- Object has only primitive values
- Performance is critical
- You want to share nested objects intentionally
- Object structure is simple and flat

### Use Deep Copy When:
- Object has complex nested structure
- You need complete isolation between objects
- You're working with configuration or state objects
- You want to prevent accidental mutations

## Best Practices

1. **Choose the right copy method** based on your object structure and needs
2. **Be explicit** about whether you're doing shallow or deep copying
3. **Consider immutability** libraries like Immutable.js for complex state management
4. **Test your copying logic** with nested objects and edge cases
5. **Document the copying behavior** in your code comments


## Summary

- **Shallow Copy**: Fast, memory-efficient, but shares nested references
- **Deep Copy**: Slower, memory-intensive, but provides complete isolation
- Choose based on your specific needs for performance vs. isolation
- Be aware of the limitations of different copying methods
- Test thoroughly to ensure the copying behavior matches your expectations
