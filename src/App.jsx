import React, {
  useState,
  useCallback,
  useMemo,
  useReducer,
  Suspense,
  useRef,
  useEffect,
  memo,
} from "react";

const LazyStats = React.lazy(() => import("./LazyStats"));

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    case "EDIT":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text } : t
      );
    default:
      return state;
  }
};

const useTodos = (initialTodos) => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  const addTodo = useCallback((text) => {
    if (!text.trim()) return;
    dispatch({
      type: "ADD",
      payload: { id: Date.now(), text: text.trim(), done: false },
    });
  }, []);

  const toggleTodo = useCallback(
    (id) => dispatch({ type: "TOGGLE", payload: id }),
    []
  );

  const deleteTodo = useCallback(
    (id) => dispatch({ type: "DELETE", payload: id }),
    []
  );

  const editTodo = useCallback(
    (id, text) => dispatch({ type: "EDIT", payload: { id, text } }),
    []
  );

  const completedCount = useMemo(
    () => todos.filter((t) => t.done).length,
    [todos]
  );

  return { todos, addTodo, toggleTodo, deleteTodo, editTodo, completedCount };
};

const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const renderCountRef = useRef(1);

  useEffect(() => {
    renderCountRef.current++;
  });

  const handleEdit = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={{ padding: "3px", widht: "150px" }}
          />
        ) : (
          <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.text}
          </span>
        )}
      </div>

      <div>
        {isEditing ? (
          <button onClick={handleEdit} style={{ marginRight: "5px" }}>
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginRight: "5px" }}
          >
            edit
          </button>
        )}

        <button
          onClick={() => onToggle(todo.id)}
          style={{ marginRight: "5px" }}
        >
          {todo.done ? "Undo" : "Done"}
        </button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
        <span style={{ marginLeft: "10px", fontSize: "12px", color: "gray" }}>
          Render: {renderCountRef.current}
        </span>
      </div>
    </div>
  );
});

const TodoList = memo(({ todos, toggleTodo, deleteTodo, editTodo }) => {
  return todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onToggle={toggleTodo}
      onDelete={deleteTodo}
      onEdit={editTodo}
    />
  ));
});


export default function Day15Practice() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, completedCount } =
    useTodos([
      { id: 1, text: "Learn React.memo", done: false },
      { id: 2, text: "Learn useMemo", done: false },
      { id: 3, text: "Learn useCallback", done: false },
    ]);

  const [showStats, setShowStats] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    addTodo(newTodo);
    setNewTodo("");
  };

  const progress = todos.length ? (completedCount / todos.length) * 100 : 0;
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Day15- React Memo Use memo practice</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          placeholder="Add new Todo"
          style={{ padding: "5px", width: "200px" }}
        />
        <button
          onClick={handleAddTodo}
          style={{ marginLeft: "5px", padding: "5px" }}
        >
          Add Todo
        </button>
      </div>

      <div
        style={{
          marginBottom: "10px",
          width: "200px",
          background: "#eee",
          height: "10px",
        }}
      >
        <div
          style={{ width: `${progress}%`, height: "100%", background: "green" }}
        />
      </div>

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />

      <div style={{ marginTop: "10px" }}>
        <p>Total Todos: {todos.length}</p>
        <p>Completed Tods: {completedCount}</p>
      </div>

      <button
        onClick={() => setShowStats(!showStats)}
        style={{ marginTop: "10px", padding: "5px" }}
      >
        {showStats ? "Hide" : "Show "}Lazy Stats Panel
      </button>

      {showStats && (
        <Suspense fallback={<p>Loading stats....</p>}>
          <LazyStats
            totalTodos={todos.length}
            completedTodos={completedCount}
          />
        </Suspense>
      )}
    </div>
  );
}



// import { useEffect, useState } from "react";

// function App() {
//   const [username, setUsername] = useState("");
//   const [searchUser, setSearchUser] = useState("");

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!searchUser) return;
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       setData(null);
//       try {
//         const res = await fetch(`https://api.github.com/users/${searchUser}`);
//         if (!res.ok) throw new Error("User Not Found");
//         const result = await res.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [searchUser]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (username.trim() === "") return;
//     setSearchUser(username.trim());
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>GitHub User Finder</h1>
//       <form onSubmit={handleSearch}>
//         <input
//           style={{ borderRadius: "10px", padding: "10px 8px" }}
//           type="text"
//           placeholder="Enter GitHub username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button
//           style={{
//             padding: "5px 8px",
//             borderRadius: "10px",
//             borderColor: "red",
//             color: "green",
//           }}
//           type="submit"
//         >
//           Search
//         </button>
//       </form>

