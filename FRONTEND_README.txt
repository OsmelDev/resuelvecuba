================================================================================
                    SERVICIOSAPP - DOCUMENTACIÓN FRONTEND
================================================================================

VERSIÓN: 1.0.0-MVP
FECHA: 2026-05-10
ESTADO: En desarrollo activo

================================================================================
                            1. DESCRIPCIÓN GENERAL
================================================================================

Frontend para la plataforma ServiciosApp, una aplicación que conecta proveedores
de servicios con clientes. Desarrollado con Next.js 14, proporciona una interfaz
moderna, responsiva y segura para tres tipos de usuarios:

- CLIENTES: Buscan y contratan servicios
- PROVEEDORES: Ofrecen servicios y gestionan citas
- ADMINISTRADORES: Gestionan la plataforma

================================================================================
                          2. TECNOLOGÍAS UTILIZADAS
================================================================================

| Tecnología      | Versión    | Propósito                        |
|----------------|------------|----------------------------------|
| Next.js        | 14.2.5     | Framework React con SSR          |
| React          | 18.2.0     | Librería de UI                   |
| TypeScript     | 5.3.3      | Tipado estático                  |
| Tailwind CSS   | 3.4.1      | Estilos y diseño responsivo      |
| Zustand        | 4.5.2      | Manejo de estado global          |
| Axios          | 1.7.2      | Cliente HTTP para API            |
| Lucide React   | 0.363.0    | Biblioteca de iconos             |
| React Hook Form| 7.51.5     | Manejo de formularios            |
| Zod            | 3.22.4     | Validación de datos              |

================================================================================
                        3. ESTRUCTURA DEL PROYECTO
================================================================================

frontend/
├── app/                               # Directorio principal Next.js 14
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.tsx               # Panel de administración
│   │
│   ├── cliente/
│   │   └── dashboard/
│   │       └── page.tsx               # Panel de cliente
│   │
│   ├── proveedor/
│   │   ├── dashboard/
│   │   │   └── page.tsx               # Panel de proveedor
│   │   └── espera-activacion/
│   │       └── page.tsx               # Pantalla de espera
│   │
│   ├── login/
│   │   └── page.tsx                   # Inicio de sesión
│   │
│   ├── register/
│   │   └── page.tsx                   # Registro de usuarios
│   │
│   ├── components/
│   │   ├── ClientLayout.tsx           # Layout con autenticación
│   │   └── layout/
│   │       └── Navbar.tsx             # Barra de navegación
│   │
│   ├── services/
│   │   └── api.ts                     # Cliente Axios configurado
│   │
│   ├── store/
│   │   └── authStore.ts               # Estado de autenticación
│   │
│   ├── globals.css                    # Estilos globales Tailwind
│   ├── layout.tsx                     # Layout raíz de la app
│   └── page.tsx                       # Página de inicio (landing)
│
├── public/                            # Archivos estáticos
├── .env.local                         # Variables de entorno (local)
├── .env.production                    # Variables de entorno (prod)
├── .gitignore                         # Archivos excluidos de Git
├── Dockerfile                         # Configuración de Docker
├── next.config.js                     # Configuración de Next.js
├── tailwind.config.js                 # Configuración de Tailwind
├── postcss.config.js                  # Configuración de PostCSS
├── package.json                       # Dependencias y scripts
└── README.md                          # Documentación

================================================================================
                      4. INSTALACIÓN Y CONFIGURACIÓN
================================================================================

