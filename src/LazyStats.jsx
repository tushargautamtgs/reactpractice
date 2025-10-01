import React from "react";

export default function LazyStats({ totalTodos, completedTodos }) {
  return (
    <div
      style={{
        border: "2px solid purple",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>Lazy Stats Panel</h3>
      <p>Total Todos: {totalTodos}</p>
      <p>Completed Todos: {completedTodos}</p>
      <p>This component is loaded lazily!</p>
    </div>
  );
}
