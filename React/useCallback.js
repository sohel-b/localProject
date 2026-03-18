import React, { useState, useCallback, useEffect } from 'react';

/**
 * Simple example demonstrating how useCallback works.
 *
 * - useCallback returns a memoized version of a callback function.
 * - The memoized function identity changes only when its dependencies change.
 * - Useful to prevent unnecessary re‑creations of functions that are passed
 *   as props to child components, which can avoid needless re‑renders.
 */
function UseCallbackExample() {
  // State that triggers a re‑render when updated
  const [count, setCount] = useState(0);
  // Some unrelated state to show that the memoized callback does NOT change
  const [text, setText] = useState('');

  /**
   * Increment function wrapped with useCallback.
   * It depends only on setCount (which is stable) and therefore its
   * identity stays the same across renders unless we add other deps.
   */
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
    console.log('Count after increment (via useCallback):', count + 1);
  }, []); // empty dependency array → memoized once

  /**
   * A regular (non‑memoized) function that would be recreated on every render.
   * Included here for comparison.
   */
  const logText = () => {
    console.log('Current text (non‑memoized):', text);
  };

  // Effect to demonstrate that increment's identity does not change
  useEffect(() => {
    console.log('increment function reference changed:', increment);
  }, [increment]);

  return (
    <div>
      <h3>useCallback Demo</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment Count (memoized)</button>

      <hr />

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type something"
      />
      <button onClick={logText}>Log Text (non‑memoized)</button>
    </div>
  );
}

export default UseCallbackExample;
