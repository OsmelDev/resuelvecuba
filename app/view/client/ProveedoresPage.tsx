"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useProveedorStore } from "@/app/store/proveedorStore";
import { Search } from "lucide-react";
import { useUIStore } from "@/app/store/uiStore";
import SearchAndFiltersBar from "@/app/components/Clients/proveedores/SearchAndFiltersBar";
import ProveedorCard from "@/app/components/Clients/proveedores/ProveedorCard";

export default function ProveedoresPage() {
  const { proveedores, isLoading, loadProveedores } = useProveedorStore();
  const [searchTerm, setSearchTerm] = useState("");

  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [ciudad, setCiudad] = useState("");

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const { showToast } = useUIStore();

  const cargarProveedores = async () => {
    try {
      const params = {
        search: searchTerm,
        ciudad,
        tipo_oferta: filtroTipo,
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
  }, [filtroTipo, ciudad, searchTerm]);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    cargarProveedores();
  };

  const handleLimpiar = () => {
    setSearchTerm("");
    setCiudad("");
    setFiltroTipo("");
    cargarProveedores();
  };

  return (
    <>
      <Head>
        <title>Profesionales en Cuba | ResuelveCuba</title>
        <meta
          name="description"
          content="Encuentra los mejores profesionales y proveedores en Cuba"
        />
      </Head>

      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="container px-4 py-8 mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1E3A5F]">
              Profesionales en Cuba
            </h1>
            <p className="mt-1 text-gray-600">
              Encuentra el profesional que necesitas
            </p>
          </div>

          {/* Barra de búsqueda */}
          <SearchAndFiltersBar
            find={handleBuscar}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            ciudad={ciudad}
            setCiudad={setCiudad}
            mostrarFiltros={mostrarFiltros}
            setMostrarFiltros={setMostrarFiltros}
            changeFilterType={setFiltroTipo}
            filterType={filtroTipo}
            onClear={handleLimpiar}
          />

          {/* Resultados */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6]"></div>
            </div>
          ) : proveedores ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {proveedores.map((proveedor) => (
                <ProveedorCard key={proveedor._id} proveedor={proveedor} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white shadow-sm rounded-xl">
              <Search size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-[#1E3A5F] mb-2">
                No se encontraron proveedores
              </h3>
              <p className="text-gray-500">Prueba con otros filtros o ciudad</p>
              <button
                onClick={handleLimpiar}
                className="mt-4 text-[#3B82F6] hover:text-[#F59E0B] transition"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
