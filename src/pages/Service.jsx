import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Mobile Apps" },
    { id: 3, name: "Cloud Solutions" },
  ];

  return (
    <div>
      <h1>🛠 Services</h1>
      <ul>
        {services.map((s) => (
          <li key={s.id}>
            <Link to={`/services/${s.id}`}>{s.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
