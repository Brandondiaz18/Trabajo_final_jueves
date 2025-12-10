# Todo List Fullstack - FastAPI + React (Vite) + MongoDB (Railway)

## Resumen
Aplicación Todo List fullstack con CRUD, desplegada en Vercel (frontend) y Render (backend). Base de datos en Railway (MongoDB). CI con GitHub Actions.

## Stack
- Frontend: React + Vite
- Backend: FastAPI (Python)
- DB: MongoDB (Railway)
- CI/CD: GitHub Actions
- Deploy: Vercel (frontend), Render (backend), Railway (DB)

## Ejecutar localmente

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# configurar .env (usar .env.example)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
