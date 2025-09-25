// Card.jsx
function Card({ user, children }) {
  return (
    <div style={{ border: "2px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>Name: {user.name}</h3>
      <p>Mail: {user.email}</p>
      <p>City : {user.city}</p>

      {/* children => yaha Button inject hota hai */}
      {children}
    </div>
  );
}

export default Card;
