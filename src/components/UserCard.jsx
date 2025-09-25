function UserCard({user}) {
  return (
    <div style={{border: "2px solid #ccc",padding: "10px",margin:"10px"}}>
      <h3 style={{color:"pink"}}>{user.name}</h3>
      {user.email && <p>Email : {user.email}</p>}   
      <p>Age: {user.age}</p>
      {user.city && <p>City: {user.city}</p>}     
    </div>
  );
}


// export default UserCard;




// function UserCard({ user }) {
//   return (
//     <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
//       <h3>{user.name}</h3>
//       <p>Email: {user.email}</p>
//       <p>Age: {user.age}</p>
//       <p>City: {user.city}</p>
//     </div>
//   );
// }

export default UserCard;

