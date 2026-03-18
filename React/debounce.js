import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [value, setValue] = useState('');
  const [debounce, setDebounce] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        setDebounce(value);
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  useEffect(() => {
    if (debounce) {
      console.log('Api call is triggered with:', value);
    }
  }, [debounce]);
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
