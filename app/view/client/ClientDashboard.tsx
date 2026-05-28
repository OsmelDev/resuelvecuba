"use client";

import { useEffect, useState } from "react";
import { useProveedorStore } from "@/app/store/proveedorStore";
import { Search, MapPin, Package, Wrench } from "lucide-react";
import { useUIStore } from "@/app/store/uiStore";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { ProveedorCardSkeleton } from "@/app/components/ui/Skeleton";
import { Filtros } from "@/app/components/ui/Filtros";
import ProveedorCard from "@/app/components/Clients/ProveedorCard";

export default function ListaProveedoresPage() {
  const { proveedores, isLoading, loadProveedores } = useProveedorStore();
  const { showToast, showLoading, hideLoading } = useUIStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [filtrosValores, setFiltrosValores] = useState<Record<string, string>>(
    {},
  );
  const [aplicandoFiltros, setAplicandoFiltros] = useState(false);

  const cargarProveedores = async () => {
    try {
      const params: {
        search: string;
        ciudad: string;
      } = {
        search: searchTerm,
        ciudad,
        ...filtrosValores,
      };
      await loadProveedores(params);
    } catch (error) {
      showToast("Error al cargar proveedores", "error");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      cargarProveedores();
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchTerm, ciudad]);

  const filtersConfig = [
    {
      key: "tipo_oferta",
      label: "Tipo de oferta",
      type: "radio" as const,
      options: [
        { value: "", label: "Todos" },
        { value: "servicios", label: "Servicios", icon: <Wrench size={14} /> },
        { value: "productos", label: "Productos", icon: <Package size={14} /> },
      ],
    },
    {
      key: "calificacion",
      label: "Calificación mínima",
      type: "select" as const,
      options: [
        { value: "", label: "Cualquiera" },
        { value: "4.5", label: "4.5 estrellas +" },
        { value: "4.0", label: "4.0 estrellas +" },
        { value: "3.5", label: "3.5 estrellas +" },
        { value: "3.0", label: "3.0 estrellas +" },
      ],
    },
  ];

  const handleAplicarFiltros = async () => {
    setAplicandoFiltros(true);
    showLoading("Aplicando filtros...");
    await cargarProveedores();
    // loadProveedores({ tipo_oferta: filtroTipo, ciudad, search: searchTerm });

    hideLoading();
    setAplicandoFiltros(false);
    showToast("Filtros aplicados", "success");
  };

  const handleResetFiltros = () => {
    setFiltrosValores({});
    setCiudad("");
    setSearchTerm("");
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Proveedores</h1>
        <p className="mt-1 text-gray-600">
          Encuentra profesionales y tiendas cerca de ti
        </p>
      </div>

      {/* Búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o negocio..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        <div className="md:w-64">
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="Ciudad"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <Filtros
        titulo="Filtros avanzados"
        filters={filtersConfig}
        valores={filtrosValores}
        onChange={(key, value) =>
          setFiltrosValores((prev) => ({ ...prev, [key]: value }))
        }
        onReset={handleResetFiltros}
        onApply={handleAplicarFiltros}
        isLoading={aplicandoFiltros}
      />

      {/* Resultados */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProveedorCardSkeleton key={i} />
          ))}
        </div>
      ) : !proveedores ? (
        <EmptyState
          title="No se encontraron proveedores"
          description="Prueba con otros filtros o ciudad"
          icon="search"
          action={{
            label: "Limpiar filtros",
            onClick: handleResetFiltros,
          }}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proveedores.map((proveedor) => (
            <ProveedorCard proveedor={proveedor} key={proveedor._id} />
          ))}
        </div>
      )}
    </div>
  );
}
// {isLoading ? (
//   <div className="flex items-center justify-center h-64">
//     <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
//   </div>
// ) : !proveedores ? (
//   <div className="p-12 text-center bg-white rounded-lg shadow">
//     <Search size={48} className="mx-auto mb-4 text-gray-400" />
//     <h3 className="mb-2 text-lg font-medium text-gray-900">
//       No se encontraron proveedores
//     </h3>
//     <p className="text-gray-500">Prueba con otros filtros o ciudad</p>
//   </div>
// ) : (
//   <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
//     {proveedores.map((proveedor) => (
//       <Link
//         key={proveedor._id}
//         href={`/cliente/proveedor/${proveedor._id}`}
//         className="h-48 transition bg-white rounded-lg shadow-sm shadow-gray-400 hover:shadow-md hover:shadow-gray-500 group"
//       >
//         <div className="flex flex-col justify-between h-full p-5 border">
//           <div className="flex items-start justify-between mb-2">
//             <div className="flex items-center gap-1">
//               {proveedor.tipo_oferta === "servicios" ? (
//                 <Wrench size={18} className="text-blue-600" />
//               ) : (
//                 <Package size={18} className="text-green-600" />
//               )}
//               <span className="px-2 py-1 text-xs text-gray-600 bg-blue-200 rounded-md">
//                 {proveedor.tipo_oferta === "servicios"
//                   ? "Servicios"
//                   : "Productos"}
//               </span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Star size={14} className="text-yellow-400 fill-current" />
//               <span className="text-sm font-medium">
//                 {proveedor.calificacion_promedio || "Nuevo"}
//               </span>
//             </div>
//           </div>

