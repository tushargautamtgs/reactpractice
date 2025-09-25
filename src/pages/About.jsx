import { Outlet, Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>About Page 📖</h1>
      <nav>
        <Link to="team">Our Team</Link> |{" "}
        <Link to="company">Our Company</Link>
      </nav>



      <Outlet />
    </div>
  );
}
