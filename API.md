# API - Todo List

Base: <BASE_URL>/api

## GET /api/todos
Listar todas las tareas.
Response 200: [ { _id, title, description, status, created_at } ]

## POST /api/todos
Crear una tarea.
Body:
{
  "title": "string (requerido)",
  "description": "string (opcional)"
}
Response 201: { _id, title, description, status, created_at }

## GET /api/todos/{id}
Obtener tarea por id.
Response 200: { ... }
Response 404: { "detail": "Todo not found" }

## PUT /api/todos/{id}
Actualizar tarea.
Body (parcial):
{
  "title": "opcional",
  "description": "opcional",
  "status": "pending|completed"
}
Response 200: { ... }

## DELETE /api/todos/{id}
Eliminar tarea.
Response 204: no content
Response 404: { "detail": "Todo not found" }
