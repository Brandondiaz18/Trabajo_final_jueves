import React, {useState} from "react";

export default function TodoForm({onAdd}){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if(!title.trim()) return alert("El título es obligatorio");
    await onAdd({title, description});
    setTitle(""); setDescription("");
  };

  return (
    <form onSubmit={submit} style={{marginBottom:16}}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" required />
      <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descripción (opcional)" />
      <button type="submit">Crear</button>
    </form>
  );
}
