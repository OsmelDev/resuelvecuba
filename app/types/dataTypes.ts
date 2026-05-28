// export interface Proveedor {
//   ubicacion: {
//     ciudad: string;
//     direccion_texto: string;
//   };
//   _id: string;
//   nombre: string;
//   email: string;
//   telefono: string;
//   negocio: string;
//   activo: boolean;
//   periodo_prueba: boolean;
//   fecha_expiracion: string;
//   dias_contratados: number;
//   fecha_ultima_activacion: Date;
//   fecha_registro: Date;
//   role: string;
//   telefonoFijo?: string;
//   servicioDomicilio: true;
//   calificacion_promedio: 0;
//   total_resenas: 0;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface Proveedor {
  ubicacion: {
    ciudad: string;
    direccion_texto: string;
  };

  activo: boolean;
  calificacion_promedio: number;
  createdAt: string;
  dias_contratados: number;
  email: string;
  fecha_expiracion: string;
  fecha_registro: string;
  fecha_ultima_activacion: string;
  negocio: string;
  nombre: string;
  ofrece_envio: boolean;
  periodo_prueba: boolean;
  politica_devolucion: string;
  role: string;
  servicioDomicilio: boolean;
  telefono: string;
  telefonoFijo: string;
  tipo_oferta: string;
  total_resenas: number;
  updatedAt: string;
  _id: string;
}
export interface ItemProveedor {
  _id: string;
  tipo: "servicio" | "producto";
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenes: string[];
  duracion_estimada?: string;
  incluye_materiales?: boolean;
  variantes?: {
    tipo: string;
    opciones: string[];
  };
  unidad_medida?: string;
}

export interface Variante {
  tipo: "talla" | "color" | "talla_color" | "personalizado";
  opciones: string[];
  _id: string;
}

export interface Service {
  _id: string;
  proveedor_id: {
    _id: string;
    nombre: string;
    calificacion_promedio: string;
    email: string;
    telefono: string;
    ubicacion: {
      ciudad: string;
      direccion_texto: string;
    };
  };
  tipo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: {
    _id: string;
    nombre: string;
  };
  fotos_trabajo: string[];
  activo: boolean;

  // Para servicios
  duracion_estimada?: string;
  incluye_materiales?: boolean;
  // Para productos
  variantes?: Variante;
  unidad_medida?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Estadisticas {
  activos: number;
  en_prueba: number;
  expirados: number;
  suspendidos: number;
  expirados_recientes: Array<{
    _id: string;
    nombre: string;
    email: string;
    fecha_expiracion: string;
  }>;
}

export interface ServicioDetalle {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  proveedor_id: {
    _id: string;
    nombre: string;
    telefono: string;
    email: string;
    calificacion_promedio: number;
    total_resenas: number;
    ubicacion?: {
      ciudad: string;
      direccion_texto: string;
    };
  };
}
export interface User {
  _id: string;
  nombre: string;
  email: string;
  telefono: string;
  role: string;
  activo: boolean;
  negocio: string;
  telefonoFijo: string;
  servicioDomicilio: false;
  ubicacion: {
    ciudad: string;
    direccion_texto: string;
  };
  tipo_oferta: string;
  ofrece_envio: boolean;
  politica_devolucion: string;
  periodo_prueba: true;
  fecha_registro: Date;
  fecha_expiracion: Date;
  dias_contratados: number;
  calificacion_promedio: number;
  total_resenas: number;
}
//     periodo_prueba: false,
