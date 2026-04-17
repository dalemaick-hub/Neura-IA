# NEURA IA — Guía de configuración completa

## Archivos modificados en esta actualización

| Archivo | Cambio |
|---|---|
| `src/supabase.js` | API key movida a variables de entorno |
| `src/App.jsx` | Envuelto con `AuthProvider`, `/chat` protegida con `PrivateRoute` |
| `src/context/AuthContext.jsx` | **NUEVO** — Gestión global de sesión |
| `src/components/PrivateRoute.jsx` | **NUEVO** — Protege rutas que requieren login |
| `src/components/Navbar.jsx` | Avatar de usuario, menú de cuenta, botón "Cerrar sesión" |
| `src/pages/SignInPage.jsx` | Login completo con email/password + Google OAuth |
| `src/pages/ChatPage.jsx` | sessionId vinculado al usuario real |
| `src/services/chatStorage.js` | Historial por userId (no se mezclan entre usuarios) |
| `index.html` | Material Symbols con `display=optional` (no bloquea render) |
| `.env.example` | Variables de entorno actualizadas y documentadas |
| `supabase_setup.sql` | Script SQL listo para ejecutar en Supabase |

---

## Paso 1 — Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) → **New project**
2. En el **SQL Editor**, ejecuta el contenido de `supabase_setup.sql`
3. Ve a **Authentication → Providers** y asegúrate que **Email** esté activado
4. (Opcional) Para Google OAuth: activa **Google** y añade tu Client ID y Secret de Google Cloud Console

## Paso 2 — Crear el archivo .env

Copia `.env.example` a `.env` y rellena tus datos:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_publica        # Panel Supabase → Settings → API → anon key
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_KEY=tu_service_role_key           # SOLO en backend, nunca en frontend
OPENAI_API_KEY=tu_clave_de_openai
```

> **IMPORTANTE**: `VITE_SUPABASE_ANON_KEY` es la llave pública (anon). 
> `SUPABASE_SERVICE_KEY` es la service_role — NUNCA la pongas en variables `VITE_*`.

## Paso 3 — Instalar dependencias y ejecutar

```bash
npm install
npm run dev          # Frontend en :5173
npm run dev:server   # Backend en :3000 (en otra terminal)
```

---

## Cómo funciona el login

1. Usuario va a `/signin` → se registra o inicia sesión
2. `AuthContext` escucha el cambio de sesión globalmente
3. Navbar muestra avatar + menú de usuario si hay sesión activa
4. `/chat` está protegida — sin sesión redirige a `/signin`
5. Al loguearse en `/signin`, redirige automáticamente al destino original
6. El historial de chat se guarda en localStorage con el `user.id` como namespace

---

## Seguridad implementada

- API keys en variables de entorno, nunca en el código fuente
- Row Level Security activado en Supabase (cada usuario solo ve sus datos)
- PrivateRoute protege todas las rutas que requieren autenticación
- La `service_role` key solo está en el servidor, nunca en el frontend
