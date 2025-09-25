import React, {
  useState,
  useReducer,
  useRef,
  // useEffect,
  createContext,
  useContext,
} from "react";
import "./App.css";

// ========== Theme Context ==========
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

// ========== Counter ==========
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <h2>Counter App</h2>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ========== Todo ==========
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.payload }];
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

function Todo() {
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
        placeholder="Enter todo"
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

// ========== User List ==========
function UserList() {
  const [users, setUsers] = useState(["Alice", "Bob"]);
  const [input, setInput] = useState("");

  const addUser = () => {
    if (input.trim()) {
      setUsers([...users, input]);
      setInput("");
    }
  };

  const removeUser = (name) => setUsers(users.filter((u) => u !== name));

  return (
    <div className="card">
      <h2>User List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add user"
      />
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((u) => (
          <li key={u}>
            {u} <button onClick={() => removeUser(u)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ========== Stopwatch ==========
function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return (
    <div className="card">
      <h2>Stopwatch</h2>
      <p>{time}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// ========== Form Handling ==========
function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email invalid";
    if (!formData.password) newErrors.password = "Password required";
    else if (formData.password.length < 6) newErrors.password = "Min 6 chars";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = validate();
    if (Object.keys(val).length > 0) setErrors(val);
    else {
      setErrors({});
      setSuccess("Form submitted successfully! 🎉");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <div className="card">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
        <button type="submit">Submit</button>
      </form>
      {success && <p className="success">{success}</p>}
    </div>
  );
}

// ========== App ==========
function App() {
  const [activeTab, setActiveTab] = useState("counter");
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header>
        <h1>React Mega SPA</h1>
        <button onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <nav>
        <button onClick={() => setActiveTab("counter")}>Counter</button>
        <button onClick={() => setActiveTab("todo")}>Todo</button>
        <button onClick={() => setActiveTab("userlist")}>User List</button>
        <button onClick={() => setActiveTab("stopwatch")}>Stopwatch</button>
        <button onClick={() => setActiveTab("form")}>Form</button>
      </nav>
      <main>
        {activeTab === "counter" && <Counter />}
        {activeTab === "todo" && <Todo />}
        {activeTab === "userlist" && <UserList />}
        {activeTab === "stopwatch" && <Stopwatch />}
        {activeTab === "form" && <Form />}
      </main>
    </div>
  );
}

// ========== Wrap with ThemeProvider ==========
export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
