# Guía de Trabajo - Frontend ServiciosApp

## 📊 Estado Actual del Frontend

| Módulo                  | Estado | Completado |
| ----------------------- | ------ | ---------- |
| Configuración inicial   | ✅     | 100%       |
| Tailwind CSS            | ✅     | 100%       |
| TypeScript              | ✅     | 100%       |
| Layout y Navbar         | ✅     | 100%       |
| Autenticación (Zustand) | ✅     | 100%       |
| Rutas protegidas        | ✅     | 100%       |
| Página de Login         | ✅     | 100%       |
| Página de Register      | ✅     | 100%       |
| Landing page            | ✅     | 100%       |
| Dashboard Cliente       | ⏳     | 30%        |
| Dashboard Proveedor     | ⏳     | 30%        |
| Dashboard Admin         | ⏳     | 20%        |
| Dockerfile              | ✅     | 100%       |

---

## ❌ TAREAS PENDIENTES POR PRIORIDAD

### 🔴 PRIORIDAD ALTA (Hacer primero)

#### 1. Búsqueda de Servicios (Cliente)

- [ ] Crear página `app/cliente/buscar/page.tsx`
- [ ] Componente `TarjetaServicio` para mostrar resultados
- [ ] Filtros por categoría (select desde API)
- [ ] Filtros por rango de precio (slider o inputs)
- [ ] Filtros por ubicación (input ciudad)
- [ ] Ordenamiento (menor precio, mayor calificación)
- [ ] Estado de carga (skeleton loading)
- [ ] Mensaje "No se encontraron resultados"

**Tiempo estimado:** 4-6 horas

#### 2. CRUD de Servicios (Proveedor)

- [ ] Página `app/proveedor/mis-servicios/page.tsx`
- [ ] Listar todos los servicios del proveedor
- [ ] Botón "Agregar Servicio" → modal o página nueva
- [ ] Formulario `ServicioForm` con validación
  - [ ] Campo: nombre (text, required)
  - [ ] Campo: descripción (textarea, required)
  - [ ] Campo: precio (number, required, min:0)
  - [ ] Campo: categoría (select, required)
  - [ ] Campo: fotos (opcional, para fase 2)
- [ ] Editar servicio (precargar datos en formulario)
- [ ] Eliminar servicio (modal confirmación)
- [ ] Estado de carga y mensajes de éxito/error

**Tiempo estimado:** 4-6 horas

#### 3. Solicitar Cita (Cliente)

- [ ] Página `app/cliente/solicitar-cita/[servicioId]/page.tsx`
- [ ] Mostrar información del servicio seleccionado
- [ ] Selector de fecha (calendario nativo o react-datepicker)
- [ ] Selector de hora (options desplegable)
- [ ] Campo opcional: descripción adicional
- [ ] Botón "Solicitar Cita" con confirmación
- [ ] Validación de campos requeridos
- [ ] Redirección a "Mis Citas" después de crear

**Tiempo estimado:** 3-4 horas

---

### 🟡 PRIORIDAD MEDIA (Hacer después)

#### 4. Gestión de Citas (Cliente)

- [ ] Página `app/cliente/mis-citas/page.tsx`
- [ ] Listar citas del cliente (pendientes, confirmadas, completadas)
- [ ] Tabs o filtros por estado
- [ ] Botón "Cancelar" (con motivo)
- [ ] Botón "Solicitar cambio de horario" (opcional)
- [ ] Calificación post-servicio (modal estrellas)
- [ ] Ver detalles de cita (modal)

**Tiempo estimado:** 3-4 horas

#### 5. Gestión de Citas (Proveedor)

- [ ] Página `app/proveedor/mis-citas/page.tsx`
- [ ] Listar citas recibidas (pendientes, confirmadas, completadas)
- [ ] Badges visuales por estado
- [ ] Botones de acción:
  - [ ] Confirmar cita (pendiente → confirmada)
  - [ ] Rechazar cita (pendiente → cancelada)
  - [ ] Marcar completada (confirmada → completada)
- [ ] Modal de confirmación de acciones
- [ ] Ver datos del cliente (nombre, teléfono)

**Tiempo estimado:** 3-4 horas

#### 6. Sistema de Calificaciones (Cliente/Proveedor)

- [ ] Componente `EstrellasCalificacion` reusable
  - [ ] Props: calificación, readonly, tamaño, onCalificar
- [ ] Modal de calificación post-cita
  - [ ] Selección de estrellas (1-5)
  - [ ] Campo comentario (textarea)
  - [ ] Botón enviar
- [ ] Mostrar calificaciones en perfil de proveedor
- [ ] Proveedor puede responder reseñas
  - [ ] Botón "Responder" en cada reseña
  - [ ] Campo de texto para respuesta
  - [ ] Guardar respuesta

**Tiempo estimado:** 3-4 horas

#### 7. Panel de Administración

- [ ] Dashboard `app/admin/dashboard/page.tsx`
- [ ] Tarjetas de resumen (totales: proveedores, clientes, citas)
- [ ] Tabla de proveedores pendientes
  - [ ] Botón "Activar" con selector de días (7/15/30)
  - [ ] Botón "Desactivar"
  - [ ] Ver datos de contacto
