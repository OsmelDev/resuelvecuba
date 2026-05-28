// "use client";

// import { useEffect } from "react";
// import { useAuthStore } from "@/app/store/authStore";
// import { useProveedorEstadoStore } from "@/app/store/proveedorEstadoStore";
// import BannerEstado from "@/app/components/proveedor/BannerEstado";
// import Link from "next/link";
// import { Package, Calendar, Star, Settings, AlertCircle } from "lucide-react";

// export default function ProveedorDashboard() {
//   const { user } = useAuthStore();
//   const { estado, cargarEstado } = useProveedorEstadoStore();

//   useEffect(() => {
//     cargarEstado();
//   }, []);

//   const estaExpirado = estado?.expirado || false;

//   return (
//     <div className="container px-4 py-8 mx-auto">
//       {/* Banner de estado */}
//       <BannerEstado />

//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Hola, {user?.nombre}
//         </h1>
//         <p className="mt-1 text-gray-600">
//           {estaExpirado
//             ? "Tu cuenta está en modo solo lectura"
//             : "Bienvenido a tu panel de control"}
//         </p>
//       </div>

//       {/* Stats cards */}
//       <div className="grid gap-6 mb-8 md:grid-cols-3">
//         <div className="p-6 bg-white rounded-lg shadow">
//           <div className="flex items-center justify-between mb-2">
//             <Package size={24} className="text-blue-600" />
//             <span className="text-2xl font-bold text-gray-800">0</span>
//           </div>
//           <h3 className="text-gray-600">Servicios activos</h3>
//         </div>

//         <div className="p-6 bg-white rounded-lg shadow">
//           <div className="flex items-center justify-between mb-2">
//             <Calendar size={24} className="text-green-600" />
//             <span className="text-2xl font-bold text-gray-800">0</span>
//           </div>
//           <h3 className="text-gray-600">Citas este mes</h3>
//         </div>

//         <div className="p-6 bg-white rounded-lg shadow">
//           <div className="flex items-center justify-between mb-2">
//             <Star size={24} className="text-yellow-500" />
//             <span className="text-2xl font-bold text-gray-800">
//               {user?.calificacion_promedio || "Nuevo"}
//             </span>
//           </div>
//           <h3 className="text-gray-600">Calificación promedio</h3>
//         </div>
//       </div>

//       {/* Acciones rápidas */}
//       <div className="p-6 bg-white rounded-lg shadow">
//         <h2 className="mb-4 text-xl font-semibold text-gray-800">
//           Acciones rápidas
//         </h2>

//         {estaExpirado ? (
//           <div className="flex items-center gap-3 p-4 border border-red-200 rounded-lg bg-red-50">
//             <AlertCircle className="text-red-500" size={24} />
//             <div>
//               <p className="font-medium text-red-700">Cuenta expirada</p>
//               <p className="text-sm text-red-600">
//                 Tu período de prueba ha terminado. Contacta al administrador
//                 para renovar.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-wrap gap-4">
//             <Link
//               href="/proveedor/servicios/nuevo"
//               className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
//             >
//               <Package size={18} />
//               Nuevo Servicio
//             </Link>
//             <Link
//               href="/proveedor/mis-servicios"
//               className="flex items-center gap-2 px-4 py-2 text-white transition bg-gray-600 rounded-lg hover:bg-gray-700"
//             >
//               <Settings size={18} />
//               Mis Servicios
//             </Link>
//             <Link
//               href="/proveedor/mis-citas"
//               className="flex items-center gap-2 px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
//             >
//               <Calendar size={18} />
//               Ver Citas
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useProveedorEstadoStore } from "@/app/store/proveedorEstadoStore";
import BannerEstado from "@/app/components/proveedor/BannerEstado";
import Link from "next/link";
import {
  Package,
  Calendar,
  Star,
  Settings,
  Wrench,
  ShoppingBag,
  Plus,
} from "lucide-react";

export default function ProveedorDashboard() {
  const { user } = useAuthStore();
  const { estado, cargarEstado } = useProveedorEstadoStore();

  console.log(user);

  useEffect(() => {
    cargarEstado();
  }, []);

  const estaExpirado = estado?.expirado || false;
  const esServicios = user?.tipo_oferta === "servicios";
  const esProductos = user?.tipo_oferta === "productos";

  return (
    <div className="container px-4 py-8 mx-auto">
      <BannerEstado />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Hola, {user?.nombre}
        </h1>
        <p className="mt-1 text-gray-600">
          {estaExpirado
            ? "Tu cuenta está en modo solo lectura"
            : `Bienvenido a tu panel de control - ${esServicios ? "Servicios" : "Productos"}`}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            {esServicios ? (
              <Wrench size={24} className="text-blue-600" />
            ) : (
              <ShoppingBag size={24} className="text-green-600" />
            )}
            <span className="text-2xl font-bold text-gray-800">0</span>
          </div>
          <h3 className="text-gray-600">
            {esServicios ? "Servicios activos" : "Productos activos"}
          </h3>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <Calendar size={24} className="text-green-600" />
            <span className="text-2xl font-bold text-gray-800">0</span>
          </div>
          <h3 className="text-gray-600">Citas este mes</h3>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <Star size={24} className="text-yellow-500" />
            <span className="text-2xl font-bold text-gray-800">
              {user?.calificacion_promedio || "Nuevo"}
            </span>
          </div>
          <h3 className="text-gray-600">Calificación promedio</h3>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Acciones rápidas
        </h2>

        {estaExpirado ? (
          <div className="flex items-center gap-3 p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="text-2xl text-red-500">⛔</div>
            <div>
              <p className="font-medium text-red-700">Cuenta expirada</p>
              <p className="text-sm text-red-600">
                Tu período de prueba ha terminado. Contacta al administrador
                para renovar.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/proveedor/${esServicios ? "servicios" : "productos"}/nuevo`}
              className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus size={18} />
              {esServicios ? "Nuevo Servicio" : "Nuevo Producto"}
            </Link>
            <Link
              href="/proveedor/mis-servicios"
              className="flex items-center gap-2 px-4 py-2 text-white transition bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              <Settings size={18} />
              {esServicios ? "Mis Servicios" : "Mis Productos"}
            </Link>
            <Link
              href="/proveedor/mis-citas"
              className="flex items-center gap-2 px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
            >
              <Calendar size={18} />
              Ver Citas
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
