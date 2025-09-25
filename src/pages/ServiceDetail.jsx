import { useParams } from "react-router-dom";

export default function ServiceDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2>🔎 Service Details</h2>
      <p>You are viewing details for service ID: {id}</p>
    </div>
  );
}
