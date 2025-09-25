import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <h2>Counter App</h2>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Inc</button>
      <button onClick={() => setCount(count - 1)}>Dec</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
