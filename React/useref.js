import React, { useRef, useEffect } from 'react';

/**
 * Simple example demonstrating how useRef works.
 *
 * - The ref object persists across renders.
 * - Updating ref.current does NOT trigger a re‑render.
 * - Useful for accessing DOM elements or storing mutable values.
 */
function UseRefExample() {
  // Create a ref with an initial value of null (will hold the input element)
  const inputRef = useRef(null);

  // Focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []); // Empty dependency array → runs only once

  // Example of a mutable counter stored in a ref (does not cause re‑render)
  const countRef = useRef(0);
  const increment = () => {
    countRef.current += 1;
    console.log('Current count (ref):', countRef.current);
  };

  return (
    <div>
      <h3>useRef Demo</h3>
      <input ref={inputRef} placeholder="I am focused on mount" />
      <button onClick={increment}>Increment Ref Counter (check console)</button>
    </div>
  );
}

export default UseRefExample;
