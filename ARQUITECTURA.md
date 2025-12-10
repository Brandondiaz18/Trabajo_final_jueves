
---

### `ARQUITECTURA.md`
```markdown
# Arquitectura - Todo List

## Diagrama (conceptual)
Usuario (Browser) -> Frontend (Vercel) -> Backend API (Render) -> DB MongoDB (Railway)

## Componentes
- Frontend: interfaz, llama a /api endpoints.
- Backend: FastAPI, expone endpoints CRUD, maneja validación y persistencia.
- Database: MongoDB en Railway.

## Flujo "Crear tarea"
1. Usuario completa formulario en frontend y envía.
2. Frontend POST /api/todos con payload.
3. Backend recibe payload, valida, crea documento en MongoDB.
4. Backend retorna el documento creado con id.
5. Frontend actualiza UI.

## CI
- GitHub Actions: on push/PR → build frontend (npm run build) y verificar backend (import)
