"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filters from "../../components/admin/Filters";
import ProveedoresTable from "../../components/admin/ProveedoresTable";
import NotFound from "../../components/admin/NotFound";
import ActivationModal from "../../components/admin/ActivationModal";
import { Proveedor } from "../../types/dataTypes";
import { useAdminStore } from "@/app/store/adminStore";

export default function AdminProveedoresPage() {
  const searchParams = useSearchParams();
  const [estadoFiltro, setEstadoFiltro] = useState(
    searchParams.get("estado") || "",
  );
  const [modalActivo, setModalActivo] = useState<Proveedor | null>(null);

  const { cargarProveedores, isLoading, proveedores } = useAdminStore();

  useEffect(() => {
    cargarProveedores(estadoFiltro);
  }, [estadoFiltro]);

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Proveedores
        </h1>
        <p className="mt-1 text-gray-600">
          Administra las cuentas de los proveedores
        </p>
      </div>

      {/* Filtros */}
      <Filters setEstadoFiltro={setEstadoFiltro} estadoFiltro={estadoFiltro} />

      {/* Tabla de proveedores */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : !proveedores ? (
        <NotFound />
      ) : (
        <ProveedoresTable
          estadoFiltro={estadoFiltro}
          openModal={setModalActivo}
          proveedores={proveedores}
        />
      )}

      {/* Modal de activación */}
      {modalActivo && (
        <ActivationModal
          estadoFiltro={estadoFiltro}
          modalActivation={modalActivo}
          openModalActivation={setModalActivo}
        />
      )}
    </div>
  );
}
