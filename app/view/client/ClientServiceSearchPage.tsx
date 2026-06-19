// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useServicioStore } from "@/app/store/servicioStore";
// import { Search } from "lucide-react";
// import SearchAndFilterBar from "../../components/Clients/SearchAndFilterBar";
// import ServiceCard from "../../components/Clients/ServiceCard";
// import LoadingComponent from "../../components/LoadingComponent";

// export default function ClientServiceSearchPage() {
//   const { servicios, isLoading, loadServicios, loadCategorias, categorias } =
//     useServicioStore();
//   const [mostrarFiltros, setMostrarFiltros] = useState(false);
//   const [filtros, setFiltros] = useState({
//     categoria: "",
//     minPrecio: "",
//     maxPrecio: "",
//   });
//   const [filtrosActivos, setFiltrosActivos] = useState(0);

//   useEffect(() => {
//     Promise.all([loadServicios(), loadCategorias()]);
//   }, []);

//   useCallback(() => {
//     let count = 0;
//     if (filtros.categoria) count++;
//     if (filtros.minPrecio) count++;
//     if (filtros.maxPrecio) count++;
//     setFiltrosActivos(count);
//   }, [filtros]);

//   const handleBuscar = async () => {
//     const filtrosAplicados: {
//       categoria: string;
//       minPrecio: string;
//       maxPrecio: string;
//     } = {
//       categoria: "",
//       minPrecio: "",
//       maxPrecio: "",
//     };
//     if (filtros.categoria) filtrosAplicados.categoria = filtros.categoria;
//     if (filtros.minPrecio) filtrosAplicados.minPrecio = filtros.minPrecio;
//     if (filtros.maxPrecio) filtrosAplicados.maxPrecio = filtros.maxPrecio;

//     await loadServicios(filtrosAplicados);
//   };

//   const handleLimpiarFiltros = () => {
//     setFiltros({ categoria: "", minPrecio: "", maxPrecio: "" });
//     loadServicios();
//   };

//   return (
//     <div className="container px-4 py-8 mx-auto">
//       {/* Header */}
//       <div className="mb-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Buscar Servicios o Productos
//         </h1>
//         <p className="mt-2 text-gray-600">Encuentra lo que necesitas</p>
//       </div>

//       {/* Barra de búsqueda y filtros */}

//       <SearchAndFilterBar
//         activeFilters={filtrosActivos}
//         showFilters={mostrarFiltros}
//         filters={filtros}
//         categorias={categorias}
//         openFilters={() => setMostrarFiltros(!mostrarFiltros)}
//         search={handleBuscar}
//         setFilters={setFiltros}
//         cleanFilters={handleLimpiarFiltros}
//       />

