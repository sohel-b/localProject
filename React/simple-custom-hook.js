import { useState, useEffect } from 'react';

// SIMPLE CUSTOM HOOK EXAMPLE: useCounter
// A custom hook is just a function that starts with "use" and uses other hooks
const useCounter = (initialValue = 0) => {
  // We can use useState inside our custom hook
  const [count, setCount] = useState(initialValue);
  
  // We can define our own functions that manipulate the state
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  // Return whatever the component needs
  return {
    count,
    increment,
    decrement,
    reset
  };
};

// ANOTHER SIMPLE EXAMPLE: useWindowWidth
// This hook tracks the window width
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
};

// ANOTHER SIMPLE EXAMPLE: useToggle
// This hook toggles between true and false
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => {
    setValue(prevValue => !prevValue);
  };
  
  return [value, toggle];
};

export { useCounter, useWindowWidth, useToggle };
