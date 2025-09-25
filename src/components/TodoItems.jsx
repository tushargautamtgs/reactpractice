function TodoItem({todo, toggleTodo,deleteTodo}){
  return (
    <li style={{margin: "10px 0"}}>
      <span
      onClick={()=> toggleTodo(todo.id)}
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        cursor:"pointer"
      }}
      >
        {todo.text}
      </span>
      <button onClick={()=> deleteTodo(todo.id)} style={{ marginLeft : "10px"}}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;