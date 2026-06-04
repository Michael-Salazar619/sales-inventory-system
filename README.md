# Sistema Empresarial de Ventas e Inventario Inteligente

Proyecto full stack profesional para portafolio: React + Node.js + Express + PostgreSQL + JWT + Socket.io + Swagger + Docker.

## Demo local

Despues de levantar el proyecto con Docker, abre:

- Frontend: http://localhost:5173
- API: http://localhost:4000
- Swagger: http://localhost:4000/api/docs

### Credenciales de prueba

Estas credenciales son usuarios demo para evaluar el sistema localmente:

| Rol | Correo | Contrasena |
| --- | --- | --- |
| Admin | admin@demo.com | Admin123! |
| Supervisor | supervisor@demo.com | Admin123! |
| Empleado | empleado@demo.com | Admin123! |

> Nota: estas credenciales son solo para ambiente demo/local. En produccion se deben reemplazar por usuarios reales y secretos seguros.

## Modulos

- Autenticacion con JWT, refresh token, bcrypt y roles.
- Dashboard administrativo con metricas.
- Inventario con productos, categorias, proveedores y stock bajo.
- Ventas con detalle, IVA, descuentos y actualizacion de stock.
- Chat y notificaciones en tiempo real con Socket.io.
- Reportes PDF y Excel.
- Seguridad con Helmet, CORS seguro, rate limit, validaciones, consultas SQL parametrizadas y errores centralizados.
- Documentacion Swagger.

## Estructura

```txt
backend/
  src/
    config/
    controllers/
    middlewares/
    repositories/
    routes/
    services/
    sockets/
    utils/
    validators/
  sql/
frontend/
  src/
    components/
    context/
    layouts/
    pages/
    routes/
    services/
```

## Instalacion rapida con Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Swagger: http://localhost:4000/api/docs

## Instalacion manual

```bash
cd backend
cp .env.example .env
npm install
npm run db:init
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

## Deploy recomendado

- Frontend: Vercel, configurar `VITE_API_URL` con la URL del backend.
- Backend: Render, configurar variables `.env`.
- PostgreSQL: Supabase, ejecutar `backend/sql/schema.sql` y `backend/sql/seed.sql`.

## Comandos Git sugeridos

```bash
git init
git add .
git commit -m "feat: scaffold enterprise sales inventory system"
git branch -M main
git remote add origin https://github.com/usuario/sistema-ventas-inventario.git
git push -u origin main
```
