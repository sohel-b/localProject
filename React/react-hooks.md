React Lifecycle
  ==> Lifecycle of Components, The three phases are: Mounting, Updating, and Unmounting.
Mounting (Mounting means putting elements into the DOM)  
    type1: with constructor   The constructor method is called, by React, every time you make a component: (method is called before anything else, when the component is initiated)
        Example with constructor -->
        class Header extends React.Component {
            constructor(props) {
                super(props);
                this.state = {favoritecolor: "red"};
            }
            render() {
                return (
                <h1>My Favorite Color is {this.state.favoritecolor}</h1>
                );
            }
        }
        ReactDOM.render(<Header />, document.getElementById('root'));

    type2: with render 
        class Header extends React.Component {
            render() {
                return (
                <h1>This is the content of the Header component</h1>
                );
            }
        }
        ReactDOM.render(<Header />, document.getElementById('root'));

    type3: with componentDidMount   The componentDidMount() method is called after the component is rendered.
    class Header extends React.Component {
        constructor(props) {
            super(props);
            this.state = {favoritecolor: "red"};
        }
        componentDidMount() {
            setTimeout(() => {
            this.setState({favoritecolor: "yellow"})
            }, 1000)
        }
        render() {
            return (
            <h1>My Favorite Color is {this.state.favoritecolor}</h1>
            );
        }
    }
    ReactDOM.render(<Header />, document.getElementById('root'));

Updating (componentDidUpdate)
    type1:  The componentDidUpdate method is called after the component is updated in the DOM.

Unmounting (componentWillUnmount)   // The next phase in the lifecycle is when a component is removed from the DOM, or unmounting as React likes to call it.
    type1: with componentWillUnmount    The componentWillUnmount method is called when the component is about to be removed from the DOM.



notes link for all hooks concepts https://drive.google.com/drive/folders/1-wk8nrebq2jM17T9pOkoXmyp83jk8fNo




A: useState is a hook used to manage state in functional components, while useEffect is a hook used to manage side effects (like fetching data, setting up event listeners, or updating the DOM) in functional components.

useEffect ==> 
useEffect(() => {
    // callback Function(what to happen)
}, // dependency(when to happen) )
    useEffect without any dependency:  it runs with first render and also run on anything changes in that component
    useEffect with empty Array: it runs only on first render. Useful for Fetching data.
    useEffect with values in array: it runs on first render and then any variable that we pass in dependency change it will run


useContext ==>
useContext is a React Hook that enables functional components to consume values from a React Context. It provides a way to pass data deeply through the component tree without needing to explicitly pass props down at every level, a pattern often referred to as "prop drilling."

    creating the context   ====>  In Parent Component we will be import createContext and create a createContext using the variable      
        import {createContext} from react
        export const LoginDetails = createContext()
    providing the context  ====>  Wrap that Parent Component in Provider
        <LoginDetails.Provider value={true}>
            <App />
        </LoginDetails.Provider>
    consuming the context  ====> import useContext, and import that createContext variable from Parent Component
        import {useContext} from react
        import {LoginDetails} from '../App'
        const login = useContext(LoginDetails)


useRef ==>
useRef is a React Hook that lets you reference a value that’s not needed for rendering.
useRef is a React Hook that provides a way to create a mutable reference to a value that persists across renders of a functional component without causing the component to re-render when the value changes.




useLayoutEffect ===>
    useLayoutEffect works exactly the same as useEffect(Also the same syntax)
    But the difference is "When it runs"
    useEffect runs after the DOM is printed on the browser but useLayoutEffect runs before the DOM is printed on the browser
    it runs synchronously, after first line then only second line will execute


useMemo ==>  same syntax as useEffect
useMemo in React is a Hook that allows for the memoization of a calculated value. This means it caches the result of an expensive computation and only re-executes the computation when its dependencies change, preventing unnecessary recalculations on every render.

    useMemo hook is used to aply Memoization in React, memoization is techinque for improving the performance of code
    it is useful to avoid expensive calculations on every render when the returned value is not change.

    const memoCalculation = useMemo(callback, [denpendency])
    memoCalculation is for storing the variable which return the calculation after the calculation function in callback function of useMemo, 
    callback is the calculation function that should happen and it returns the value of calculation
    whenever the dependency changes then only callback function will happen



useCallback ==>
useMemo is for memoizing a value, while useCallback is for memoizing a function. You should use useMemo to cache the result of an expensive calculation, and useCallback to cache a function reference to prevent unnecessary re-renders of child components. 
    useCallback is used to return Memoize function
    improve the performance of our react application
    useCallback syntax is same as useMemo hook
    difference is useMemo Memoize value useCallback Memoize Function 



customHooks ==>







# React Hooks Overview with Simple Examples

Below is a concise guide to **all the built‑in React hooks** (as of React 18) with short, easy‑to‑understand examples using **function components** and **JSX**.

---

## 1. `useState`
Manages local component state.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

---

## 2. `useEffect`
Runs side‑effects after render (e.g., data fetching, subscriptions).

```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => r.json())
      .then(setUsers);
  }, []); // empty deps → runs once on mount

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

## 3. `useContext`
Consumes a React context value.

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
    {theme} theme
  </button>;
}
```

---

## 4. `useReducer`
Alternative to `useState` for complex state logic.

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'inc': return { count: state.count + 1 };
    case 'dec': return { count: state.count - 1 };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
      <button onClick={() => dispatch({ type: 'dec' })}>-</button>
    </div>
  );
}
```

---

## 5. `useCallback`
Memoizes a callback function to avoid unnecessary re‑creation.

```jsx
import { useState, useCallback } from 'react';

