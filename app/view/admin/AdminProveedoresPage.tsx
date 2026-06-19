"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { ArrowLeft } from "lucide-react";
import ActivationModal from "@/app/components/admin/ActivationModal";
import { Proveedor } from "@/app/types/dataTypes";
import ProveedoresTable from "@/app/components/admin/ProveedoresTable";
import NotFound from "@/app/components/admin/NotFound";
import Filters from "@/app/components/admin/Filters";
import { useActions } from "@/app/hooks/useActions";
import { useProveedorStore } from "@/app/store/proveedorStore";

export default function AdminProveedoresPage() {
  const router = useRouter();
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalActivo, setModalActivo] = useState<Proveedor | null>(null);
  const { cargarProveedores } = useActions();
  const { isLoading, proveedores } = useProveedorStore();

  useEffect(() => {
    cargarProveedores(estadoFiltro);
  }, [estadoFiltro]);

  const proveedoresFiltered = proveedores?.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.negocio && p.negocio.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <>
      <Head>
        <title>Gestión de Proveedores | ResuelveCuba</title>
        <meta
          name="description"
          content="Administra los proveedores de la plataforma"
        />
      </Head>

      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="container px-4 py-8 mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="p-2 text-gray-500 hover:text-[#1E3A5F] transition"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#1E3A5F]">
                Gestión de Proveedores
              </h1>
              <p className="mt-1 text-gray-600">
                Administra las cuentas de los proveedores
              </p>
            </div>
          </div>

          {/* Búsqueda y Filtros */}
          <Filters
            setEstadoFiltro={setEstadoFiltro}
            estadoFiltro={estadoFiltro}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Tabla de proveedores */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            proveedoresFiltered &&
            (proveedoresFiltered.length === 0 ? (
              <NotFound />
            ) : (
              <ProveedoresTable
                estadoFiltro={estadoFiltro}
                openModal={setModalActivo}
                proveedores={proveedoresFiltered}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal de activación */}

      {modalActivo && (
        <ActivationModal
          estadoFiltro={estadoFiltro}
          modalActivation={modalActivo}
          openModalActivation={setModalActivo}
        />
      )}
    </>
  );
}
