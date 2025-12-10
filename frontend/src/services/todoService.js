const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function handleResponse(res){
  if(!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error en la petición");
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function listTodos(){
  const res = await fetch(`${API}/todos/`);
  return handleResponse(res);
}

export async function createTodo(payload){
  const res = await fetch(`${API}/todos/`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function updateTodo(id, payload){
  const res = await fetch(`${API}/todos/${id}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function deleteTodo(id){
  const res = await fetch(`${API}/todos/${id}`, {
    method: "DELETE"
  });
  return handleResponse(res);
}
