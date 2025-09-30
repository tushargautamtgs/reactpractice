// Api Fetch cencept





import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.github.com/users/octocat");
        if (!res.ok) throw new Error("User Not Found");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>GitHub User (Static)</h1>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
          <img src={data.avatar_url} alt={data.login} width="150" />
          <h2 style={{ color: "red" }}>{data.name}</h2>
          <p>{data.bio}</p>
          <p>Followers: {data.followers}</p>
        </div>
      )}
    </div>
  );
}

export default App;

// -----------------------------------

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./App.css";

export default function App() {
  const Home = () => {
    const navigate = useNavigate();
    return (
      <div className="page">
        <h1>Home page</h1>
        <p>Welcome to my world</p>
        <button className="btn" onClick={() => navigate("/about")}>
          Go To About
        </button>
      </div>
    );
  };

  const About = () => (
    <div className="page">
      <h1>About Page</h1>
      <nav className="subnav">
        <Link to="team">Team</Link>|<Link to="company"> Company</Link>
      </nav>
      <Outlet />
    </div>
  );

  const Team = () => (
    <div>
      <h2>Our Team</h2>
      <p>Meet our awesome developers</p>
    </div>
  );
  const Company = ()=> (
    <div>
      <h2>Our Company</h2>
      <p>We deliver cutting-edge software solutions...</p>
    </div>
  );

  const Services = () => {
  const services = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Mobile Apps" },
    { id: 3, name: "Cloud Solutions" },
  ];

  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  return (
    <div className="page">
      <h1>🛠 Services</h1>
      <p>Filter applied: {filter || "None"}</p>
      <div className="service-links">
        {services.map((s) => (
          <Link key={s.id} to={`${s.id}`}>
            {s.name}
          </Link>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

  const ServiceDetail = ()=> {
    const {id} = useParams();
    return (
      <div className="detail">
        <h2>Service Detail</h2>
        <p>You are viewing service Id: {id}</p>
      </div>
    );
  };

const Contact = () => (
  <div className="page">
    <h1>Contact Page</h1>
    <p>Email: support@example.com</p>
  </div>
);

const NotFound = () => (
  <div className="page">
    <h1>404-Page Not Found</h1>
    <p>The Page you re looking for doesn't exist!!</p>
  </div>
);

return (
    <BrowserRouter>
      <nav className="navbar">
        <h2 className="logo"> React Router Demo</h2>
        <div className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />}>
            <Route path="team" element={<Team />} />
            <Route path="company" element={<Company />} />
          </Route>

          <Route path="/services" element={<Services />}>
            <Route path=":id" element={<ServiceDetail />} />
          </Route>

          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// ------------------------------------------

// import React, {
//   useState,
//   useReducer,
//   useRef,
//   // useEffect,
//   createContext,
//   useContext,
// } from "react";
// import "./App.css";

// // ========== Theme Context ==========
// const ThemeContext = createContext();

// function ThemeProvider({ children }) {
//   const [darkMode, setDarkMode] = useState(false);
//   const toggleTheme = () => setDarkMode(!darkMode);
//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// function useTheme() {
//   return useContext(ThemeContext);
// }

// // ========== Counter ==========
// function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <div className="card">
//       <h2>Counter App</h2>
//       <p>{count}</p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(0)}>Reset</button>
//     </div>
//   );
// }

// // ========== Todo ==========
// const todoReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD":
//       return [...state, { id: Date.now(), text: action.payload }];
//     case "REMOVE":
//       return state.filter((todo) => todo.id !== action.payload);
//     default:
//       return state;
//   }
// };

// function Todo() {
//   const [todos, dispatch] = useReducer(todoReducer, []);
//   const [input, setInput] = useState("");

//   const handleAdd = () => {
//     if (input.trim()) {
//       dispatch({ type: "ADD", payload: input });
//       setInput("");
//     }
//   };

//   return (
//     <div className="card">
//       <h2>Todo App</h2>
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Enter todo"
//       />
//       <button onClick={handleAdd}>Add</button>
//       <ul>
//         {todos.map((t) => (
//           <li key={t.id}>
//             {t.text}{" "}
//             <button onClick={() => dispatch({ type: "REMOVE", payload: t.id })}>
//               X
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // ========== User List ==========
// function UserList() {
//   const [users, setUsers] = useState(["Alice", "Bob"]);
//   const [input, setInput] = useState("");

//   const addUser = () => {
//     if (input.trim()) {
//       setUsers([...users, input]);
//       setInput("");
//     }
//   };

//   const removeUser = (name) => setUsers(users.filter((u) => u !== name));

//   return (
//     <div className="card">
//       <h2>User List</h2>
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Add user"
//       />
//       <button onClick={addUser}>Add</button>
//       <ul>
//         {users.map((u) => (
//           <li key={u}>
//             {u} <button onClick={() => removeUser(u)}>X</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // ========== Stopwatch ==========
// function Stopwatch() {
//   const [time, setTime] = useState(0);
//   const intervalRef = useRef(null);

//   const start = () => {
//     if (!intervalRef.current) {
//       intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
//     }
//   };

//   const stop = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//   };

//   const reset = () => {
//     stop();
//     setTime(0);
//   };

//   return (
//     <div className="card">
//       <h2>Stopwatch</h2>
//       <p>{time}s</p>
//       <button onClick={start}>Start</button>
//       <button onClick={stop}>Stop</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// }

// // ========== Form Handling ==========
// function Form() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//     setSuccess("");
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name required";
//     if (!formData.email.trim()) newErrors.email = "Email required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Email invalid";
//     if (!formData.password) newErrors.password = "Password required";
//     else if (formData.password.length < 6) newErrors.password = "Min 6 chars";
//     if (formData.confirmPassword !== formData.password)
//       newErrors.confirmPassword = "Passwords do not match";
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const val = validate();
//     if (Object.keys(val).length > 0) setErrors(val);
//     else {
//       setErrors({});
//       setSuccess("Form submitted successfully! 🎉");
//       setFormData({ name: "", email: "", password: "", confirmPassword: "" });
//     }
//   };

//   return (
//     <div className="card">
//       <h2>Registration Form</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         {errors.name && <span className="error">{errors.name}</span>}
//         <input
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         {errors.email && <span className="error">{errors.email}</span>}
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         {errors.password && <span className="error">{errors.password}</span>}
//         <input
//           name="confirmPassword"
//           type="password"
//           placeholder="Confirm Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//         />
//         {errors.confirmPassword && (
//           <span className="error">{errors.confirmPassword}</span>
//         )}
//         <button type="submit">Submit</button>
//       </form>
//       {success && <p className="success">{success}</p>}
//     </div>
//   );
// }

// // ========== App ==========
// function App() {
//   const [activeTab, setActiveTab] = useState("counter");
//   const { darkMode, toggleTheme } = useTheme();

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <header>
//         <h1>React Mega SPA</h1>
//         <button onClick={toggleTheme}>
//           {darkMode ? "Light Mode" : "Dark Mode"}
//         </button>
//       </header>
//       <nav>
//         <button onClick={() => setActiveTab("counter")}>Counter</button>
//         <button onClick={() => setActiveTab("todo")}>Todo</button>
//         <button onClick={() => setActiveTab("userlist")}>User List</button>
//         <button onClick={() => setActiveTab("stopwatch")}>Stopwatch</button>
//         <button onClick={() => setActiveTab("form")}>Form</button>
//       </nav>
//       <main>
//         {activeTab === "counter" && <Counter />}
//         {activeTab === "todo" && <Todo />}
//         {activeTab === "userlist" && <UserList />}
//         {activeTab === "stopwatch" && <Stopwatch />}
//         {activeTab === "form" && <Form />}
//       </main>
//     </div>
//   );
// }

// // ========== Wrap with ThemeProvider ==========
// export default function WrappedApp() {
//   return (
//     <ThemeProvider>
//       <App />
//     </ThemeProvider>
//   );
// }