- [ ] Tabla de proveedores activos
- [ ] Sección de reportes (gráficos)
  - [ ] Gráfico de servicios más contratados (recharts)
  - [ ] Gráfico de proveedores más activos

**Tiempo estimado:** 5-6 horas

---

### 🟢 PRIORIDAD BAJA (Puede esperar)

#### 8. Notificaciones en Tiempo Real

- [ ] Integrar Socket.io con polling fallback
- [ ] Componente `CampanaNotificaciones`
  - [ ] Contador de no leídas
  - [ ] Lista desplegable de notificaciones
  - [ ] Marcar como leída
  - [ ] Eliminar notificación
- [ ] Conectar a WebSocket cuando usuario loguea

**Tiempo estimado:** 4-5 horas

#### 9. Optimizaciones y Mejoras

- [ ] Lazy loading de componentes pesados
- [ ] Implementar skeletons de carga
- [ ] Modo oscuro (Tailwind)
- [ ] Toast notifications (sonner o react-hot-toast)
- [ ] Paginación en listados largos
- [ ] Infinite scroll para listas
- [ ] PWA (instalable en móvil)

**Tiempo estimado:** 5-6 horas

#### 10. Perfiles de Usuario

- [ ] Página `app/perfil/page.tsx`
- [ ] Editar datos personales (nombre, teléfono)
- [ ] Cambiar contraseña
- [ ] Subir foto de perfil (Cloudinary)
- [ ] Proveedores: editar ubicación y datos de negocio

**Tiempo estimado:** 3-4 horas

---

## 📝 TAREAS DETALLADAS

### Componentes Reusables a Crear

```markdown
src/components/ui/
├── EstrellasCalificacion.tsx # Selector de estrellas
├── TarjetaServicio.tsx # Tarjeta para listar servicios
├── TarjetaCita.tsx # Tarjeta para listar citas
├── ModalConfirmacion.tsx # Modal reutilizable
├── SkeletonCard.tsx # Esqueleto de carga
├── FiltrosServicios.tsx # Componente de filtros
├── SelectorHorario.tsx # Selector de fecha/hora
├── Toast.tsx # Notificaciones toast
├── CampanaNotificaciones.tsx # Campana con socket
└── TablaProveedores.tsx # Tabla admin (reusable)
```

# PAGINAS A CREAR

app/
├── cliente/
│ ├── buscar/
│ │ └── page.tsx # Búsqueda de servicios
│ ├── solicitar-cita/
│ │ └── [servicioId]/
│ │ └── page.tsx # Formulario cita
│ ├── mis-citas/
│ │ └── page.tsx # Lista de citas cliente
│ ├── calificar/
│ │ └── [citaId]/
│ │ └── page.tsx # Calificar servicio
│ └── perfil/
│ └── page.tsx # Editar perfil
│
├── proveedor/
│ ├── mis-servicios/
│ │ ├── page.tsx # Lista de servicios
│ │ ├── nuevo/
│ │ │ └── page.tsx # Crear servicio
│ │ └── editar/
│ │ └── [id]/
│ │ └── page.tsx # Editar servicio
│ ├── mis-citas/
│ │ └── page.tsx # Citas recibidas
│ ├── reseñas/
│ │ └── page.tsx # Ver y responder reseñas
│ └── perfil/
│ └── page.tsx # Editar perfil
│
└── admin/
├── proveedores/
│ └── page.tsx # Gestionar proveedores
├── reportes/
│ └── page.tsx # Gráficos y estadísticas
└── servicios/
└── page.tsx # Moderar servicios

# Semana 1: Servicios y Búsqueda

Día 1: ✅ Configuración inicial (COMPLETADO)
Día 2: ⏳ Página de búsqueda y filtros
Día 3: ⏳ CRUD de servicios (proveedor)
Día 4: ⏳ Formulario crear/editar servicio
Día 5: ⏳ Solicitar cita (cliente)

# Semana 2: Citas y Calificaciones

Día 6: ⏳ Mis citas (cliente)
Día 7: ⏳ Gestionar citas (proveedor)
Día 8: ⏳ Sistema de calificaciones
Día 9: ⏳ Componente estrellas
Día 10: ⏳ Responder reseñas

# Semana 3: Admin y Mejoras

Día 11: ⏳ Panel administración
Día 12: ⏳ Gráficos y reportes
Día 13: ⏳ Notificaciones
Día 14: ⏳ Optimizaciones
Día 15: ⏳ Testing y pulido

# CHECKLIST FINAL

## Para considerar Frontend COMPLETADO

Todas las páginas creadas

Todos los componentes reusables

Zustand stores funcionando

Autenticación fluida

Manejo de errores visual

Estados de carga implementados

Responsive (mobile, tablet, desktop)

SEO optimizado

Lighthouse score > 90

Build exitoso sin errores

Docker image funcionando

Documentación actualizada

Última actualización: 2026-05-10
Próxima revisión: 2026-05-17
