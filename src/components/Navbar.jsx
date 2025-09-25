import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" end>Home</NavLink>
     <NavLink // make navlink stylish without add css file this is for small projects
  to="/about"
  style={({ isActive }) => ({
    color: isActive ? "white" : "gray",
    background: isActive ? "blue" : "transparent",
    padding: "6px 10px",
    borderRadius: "6px",
  })}
>
  About
</NavLink>

      <NavLink to="/contact"
      style={({isActive})=> ({
        color: isActive ? "white": "gray",
        background: isActive ? "blue" : "transparent",
        padding: "6px 10px",
        borderRadius: "6px",
      })}

      >Contact</NavLink>
    </nav>
  );
}
