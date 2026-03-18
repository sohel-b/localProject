import React, { useMemo, useState } from 'react';

const ExpensiveCal = () => {
  function total() {
    let sum = 0;
    for (let i = 0; i <= 1000000000; i++) {
      sum = sum + 1;
    }
    return sum;
  }
  const result = useMemo(() => total(), []);
  // total();
  return (
    <div>
      <p>Expensive Component: {result}</p>
    </div>
  );
};

export default function App() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <ExpensiveCal />
      <h1>React UseMemo Example</h1>
      <button onClick={() => setValue(value + 1)}>Click me {value}</button>
    </div>
  );
}


// React.memo()

// import React, { memo, useMemo, useState } from 'react';

// const ExpensiveCal = memo(() => {
//   function total() {
//     let sum = 0;
//     for (let i = 0; i <= 1000000000; i++) {
//       sum = sum + 1;
//     }
//     return sum;
//   }
  // total();
//   return (
//     <div>
//       <p>Expensive Component</p>
//     </div>
//   );
// });

// export default function App() {
//   const [value, setValue] = useState(0);
//   return (
//     <div>
//       <ExpensiveCal />
//       <h1>React UseMemo Example</h1>
//       <button onClick={() => setValue(value + 1)}>Click me {value}</button>
//     </div>
//   );
// }
