# Consultorio Médico - MVP

Sistema de gestión de consultorio médico construido con Next.js, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- ✅ Autenticación con Supabase (Login y Signup)
- ✅ Gestión de doctores
- ✅ Gestión de pacientes
- ✅ Sistema de citas médicas
- ✅ Interfaz moderna con diseño glassmorphism
- ✅ Dark mode support

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd proyecto
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env.local` en la raíz del proyecto:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
```

4. Configura la base de datos:
Ejecuta los scripts SQL del archivo `doc/mvp_consultorio_medico_supabase.md` en el SQL Editor de Supabase.

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
proyecto/
├── app/                    # Páginas y rutas de Next.js
│   ├── login/             # Página de inicio de sesión
│   ├── signup/            # Página de registro
│   └── page.tsx           # Página principal
├── lib/
│   └── supabase/          # Clientes y helpers de Supabase
│       ├── client.ts      # Cliente para componentes del cliente
│       ├── server.ts      # Cliente para Server Components
│       ├── middleware.ts # Utilidades para middleware
│       └── queries.ts     # Funciones CRUD
├── doc/                   # Documentación
└── middleware.ts          # Middleware de autenticación
```

## 🗄️ Base de Datos

El proyecto utiliza 3 tablas principales:
- `doctor` - Información de doctores
- `paciente` - Información de pacientes
- `citas` - Gestión de citas médicas

Ver `doc/mvp_consultorio_medico_supabase.md` para más detalles.

## 🚀 Despliegue en Vercel

1. Sube tu código a GitHub
2. Ve a [Vercel](https://vercel.com) e inicia sesión
3. Importa tu repositorio de GitHub
4. Agrega las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Haz clic en "Deploy"

Vercel detectará automáticamente que es un proyecto Next.js y lo configurará.

## 📚 Documentación Adicional

- [Configuración de Supabase](./SUPABASE_SETUP.md)
- [Documentación del MVP](./doc/mvp_consultorio_medico_supabase.md)

## 🛠️ Tecnologías

- [Next.js](https://nextjs.org) - Framework de React
- [TypeScript](https://www.typescriptlang.org) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com) - Estilos
- [Supabase](https://supabase.com) - Backend y autenticación

## 📝 Licencia

Este proyecto es un MVP de código abierto.