REQUISITOS PREVIOS:
--------------------
- Node.js 18 o superior
- Backend en ejecución (http://localhost:3001)
- npm o yarn como gestor de paquetes

PASOS DE INSTALACIÓN:
--------------------

1. Clonar el repositorio:
   git clone <repositorio>
   cd frontend

2. Instalar dependencias:
   npm install

3. Crear archivo de entorno:
   cp .env.example .env.local

4. Configurar variables de entorno en .env.local:
   NEXT_PUBLIC_API_URL=http://localhost:3001/api

5. Ejecutar en modo desarrollo:
   npm run dev

6. Abrir el navegador en:
   http://localhost:3000

================================================================================
                       5. VARIABLES DE ENTORNO
================================================================================

DESARROLLO LOCAL (.env.local):
-------------------------------------------------------------------------------
NEXT_PUBLIC_API_URL=http://localhost:3001/api

PRODUCCIÓN (.env.production):
-------------------------------------------------------------------------------
NEXT_PUBLIC_API_URL=https://tudominio.com/api

DESCRIPCIÓN DE VARIABLES:
-------------------------------------------------------------------------------
| Variable               | Descripción                    | Requerida |
|------------------------|--------------------------------|-----------|
| NEXT_PUBLIC_API_URL    | URL del backend API            | SI        |

NOTA: Las variables con prefijo NEXT_PUBLIC_ son accesibles desde el navegador.
Nunca almacenes secretos o claves privadas con este prefijo.

================================================================================
                          6. ESTRUCTURA DE RUTAS
================================================================================

RUTAS PÚBLICAS (sin autenticación):
-------------------------------------------------------------------------------
| Ruta                   | Descripción                    |
|------------------------|--------------------------------|
| /                      | Página de inicio / landing     |
| /login                 | Inicio de sesión               |
| /register              | Registro de nuevos usuarios    |

RUTAS PROTEGIDAS (requieren autenticación):
-------------------------------------------------------------------------------
| Ruta                           | Rol requerido      | Descripción              |
|--------------------------------|--------------------|--------------------------|
| /cliente/dashboard             | cliente            | Panel del cliente        |
| /proveedor/dashboard           | proveedor          | Panel del proveedor      |
| /proveedor/espera-activacion   | proveedor          | Espera de activación     |
| /admin/dashboard               | admin              | Panel de administración  |

REDIRECCIONES AUTOMÁTICAS:
-------------------------------------------------------------------------------
- Usuario no autenticado → /login
- Usuario autenticado intenta acceder a ruta no autorizada → /
- Login exitoso según rol:
  * cliente → /cliente/dashboard
  * proveedor → /proveedor/dashboard
  * admin → /admin/dashboard

================================================================================
                      7. STORE DE ZUSTAND (authStore)
================================================================================

ESTADO:
-------------------------------------------------------------------------------
| Propiedad         | Tipo                    | Descripción                    |
|-------------------|-------------------------|--------------------------------|
| user              | User | null             | Datos del usuario autenticado  |
| isLoading         | boolean                 | Estado de carga inicial        |
| isAuthenticated   | boolean                 | Indica si hay sesión activa    |

INTERFAZ USER:
-------------------------------------------------------------------------------
{
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  role: 'cliente' | 'proveedor' | 'admin';
  activo: boolean;
  calificacion_promedio?: number;
}

ACCIONES:
-------------------------------------------------------------------------------
| Método                                    | Descripción                          |
|-------------------------------------------|--------------------------------------|
| login(email, password)                    | Inicia sesión y guarda token         |
| logout()                                  | Cierra sesión y limpia datos         |
| checkAuth()                               | Verifica token al cargar la app      |
| setUser(user)                             | Actualiza datos del usuario          |

EJEMPLO DE USO EN COMPONENTE:
-------------------------------------------------------------------------------
import { useAuthStore } from '@/store/authStore';

function MiComponente() {
  const { user, login, logout, isAuthenticated } = useAuthStore();

  const handleLogin = async () => {
    const result = await login('correo@test.com', 'password');
    if (result.success) {
      console.log('Login exitoso');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Bienvenido, {user?.nombre}</p>
      ) : (
        <button onClick={handleLogin}>Iniciar Sesión</button>
      )}
    </div>
  );
}

================================================================================
                       8. COMPONENTES PRINCIPALES
================================================================================

1. Navbar (app/components/layout/Navbar.tsx)
-------------------------------------------------------------------------------
Barra de navegación que muestra diferentes enlaces según el rol del usuario.

PROPS: Ninguna (usa authStore internamente)

CARACTERÍSTICAS:
- Muestra enlaces específicos por rol
- Botón de logout
- Nombre del usuario
- Enlace a panel correspondiente
- Enlace a espera de activación para proveedores inactivos

2. ClientLayout (app/components/ClientLayout.tsx)
-------------------------------------------------------------------------------
Layout que envuelve toda la aplicación e inicializa la autenticación.

