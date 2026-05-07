# Floristeria Frontend

React + Vite

## Intalación

Es necesario tener Node.js

```
npm install
```

para pruebas
```
npm run dev
```

## Produccion

`.env.production` usa `VITE_API_URL=/api`.

Eso obliga a que Nginx publique el frontend y reenvie `/api/*` al backend Laravel. Si no existe ese proxy, o apunta a una instancia antigua del backend, el navegador pedira bien `/api/...` pero Laravel respondera `404`.

## Diagnostico de crear y editar

Si el listado carga pero crear o editar no:

- El frontend necesita `GET /api/contratos/entregas` y `GET /api/contratos/reservas` para pintar los formularios.
- Guardar usa `POST /api/entregas` y `POST /api/reservas`.
- Editar usa `PUT /api/entregas/{id}` y `PUT /api/reservas/{id}`.

En el servidor conviene comprobar:

```bash
php artisan optimize:clear
php artisan route:list --path=api
```

Si el formulario se queda cargando o muestra error al abrirse, normalmente el backend desplegado no tiene las rutas `/api/contratos/*` o Nginx esta apuntando a otra instancia.

Si el formulario abre pero guardar falla, revisa permisos de escritura de SQLite (`database.sqlite` y su carpeta), `storage/` y `bootstrap/cache/`.
