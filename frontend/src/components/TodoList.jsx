import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({todos = [], onToggle, onDelete, onEdit}){
  if(todos.length === 0) return <p>No hay tareas</p>;
  return (
    <div>
      {todos.map(t => (
        <TodoItem key={t._id} todo={t} onToggle={()=>onToggle(t)} onDelete={()=>onDelete(t._id)} onEdit={(patch)=>onEdit(t._id, patch)} />
      ))}
    </div>
  );
}