CARACTERÍSTICAS:
- Llama a checkAuth() al cargar
- Muestra spinner de carga mientras verifica
- Renderiza Navbar y children

3. ProtectedRoute (implícito en layout)
-------------------------------------------------------------------------------
Protege rutas según el rol del usuario.

USO: (integrados en las rutas de App.tsx)
- Las rutas /cliente/* solo accesibles con rol 'cliente'
- Las rutas /proveedor/* solo accesibles con rol 'proveedor'
- Las rutas /admin/* solo accesibles con rol 'admin'

================================================================================
                          9. SERVICIOS API (api.ts)
================================================================================

CONFIGURACIÓN:
-------------------------------------------------------------------------------
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

INTERCEPTORES:
-------------------------------------------------------------------------------
REQUEST: Agrega token JWT automáticamente a los headers
RESPONSE: Maneja errores 401 (redirige a login)

EJEMPLOS DE USO:
-------------------------------------------------------------------------------
import api from '@/services/api';

// GET request
const response = await api.get('/auth/verify');

// POST request
const response = await api.post('/auth/login', { email, password });

// PUT request
const response = await api.put('/users/123', { nombre: 'Nuevo' });

// DELETE request
const response = await api.delete('/users/123');

================================================================================
                      10. ESTILOS Y DISEÑO (Tailwind)
================================================================================

CONFIGURACIÓN DE TAILWIND (tailwind.config.js):
-------------------------------------------------------------------------------
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
    },
  },
  plugins: [],
}

CLASES PERSONALIZADAS (globals.css):
-------------------------------------------------------------------------------
.btn-primary     → Botón primario (azul)
.btn-secondary   → Botón secundario (gris)
.input-field     → Campo de formulario estilizado

EJEMPLOS DE USO:
-------------------------------------------------------------------------------
<button className="btn-primary">Guardar</button>
<input className="input-field" placeholder="Nombre" />

================================================================================
                        11. SCRIPTS DISPONIBLES
================================================================================

COMANDOS DE DESARROLLO:
-------------------------------------------------------------------------------
npm run dev         # Inicia el servidor en modo desarrollo (hot-reload)
npm run build       # Construye la aplicación para producción
npm start           # Ejecuta la versión construida
npm run lint        # Verifica el código con ESLint

COMANDOS DE DOCKER:
-------------------------------------------------------------------------------
docker build -t servicios-frontend .           # Construir imagen
docker run -d -p 3000:3000 --name frontend servicios-frontend   # Ejecutar
docker logs -f frontend                        # Ver logs
docker stop frontend                           # Detener contenedor
docker rm frontend                             # Eliminar contenedor

================================================================================
                      12. DESPLIEGUE CON DOCKER
================================================================================

DOCKERFILE:
-------------------------------------------------------------------------------
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]

COMANDOS:
-------------------------------------------------------------------------------
# Construir la imagen
docker build -t servicios-frontend .

# Ejecutar el contenedor
docker run -d -p 3000:3000 --name frontend servicios-frontend

# Verificar que está corriendo
docker ps

# Ver logs
docker logs -f frontend

# Detener
docker stop frontend

================================================================================
                        13. PRODUCCIÓN Y DESPLIEGUE
================================================================================

OPCIÓN 1: VERCEL (RECOMENDADO)
-------------------------------------------------------------------------------
1. Instalar Vercel CLI:
   npm i -g vercel

2. Desplegar:
   vercel --prod

3. Configurar variables de entorno en el panel de Vercel:
   NEXT_PUBLIC_API_URL=https://tudominio.com/api

OPCIÓN 2: DOCKER
-------------------------------------------------------------------------------
1. Construir la imagen:
   docker build -t servicios-frontend .

2. Ejecutar en producción:
   docker run -d -p 3000:3000 \
     -e NEXT_PUBLIC_API_URL=https://tudominio.com/api \
     --name frontend \
     servicios-frontend

OPCIÓN 3: SERVIDOR TRADICIONAL
-------------------------------------------------------------------------------
1. Construir la aplicación:
   npm run build

2. Ejecutar:
   npm start

REQUISITOS PARA PRODUCCIÓN:
-------------------------------------------------------------------------------
- [ ] Variables de entorno configuradas correctamente
- [ ] Backend en ejecución y accesible
- [ ] CORS configurado en el backend con el dominio del frontend
- [ ] SSL/HTTPS configurado (recomendado)
- [ ] Build exitoso sin errores

================================================================================
                      14. CHECKLIST DE FUNCIONALIDADES
================================================================================

IMPLEMENTADO (100%):
-------------------------------------------------------------------------------
- [x] Configuración inicial de Next.js 14
- [x] Tailwind CSS configurado
- [x] TypeScript configurado
- [x] Sistema de autenticación con Zustand
- [x] Store persistente (localStorage)
- [x] Rutas protegidas por rol
- [x] Página de inicio (landing page)
- [x] Página de login
- [x] Página de registro
- [x] Layout principal
- [x] Navbar con navegación por rol
- [x] Cliente Dashboard (básico)
- [x] Proveedor Dashboard (básico)
- [x] Admin Dashboard (básico)
- [x] Página de espera de activación
- [x] Cliente Axios configurado
- [x] Interceptores de autenticación
- [x] Dockerfile configurado

PENDIENTE (0%):
-------------------------------------------------------------------------------
- [ ] Búsqueda de servicios
- [ ] CRUD de servicios (proveedor)
- [ ] Solicitud de citas (cliente)
- [ ] Gestión de citas (proveedor)
- [ ] Sistema de calificaciones y reseñas
- [ ] Panel de administración completo
- [ ] Notificaciones en tiempo real
- [ ] Gráficos y reportes (admin)
- [ ] Paginación en listados
- [ ] Modo oscuro
- [ ] PWA (instalable)

================================================================================
                        15. SOLUCIÓN DE PROBLEMAS
================================================================================

ERROR: "Module not found"
-------------------------------------------------------------------------------
Solución: npm install

ERROR: "Tailwind CSS classes not working"
-------------------------------------------------------------------------------
Solución: 
1. Verificar tailwind.config.js
2. Ejecutar: npx tailwindcss init -p
3. Reiniciar servidor

ERROR: "API requests failing with CORS"
-------------------------------------------------------------------------------
Solución: Verificar que el backend tenga CORS configurado con FRONTEND_URL

ERROR: "Next.js build fails"
-------------------------------------------------------------------------------
Solución: 
1. Ejecutar: npm run lint
2. Corregir errores de TypeScript
3. Limpiar caché: rm -rf .next
4. Reconstruir: npm run build

ERROR: "Hydration mismatch"
-------------------------------------------------------------------------------
Solución: 
1. Verificar que los componentes 'use client' estén marcados
2. Asegurar que el contenido dinámico no difiera entre servidor y cliente

================================================================================
                      16. VARIABLES DE ENTORNO DETALLADAS
================================================================================

NEXT_PUBLIC_API_URL
-------------------------------------------------------------------------------
Descripción: URL base del backend API
Requerida: SI
Valor desarrollo: http://localhost:3001/api
Valor producción: https://tudominio.com/api
Acceso: Cliente (navegador)

NOTA SOBRE SEGURIDAD:
-------------------------------------------------------------------------------
Las variables con prefijo NEXT_PUBLIC_ son visibles en el navegador.
NUNCA almacenes:
- JWT_SECRET
- API keys privadas
- Contraseñas
- Tokens de acceso privados

================================================================================
                          17. CONTACTO Y SOPORTE
================================================================================

Documentación completa: /docs
Reportar issues: <url_del_repositorio>/issues
Soporte técnico: <email_de_soporte>

================================================================================
                         18. VERSIONADO Y ACTUALIZACIONES
================================================================================

VERSIÓN ACTUAL: 1.0.0-MVP
ÚLTIMA ACTUALIZACIÓN: 2026-05-10
PRÓXIMA VERSIÓN: 1.1.0 (con servicios y citas)

HISTORIAL DE CAMBIOS:
-------------------------------------------------------------------------------
v1.0.0 (2026-05-10) - MVP inicial
- Autenticación completa
- Layout y navegación
- Dashboards básicos

================================================================================

DOCUMENTACIÓN GENERADA: 2026-05-10
ESTADO: EN DESARROLLO ACTIVO

================================================================================