//       {/* Resultados */}
//       {isLoading ? (
//         <LoadingComponent />
//       ) : servicios.length === 0 ? (
//         <div className="p-12 text-center bg-white rounded-lg shadow">
//           <Search size={48} className="mx-auto mb-4 text-gray-400" />
//           <h3 className="mb-2 text-lg font-medium text-gray-900">
//             No se encontraron servicios
//           </h3>
//           <p className="text-gray-500">Prueba con otros filtros o categorías</p>
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {servicios.map((servicio) => (
//             <ServiceCard service={servicio} key={servicio._id} />
//           ))}
//           servicios
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useServicioStore } from "@/app/store/servicioStore";
import { Search, Filter, Star, X, Wrench, Package } from "lucide-react";

export default function SearchServicePage() {
  const { servicios, isLoading, loadServicios, loadCategorias, categorias } =
    useServicioStore();
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtros, setFiltros] = useState({
    categoria: "",
    minPrecio: "",
    maxPrecio: "",
  });
  const [filtrosActivos, setFiltrosActivos] = useState(0);

  useEffect(() => {
    Promise.all([loadServicios(), loadCategorias()]);
  }, []);

  useEffect(() => {
    let count = 0;
    if (filtros.categoria) count++;
    if (filtros.minPrecio) count++;
    if (filtros.maxPrecio) count++;
    setFiltrosActivos(count);
  }, [filtros]);

  const handleBuscar = async () => {
    const filtrosAplicados: {
      categoria: string;
      minPrecio: string;
      maxPrecio: string;
    } = {
      categoria: "",
      minPrecio: "",
      maxPrecio: "",
    };
    if (filtros.categoria) filtrosAplicados.categoria = filtros.categoria;
    if (filtros.minPrecio) filtrosAplicados.minPrecio = filtros.minPrecio;
    if (filtros.maxPrecio) filtrosAplicados.maxPrecio = filtros.maxPrecio;

    await loadServicios(filtrosAplicados);
  };

  const handleLimpiarFiltros = () => {
    setFiltros({ categoria: "", minPrecio: "", maxPrecio: "" });
    loadServicios();
  };

  return (
    <>
      <Head>
        <title>Buscar Servicios | ResuelveCuba</title>
        <meta
          name="description"
          content="Encuentra los mejores servicios en Cuba"
        />
      </Head>

      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="container px-4 py-8 mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#1E3A5F]">
              Buscar Servicios
            </h1>
            <p className="mt-1 text-gray-600">
              Encuentra el profesional que necesitas
            </p>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="p-4 mb-6 bg-white shadow-sm rounded-xl">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex-1">
                <button
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  className="flex items-center w-full gap-2 px-4 py-2 text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 md:w-auto"
                >
                  <Filter size={18} />
                  Filtros
                  {filtrosActivos > 0 && (
                    <span className="bg-[#3B82F6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {filtrosActivos}
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={handleBuscar}
                className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#F59E0B] text-white px-6 py-2 rounded-xl transition-colors"
              >
                <Search size={18} />
                Buscar
              </button>
            </div>

            {/* Panel de filtros */}
            {mostrarFiltros && (
              <div className="pt-4 mt-4 border-t">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Categoría
                    </label>
                    <select
                      value={filtros.categoria}
                      onChange={(e) =>
                        setFiltros({ ...filtros, categoria: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none"
                    >
                      <option value="">Todas las categorías</option>
                      {categorias.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Precio mínimo
                    </label>
                    <div className="relative">
                      <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={filtros.minPrecio}
                        onChange={(e) =>
                          setFiltros({ ...filtros, minPrecio: e.target.value })
                        }
                        placeholder="0"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Precio máximo
                    </label>
                    <div className="relative">
                      <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={filtros.maxPrecio}
                        onChange={(e) =>
                          setFiltros({ ...filtros, maxPrecio: e.target.value })
                        }
                        placeholder="Sin límite"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {filtrosActivos > 0 && (
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleLimpiarFiltros}
                      className="text-sm text-[#F59E0B] hover:text-[#D97706] flex items-center gap-1"
                    >
                      <X size={14} />
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Resultados */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6]"></div>
            </div>
          ) : servicios.length === 0 ? (
            <div className="p-12 text-center bg-white shadow-sm rounded-xl">
              <Search size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-[#1E3A5F] mb-2">
                No se encontraron servicios
              </h3>
              <p className="text-gray-500">
                Prueba con otros filtros o categorías
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicios.map((servicio) => (
                <div
                  key={servicio._id}
                  className="transition bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md group"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {servicio.tipo === "servicio" ? (
                          <Wrench size={16} className="text-[#3B82F6]" />
                        ) : (
                          <Package size={16} className="text-[#F59E0B]" />
                        )}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {servicio.categoria.nombre}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="text-yellow-400 fill-current"
                        />
                        <span className="text-sm text-gray-600">
                          {servicio.proveedor_id?.calificacion_promedio ||
                            "Nuevo"}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-[#1E3A5F] mb-1 group-hover:text-[#3B82F6] transition">
                      {servicio.nombre}
                    </h3>

                    <p className="mb-2 text-sm text-gray-500">
                      {servicio.proveedor_id?.nombre}
                    </p>

                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                      {servicio.descripcion}
                    </p>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold text-[#F59E0B]">
                          ${servicio.precio.toLocaleString()}
                        </span>
                      </div>
                      <Link
                        href={`/cliente/details/servicio/${servicio._id}`}
                        className="px-4 py-2 bg-[#3B82F6] hover:bg-[#F59E0B] text-white rounded-xl transition-colors text-sm"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
