import React from 'react';
import { useCounter, useWindowWidth, useToggle } from './simple-custom-hook';

const SimpleHookDemo = () => {
  // Using our custom useCounter hook
  const { count, increment, decrement, reset } = useCounter(0);
  
  // Using our custom useWindowWidth hook
  const windowWidth = useWindowWidth();
  
  // Using our custom useToggle hook
  const [isVisible, toggleVisibility] = useToggle(true);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Simple Custom Hooks Demo</h1>
      
      {/* useCounter Example */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>useCounter Hook</h2>
        <p>Count: <strong>{count}</strong></p>
        <button onClick={increment} style={{ margin: '5px', padding: '5px 10px' }}>+</button>
        <button onClick={decrement} style={{ margin: '5px', padding: '5px 10px' }}>-</button>
        <button onClick={reset} style={{ margin: '5px', padding: '5px 10px' }}>Reset</button>
      </div>
      
      {/* useWindowWidth Example */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>useWindowWidth Hook</h2>
        <p>Window Width: <strong>{windowWidth}px</strong></p>
        <p>Resize your browser window to see this value change!</p>
      </div>
      
      {/* useToggle Example */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>useToggle Hook</h2>
        <button onClick={toggleVisibility} style={{ margin: '5px', padding: '5px 10px' }}>
          Toggle Message
        </button>
        {isVisible && (
          <p style={{ marginTop: '10px', color: 'green' }}>
            ✅ This message is now visible!
          </p>
        )}
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>What are Custom Hooks?</h3>
        <p>
          Custom hooks are JavaScript functions that start with "use" and can call other hooks.
          They let you extract component logic into reusable functions.
        </p>
        <ul>
          <li>Start with "use" (useCounter, useToggle, etc.)</li>
          <li>Can use other React hooks inside</li>
          <li>Return values that components can use</li>
          <li>Make logic reusable across components</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleHookDemo;
