"use client";

import { useCallback, useEffect, useState } from "react";
import { useServicioStore } from "@/app/store/servicioStore";
import { Search } from "lucide-react";
import SearchAndFilterBar from "../../components/Clients/SearchAndFilterBar";
import ServiceCard from "../../components/Clients/ServiceCard";
import LoadingComponent from "../../components/LoadingComponent";

export default function ClientServiceSearchPage() {
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

  useCallback(() => {
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
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Buscar Servicios o Productos
        </h1>
        <p className="mt-2 text-gray-600">Encuentra lo que necesitas</p>
      </div>

      {/* Barra de búsqueda y filtros */}

      <SearchAndFilterBar
        activeFilters={filtrosActivos}
        showFilters={mostrarFiltros}
        filters={filtros}
        categorias={categorias}
        openFilters={() => setMostrarFiltros(!mostrarFiltros)}
        search={handleBuscar}
        setFilters={setFiltros}
        cleanFilters={handleLimpiarFiltros}
      />

      {/* Resultados */}
      {isLoading ? (
        <LoadingComponent />
      ) : servicios.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-lg shadow">
          <Search size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No se encontraron servicios
          </h3>
          <p className="text-gray-500">Prueba con otros filtros o categorías</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio) => (
            <ServiceCard service={servicio} key={servicio._id} />
          ))}
          servicios
        </div>
      )}
    </div>
  );
}
