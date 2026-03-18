import React, { useState, useEffect, createContext, useContext } from 'react';
import './style.css';
const mainContext = createContext();

function ContextProvider({ children }) {
  const [theme, setTheme] = useState('light');
  function toggle() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }
  return (
    <mainContext.Provider value={{ theme, toggle }}>
      {children}
    </mainContext.Provider>
  );
}

function ToggleButton() {
  const { theme, toggle } = useContext(mainContext);
  return (
    <div>
      <button onClick={toggle}>Click me to change the theme: {theme}</button>
    </div>
  );
}

export default function App() {
  return (
    <ContextProvider>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <ToggleButton />
    </ContextProvider>
  );
}
