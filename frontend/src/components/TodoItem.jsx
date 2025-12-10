import React, {useState} from "react";

export default function TodoItem({todo, onToggle, onDelete, onEdit}){
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const save = () => {
    if(!title.trim()) return alert("El título es obligatorio");
    onEdit({title, description});
    setEditing(false);
  };

  return (
    <div style={{border:"1px solid #ddd", padding:8, marginBottom:8}}>
      {editing ? (
        <>
          <input value={title} onChange={e=>setTitle(e.target.value)} />
          <input value={description} onChange={e=>setDescription(e.target.value)} />
          <button onClick={save}>Guardar</button>
          <button onClick={()=>setEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3 style={{textDecoration: todo.status === "completed" ? "line-through" : "none"}}>{todo.title}</h3>
          {todo.description && <p>{todo.description}</p>}
          <small>{new Date(todo.created_at).toLocaleString()}</small>
          <div>
            <button onClick={onToggle}>{todo.status === "pending" ? "Marcar completada" : "Marcar pendiente"}</button>
            <button onClick={()=>setEditing(true)}>Editar</button>
            <button onClick={onDelete}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
}
