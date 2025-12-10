import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import * as todoService from "../services/todoService";

export default function Home(){
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try{
      const data = await todoService.listTodos();
      setTodos(data);
    }catch(e){
      setError("Error cargando tareas");
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{ load() }, []);

  const add = async (payload) => {
    const created = await todoService.createTodo(payload);
    setTodos(prev => [created, ...prev]);
  };

  const update = async (id, patch) => {
    const updated = await todoService.updateTodo(id, patch);
    setTodos(prev => prev.map(t => t._id === id ? updated : t));
  };

  const remove = async (id) => {
    await todoService.deleteTodo(id);
    setTodos(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div>
      <TodoForm onAdd={add} />
      {loading && <p>Cargando...</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
      <TodoList todos={todos} onToggle={(t)=> update(t._id,{ status: t.status === "pending" ? "completed" : "pending" })} onDelete={remove} onEdit={(id,patch)=> update(id,patch)} />
    </div>
  );
}
