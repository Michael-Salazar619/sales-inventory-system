# Guia paso a paso

## 1. Inicializar el proyecto

```bash
cd sistema-ventas-inventario
git init
```

## 2. Levantar todo con Docker

```bash
docker compose up --build
```

Esto crea PostgreSQL, backend y frontend.

## 3. Probar backend

Abre:

- http://localhost:4000/health
- http://localhost:4000/api/docs

Login en Postman:

```http
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "admin@demo.com",
  "password": "Admin123!"
}
```

## 4. Probar frontend

Abre http://localhost:5173 e ingresa con:

```txt
admin@demo.com
Admin123!
```

## 5. Flujo recomendado de desarrollo

1. Completar CRUD de categorias y proveedores.
2. Agregar formulario modal para crear productos.
3. Mejorar carrito de ventas con multiples productos.
4. Persistir refresh tokens en base de datos.
5. Agregar envio real de email para recuperar contrasena.
6. Agregar tests de auth, productos y ventas.
7. Subir a GitHub.
8. Desplegar frontend en Vercel.
9. Desplegar backend en Render.
10. Crear base PostgreSQL en Supabase.

## 6. Deploy en Vercel

Variables:

```txt
VITE_API_URL=https://tu-backend.onrender.com/api
VITE_SOCKET_URL=https://tu-backend.onrender.com
```

## 7. Deploy en Render

Variables:

```txt
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
CLIENT_URL=https://tu-frontend.vercel.app
```

## 8. Supabase PostgreSQL

Ejecuta en SQL Editor:

1. `backend/sql/schema.sql`
2. `backend/sql/seed.sql`

## 9. Commits profesionales

```bash
git add .
git commit -m "feat: create backend auth module"
git commit -m "feat: add inventory dashboard"
git commit -m "chore: configure docker environment"
```
