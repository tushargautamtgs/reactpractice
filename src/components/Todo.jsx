import { useReducer, useState } from "react";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [...state, { id: Date.now(), text: action.payload }];
    case "Remove":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

export function Todo() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: "ADD", payload: input });
      setInput("");
    }
  };

  return (
    <div className="card">
      <h2>Todo App</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Task"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text}{" "}
            <button onClick={() => dispatch({ type: "REMOVE", payload: t.id })}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