//           <h3 className="h-10 mb-1 text-lg font-semibold text-gray-800 transition group-hover:text-blue-600">
//             {proveedor.negocio || proveedor.nombre}
//           </h3>

//           <p className="flex items-center gap-1 p-0 mb-1 text-xs text-gray-500">
//             <MapPin size={12} />
//             {proveedor.ubicacion?.ciudad || "Ubicación no especificada"}
//           </p>

//           <div className="flex justify-between gap-3 pt-3 text-xs text-gray-500 border-t">
//             {proveedor.tipo_oferta === "servicios" &&
//               proveedor.servicioDomicilio && (
//                 <span className="flex items-center gap-1">
//                   <Home size={12} />
//                   Domicilio
//                 </span>
//               )}
//             {proveedor.tipo_oferta === "productos" &&
//               proveedor.ofrece_envio && (
//                 <span className="flex items-center gap-1">
//                   <Truck size={12} />
//                   Envíos
//                 </span>
//               )}
//             <span>{proveedor.total_resenas || 0} reseñas</span>
//           </div>
//         </div>
//       </Link>
//     ))}
//   </div>
// )}

// <div className="p-4 mb-6 bg-white rounded-lg shadow">
//         <form
//           onSubmit={handleBuscar}
//           className="flex flex-col gap-3 md:flex-row"
//         >
//           <div className="flex-1">
//             <div className="relative">
//               <Search
//                 size={18}
//                 className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
//               />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Buscar por nombre o negocio..."
//                 className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//           <div className="md:w-48">
//             <div className="relative">
//               <MapPin
//                 size={18}
//                 className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
//               />
//               <input
//                 type="text"
//                 value={ciudad}
//                 onChange={(e) => setCiudad(e.target.value)}
//                 placeholder="Ciudad"
//                 className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Buscar
//           </button>
//         </form>

//         {/* Filtros de tipo */}
//         <div className="flex gap-3 pt-3 mt-4 border-t">
//           <button
//             onClick={() => setFiltroTipo("")}
//             className={`px-3 py-1 rounded-full text-sm transition ${
//               filtroTipo === ""
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             Todos
//           </button>
//           <button
//             onClick={() => setFiltroTipo("servicios")}
//             className={`px-3 py-1 rounded-full text-sm transition flex items-center gap-1 ${
//               filtroTipo === "servicios"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             <Wrench size={14} />
//             Servicios
//           </button>
//           <button
//             onClick={() => setFiltroTipo("productos")}
//             className={`px-3 py-1 rounded-full text-sm transition flex items-center gap-1 ${
//               filtroTipo === "productos"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             <Package size={14} />
//             Productos
//           </button>
//         </div>
//       </div>