function ExpensiveList({ items, onSelect }) {
  // onSelect is memoized, so child components that depend on it
  // won’t re‑render unless `items` change.
  const handleSelect = useCallback(
    (id) => onSelect(id),
    [onSelect]
  );

  return (
    <ul>
      {items.map(i => (
        <li key={i.id} onClick={() => handleSelect(i.id)}>{i.name}</li>
      ))}
    </ul>
  );
}
```

---

## 6. `useMemo`
Memoizes a computed value.

```jsx
import { useMemo, useState } from 'react';

function Fibonacci({ n }) {
  const fib = useMemo(() => {
    const calc = (num) => (num <= 1 ? 1 : calc(num - 1) + calc(num - 2));
    return calc(n);
  }, [n]);

  return <p>Fibonacci({n}) = {fib}</p>;
}
```

---

## 7. `useRef`
Keeps a mutable value that persists across renders (often for DOM refs).

```jsx
import { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  const focus = () => inputRef.current?.focus();

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={focus}>Focus</button>
    </div>
  );
}
```

---

## 8. `useImperativeHandle`
Customizes the instance value that is exposed to parent refs.

```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const innerRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => innerRef.current.focus(),
    clear: () => (innerRef.current.value = ''),
  }));

  return <input ref={innerRef} {...props} />;
});

function Parent() {
  const fancyRef = useRef();
  return (
    <>
      <FancyInput ref={fancyRef} />
      <button onClick={() => fancyRef.current.focus()}>Focus</button>
      <button onClick={() => fancyRef.current.clear()}>Clear</button>
    </>
  );
}
```

---

## 9. `useLayoutEffect`
Runs synchronously after all DOM mutations (before the browser paints).

```jsx
import { useLayoutEffect, useRef } from 'react';

function Measure() {
  const boxRef = useRef();
  useLayoutEffect(() => {
    const { width, height } = boxRef.current.getBoundingClientRect();
    console.log('Size:', width, height);
  }, []); // runs after DOM is ready but before paint

  return <div ref={boxRef} style={{ width: 200, height: 100, background: '#ddd' }} />;
}
```

---

## 10. `useDebugValue`
Displays a custom label in React DevTools for custom hooks.

```jsx
import { useState, useDebugValue } from 'react';

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  useDebugValue(count > 10 ? 'High' : 'Low');
  return [count, setCount];
}
```

---

## 11. `useId` (React 18)
Generates a stable unique ID for accessibility attributes.

```jsx
import { useId } from 'react';

function LabeledInput() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </>
  );
}
```

---

## 12. `useTransition` (React 18)
Marks state updates as *transitions* to keep UI responsive.

```jsx
import { useState, useTransition } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      // simulate expensive filtering
      // filterData(value);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search…" />
      {isPending && <span>Loading…</span>}
    </div>
  );
}
```

---

## 13. `useDeferredValue` (React 18)
Defers a value until the UI is idle, useful for expensive calculations.

```jsx
import { useState, useDeferredValue } from 'react';

function FilteredList({ items }) {
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);

  const filtered = items.filter(i =>
    i.toLowerCase().includes(deferredFilter.toLowerCase())
  );

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter…" />
      <ul>
        {filtered.map((i, idx) => <li key={idx}>{i}</li>)}
      </ul>
    </>
  );
}
```

---

## 14. `useSyncExternalStore` (React 18)
Subscribes to external stores (e.g., Redux, Zustand) with concurrent‑mode safety.

```jsx
import { useSyncExternalStore } from 'react';
import { store } from './myStore'; // assume store has subscribe & getSnapshot

function Counter() {
  const count = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot
  );

  return <p>Count from external store: {count}</p>;
}
```

---

### How to Use This File
- Copy any example into your own component file.
- Adjust imports and logic as needed for your project.
- These snippets are deliberately minimal to focus on the hook’s core idea.

Happy coding! 🚀
