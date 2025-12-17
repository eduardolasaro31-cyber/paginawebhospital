# Guía de Despliegue a Netlify

Esta guía te ayudará a subir tu aplicación a **Netlify**.

## 1. 📤 Subir cambios a GitHub

Antes de desplegar, asegúrate de que tu código más reciente esté en GitHub.

Abre tu terminal y ejecuta:

```bash
git add .
git commit -m "Preparando para Netlify"
git push origin main
```

## 2. 🌐 Configurar en Netlify

1. Inicia sesión en [Netlify](https://app.netlify.com/).
2. En tu Dashboard, haz clic en **"Add new site"** > **"Import an existing project"**.
3. Selecciona **GitHub**.
4. Autoriza a Netlify si te lo pide y selecciona tu repositorio: `paginawebhospital`.

## 3. ⚙️ Configuración del Build

Netlify detectará automáticamente que es un proyecto de Next.js.

- **Base directory:** (Déjalo vacío)
- **Build command:** `npm run build`
- **Publish directory:** `.next` (o lo que salga por defecto, Netlify lo ajustará con su plugin).

> **Nota:** Netlify instalará automáticamente el plugin "Next.js Runtime" que es necesario para que funcione.

## 4. 🔑 Variables de Entorno (Environment Variables)

Este paso es **CRUCIAL**. Tu app fallará si no pones las claves de Supabase.

1. En la pantalla de configuración (antes de darle a Deploy) haz clic en **"Add environment variables"** (o ve a *Site settings > Environment variables* después).
2. Agrega las siguientes claves (cópialas de tu archivo `.env.local`):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | *Tu URL de Supabase* |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *Tu clave Anon de Supabase* |

## 5. 🚀 Desplegar

1. Haz clic en **"Deploy site"**.
2. Netlify empezará a construir tu sitio. Esto puede tardar unos minutos.
3. Una vez termine, verás una URL verde (ej. `https://peaceful-name-12345.netlify.app`).

## 6. 🛠 Solución de Problemas Comunes

- **Error de Build:** Si falla el build, revisa los logs. A veces es por errores de TypeScript (`npm run lint` fallando). Si quieres ignorarlos (no recomendado pero rápido), puedes cambiar el build command a `CI=false npm run build`.
- **Página 404/Errores en rutas:** Asegúrate de que las variables de entorno estén bien escritas.
