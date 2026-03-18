import React, { useState, useEffect, useCallback } from 'react';
import './style.css';

export default function App() {
  const [value, setValue] = useState('');
  const apiTrottleCall = useCallback(
    trottle((value) => {
      console.log('Api call is trigggered with:', value);
    }, 2000),
    []
  );
  useEffect(() => {
    apiTrottleCall(value);
  }, [value, apiTrottleCall]);
  function trottle(func, limit) {
    let intro = false;
    return function () {
      if (!intro) {
        func.apply(this, arguments);
        intro = true;
        setTimeout(() => (intro = false), limit);
      }
    };
  }
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