//       {loading && <p>Loading...</p>}

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {data && (
//         <div style={{ marginTop: "20px" }}>
//           <img
//             src={data.avatar_url}
//             alt={data.login}
//             width="150"
//             style={{ borderRadius: "50%" }}
//           />
//           <h2>{data.name || data.login}</h2>
//           <p>{data.bio}</p>
//           <p>
//             <b>Followers:</b> {data.followers}
//           </p>
//           <p>
//             <b>Following:</b> {data.following}
//           </p>
//           <a
//             href={data.html_url}
//             target="_blank"
//             rel="noreferrer"
//             style={{ color: "blue" }}
//           >
//             View Profile
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// // import { useEffect, useState } from "react";

// // function App() {
// //   const [username, setUsername] = useState(""); // input field
// //   const [searchUser, setSearchUser] = useState(""); // user to actually search
// //   const [data, setData] = useState(null); // API data
// //   const [loading, setLoading] = useState(false); // loading state
// //   const [error, setError] = useState(null); // error state

// //   // Fetch user data from GitHub API when searchUser changes
// //   useEffect(() => {
// //     if (!searchUser) return; // skip fetch if nothing is searched yet

// //     const fetchData = async () => {
// //       setLoading(true);
// //       setError(null);
// //       setData(null);

// //       try {
// //         const res = await fetch(`https://api.github.com/users/${searchUser}`);
// //         if (!res.ok) throw new Error("User Not Found");
// //         const result = await res.json();
// //         setData(result);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [searchUser]); // runs when searchUser changes

// //   // Handle search button click
// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     if (username.trim() === "") {
// //       setError("Please enter a username");
// //       return;
// //     }
// //     setSearchUser(username.trim()); // update searchUser to trigger useEffect
// //   };

// //   return (
// //     <div style={{ textAlign: "center", padding: "20px" }}>
// //       <h1>GitHub User Finder</h1>

// //       {/* Search Form */}
// //       <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
// //         <input
// //           type="text"
// //           placeholder="Enter GitHub username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           style={{
// //             padding: "8px",
// //             fontSize: "16px",
// //             marginRight: "10px",
// //             borderRadius: "5px",
// //             border: "1px solid #ccc",
// //           }}
// //         />
// //         <button
// //           type="submit"
// //           style={{
// //             padding: "8px 16px",
// //             fontSize: "16px",
// //             borderRadius: "5px",
// //             border: "none",
// //             backgroundColor: "#24292f",
// //             color: "white",
// //             cursor: "pointer",
// //           }}
// //         >
// //           Search
// //         </button>
// //       </form>

// //       {/* Loading */}
// //       {loading && <p>Loading...</p>}

// //       {/* Error */}
// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {/* Data */}
// //       {data && (
// //         <div>
// //           <img
// //             src={data.avatar_url}
// //             alt={data.login}
// //             width="150"
// //             style={{ borderRadius: "50%" }}
// //           />
// //           <h2>{data.name || data.login}</h2>
// //           <p>{data.bio}</p>
// //           <p>Followers: {data.followers}</p>
// //           <p>Following: {data.following}</p>
// //           <a
// //             href={data.html_url}
// //             target="_blank"
// //             rel="noreferrer"
// //             style={{ color: "blue" }}
// //           >
// //             View Profile
// //           </a>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;

// // // -----------------------------------

// // import React from "react";
// // import {
// //   BrowserRouter,
// //   Routes,
// //   Route,
// //   Link,
// //   NavLink,
// //   Outlet,
// //   useParams,
// //   useNavigate,
// //   useSearchParams,
// // } from "react-router-dom";
// // import "./App.css";

// // export default function App() {
// //   const Home = () => {
// //     const navigate = useNavigate();
// //     return (
// //       <div className="page">
// //         <h1>Home page</h1>
// //         <p>Welcome to my world</p>
// //         <button className="btn" onClick={() => navigate("/about")}>
// //           Go To About
// //         </button>
// //       </div>
// //     );
// //   };

// //   const About = () => (
// //     <div className="page">
// //       <h1>About Page</h1>
// //       <nav className="subnav">
// //         <Link to="team">Team</Link>|<Link to="company"> Company</Link>
// //       </nav>
// //       <Outlet />
// //     </div>
// //   );

// //   const Team = () => (
// //     <div>
// //       <h2>Our Team</h2>
// //       <p>Meet our awesome developers</p>
// //     </div>
// //   );
// //   const Company = ()=> (
// //     <div>
// //       <h2>Our Company</h2>
// //       <p>We deliver cutting-edge software solutions...</p>
// //     </div>
// //   );

// //   const Services = () => {
// //   const services = [
// //     { id: 1, name: "Web Development" },
// //     { id: 2, name: "Mobile Apps" },
// //     { id: 3, name: "Cloud Solutions" },
// //   ];

// //   const [searchParams] = useSearchParams();
// //   const filter = searchParams.get("filter");

// //   return (
// //     <div className="page">
// //       <h1>🛠 Services</h1>
// //       <p>Filter applied: {filter || "None"}</p>
// //       <div className="service-links">
// //         {services.map((s) => (
// //           <Link key={s.id} to={`${s.id}`}>
// //             {s.name}
// //           </Link>
// //         ))}
// //       </div>

// //       <Outlet />
// //     </div>
// //   );
// // };

// //   const ServiceDetail = ()=> {
// //     const {id} = useParams();
// //     return (
// //       <div className="detail">
// //         <h2>Service Detail</h2>
// //         <p>You are viewing service Id: {id}</p>
// //       </div>
// //     );
// //   };

// // const Contact = () => (
// //   <div className="page">
// //     <h1>Contact Page</h1>
// //     <p>Email: support@example.com</p>
// //   </div>
// // );

// // const NotFound = () => (
// //   <div className="page">
// //     <h1>404-Page Not Found</h1>
// //     <p>The Page you re looking for doesn't exist!!</p>
// //   </div>
// // );

// // return (
// //     <BrowserRouter>
// //       <nav className="navbar">
// //         <h2 className="logo"> React Router Demo</h2>
// //         <div className="links">
// //           <NavLink to="/" end>Home</NavLink>
// //           <NavLink to="/about">About</NavLink>
// //           <NavLink to="/services">Services</NavLink>
// //           <NavLink to="/contact">Contact</NavLink>
// //         </div>
// //       </nav>

// //       <div className="container">
// //         <Routes>
// //           <Route path="/" element={<Home />} />

// //           <Route path="/about" element={<About />}>
// //             <Route path="team" element={<Team />} />
// //             <Route path="company" element={<Company />} />
// //           </Route>

// //           <Route path="/services" element={<Services />}>
// //             <Route path=":id" element={<ServiceDetail />} />
// //           </Route>

// //           <Route path="/contact" element={<Contact />} />

// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </div>
// //     </BrowserRouter>
// //   );
// // }

// // ------------------------------------------

// // import React, {
// //   useState,
// //   useReducer,
// //   useRef,
// //   // useEffect,
// //   createContext,
// //   useContext,
// // } from "react";
// // import "./App.css";

// // // ========== Theme Context ==========
// // const ThemeContext = createContext();

// // function ThemeProvider({ children }) {
// //   const [darkMode, setDarkMode] = useState(false);
// //   const toggleTheme = () => setDarkMode(!darkMode);
// //   return (
// //     <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // }

// // function useTheme() {
// //   return useContext(ThemeContext);
// // }

// // // ========== Counter ==========
// // function Counter() {
// //   const [count, setCount] = useState(0);
// //   return (
// //     <div className="card">
// //       <h2>Counter App</h2>
// //       <p>{count}</p>
// //       <button onClick={() => setCount(count + 1)}>+1</button>
// //       <button onClick={() => setCount(count - 1)}>-1</button>
// //       <button onClick={() => setCount(0)}>Reset</button>
// //     </div>
// //   );
// // }

// // // ========== Todo ==========
// // const todoReducer = (state, action) => {
// //   switch (action.type) {
// //     case "ADD":
// //       return [...state, { id: Date.now(), text: action.payload }];
// //     case "REMOVE":
// //       return state.filter((todo) => todo.id !== action.payload);
// //     default:
// //       return state;
// //   }
// // };

// // function Todo() {
// //   const [todos, dispatch] = useReducer(todoReducer, []);
// //   const [input, setInput] = useState("");

// //   const handleAdd = () => {
// //     if (input.trim()) {
// //       dispatch({ type: "ADD", payload: input });
// //       setInput("");
// //     }
// //   };

// //   return (
// //     <div className="card">
// //       <h2>Todo App</h2>
// //       <input
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //         placeholder="Enter todo"
// //       />
// //       <button onClick={handleAdd}>Add</button>
// //       <ul>
// //         {todos.map((t) => (
// //           <li key={t.id}>
// //             {t.text}{" "}
// //             <button onClick={() => dispatch({ type: "REMOVE", payload: t.id })}>
// //               X
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // // ========== User List ==========
// // function UserList() {
// //   const [users, setUsers] = useState(["Alice", "Bob"]);
// //   const [input, setInput] = useState("");

// //   const addUser = () => {
// //     if (input.trim()) {
// //       setUsers([...users, input]);
// //       setInput("");
// //     }
// //   };

// //   const removeUser = (name) => setUsers(users.filter((u) => u !== name));

// //   return (
// //     <div className="card">
// //       <h2>User List</h2>
// //       <input
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //         placeholder="Add user"
// //       />
// //       <button onClick={addUser}>Add</button>
// //       <ul>
// //         {users.map((u) => (
// //           <li key={u}>
// //             {u} <button onClick={() => removeUser(u)}>X</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // // ========== Stopwatch ==========
// // function Stopwatch() {
// //   const [time, setTime] = useState(0);
// //   const intervalRef = useRef(null);

// //   const start = () => {
// //     if (!intervalRef.current) {
// //       intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
// //     }
// //   };

// //   const stop = () => {
// //     clearInterval(intervalRef.current);
// //     intervalRef.current = null;
// //   };

// //   const reset = () => {
// //     stop();
// //     setTime(0);
// //   };

// //   return (
// //     <div className="card">
// //       <h2>Stopwatch</h2>
// //       <p>{time}s</p>
// //       <button onClick={start}>Start</button>
// //       <button onClick={stop}>Stop</button>
// //       <button onClick={reset}>Reset</button>
// //     </div>
// //   );
// // }

// // // ========== Form Handling ==========
// // function Form() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [success, setSuccess] = useState("");

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     setErrors({ ...errors, [e.target.name]: "" });
// //     setSuccess("");
// //   };

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!formData.name.trim()) newErrors.name = "Name required";
// //     if (!formData.email.trim()) newErrors.email = "Email required";
// //     else if (!/\S+@\S+\.\S+/.test(formData.email))
// //       newErrors.email = "Email invalid";
// //     if (!formData.password) newErrors.password = "Password required";
// //     else if (formData.password.length < 6) newErrors.password = "Min 6 chars";
// //     if (formData.confirmPassword !== formData.password)
// //       newErrors.confirmPassword = "Passwords do not match";
// //     return newErrors;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const val = validate();
// //     if (Object.keys(val).length > 0) setErrors(val);
// //     else {
// //       setErrors({});
// //       setSuccess("Form submitted successfully! 🎉");
// //       setFormData({ name: "", email: "", password: "", confirmPassword: "" });
// //     }
// //   };

// //   return (
// //     <div className="card">
// //       <h2>Registration Form</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           name="name"
// //           placeholder="Name"
// //           value={formData.name}
// //           onChange={handleChange}
// //         />
// //         {errors.name && <span className="error">{errors.name}</span>}
// //         <input
// //           name="email"
// //           placeholder="Email"
// //           value={formData.email}
// //           onChange={handleChange}
// //         />
// //         {errors.email && <span className="error">{errors.email}</span>}
// //         <input
// //           name="password"
// //           type="password"
// //           placeholder="Password"
// //           value={formData.password}
// //           onChange={handleChange}
// //         />
// //         {errors.password && <span className="error">{errors.password}</span>}
// //         <input
// //           name="confirmPassword"
// //           type="password"
// //           placeholder="Confirm Password"
// //           value={formData.confirmPassword}
// //           onChange={handleChange}
// //         />
// //         {errors.confirmPassword && (
// //           <span className="error">{errors.confirmPassword}</span>
// //         )}
// //         <button type="submit">Submit</button>
// //       </form>
// //       {success && <p className="success">{success}</p>}
// //     </div>
// //   );
// // }

// // // ========== App ==========
// // function App() {
// //   const [activeTab, setActiveTab] = useState("counter");
// //   const { darkMode, toggleTheme } = useTheme();

// //   return (
// //     <div className={darkMode ? "app dark" : "app"}>
// //       <header>
// //         <h1>React Mega SPA</h1>
// //         <button onClick={toggleTheme}>
// //           {darkMode ? "Light Mode" : "Dark Mode"}
// //         </button>
// //       </header>
// //       <nav>
// //         <button onClick={() => setActiveTab("counter")}>Counter</button>
// //         <button onClick={() => setActiveTab("todo")}>Todo</button>
// //         <button onClick={() => setActiveTab("userlist")}>User List</button>
// //         <button onClick={() => setActiveTab("stopwatch")}>Stopwatch</button>
// //         <button onClick={() => setActiveTab("form")}>Form</button>
// //       </nav>
// //       <main>
// //         {activeTab === "counter" && <Counter />}
// //         {activeTab === "todo" && <Todo />}
// //         {activeTab === "userlist" && <UserList />}
// //         {activeTab === "stopwatch" && <Stopwatch />}
// //         {activeTab === "form" && <Form />}
// //       </main>
// //     </div>
// //   );
// // }

// // // ========== Wrap with ThemeProvider ==========
// // export default function WrappedApp() {
// //   return (
// //     <ThemeProvider>
// //       <App />
// //     </ThemeProvider>
// //   );
// // }
