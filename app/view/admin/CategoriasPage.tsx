"use client";

import { useEffect, useState } from "react";
import NotFound from "../../components/admin/NotFound";
import FiltersCategoris from "@/app/components/admin/FiltersCategoris";
import { useCategoryStore } from "@/app/store/categoriesStore";
import CategoriasTable from "@/app/components/admin/CategorisTable";
import CreateCategoriModal from "@/app/components/admin/CreateCategoriModal";
import { useFilters } from "@/app/hooks/useFilters";

export default function AdminCategoriasPage() {
  const [estadoFiltro, setEstadoFiltro] = useState<string>("");
  const [modalActivo, setModalActivo] = useState<boolean>(false);
  const { loadCategoris, categoris, isLoading } = useCategoryStore();

  const { filteredCategoris, filterCategoris } = useFilters();

  useEffect(() => {
    loadCategoris("");
  }, []);

  useEffect(() => {
    filterCategoris(estadoFiltro);
  }, [estadoFiltro]);

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Categorias
        </h1>
        <p className="mt-1 text-gray-600">Administra las categorias</p>
      </div>

      {/* Filtros */}
      <FiltersCategoris
        setEstadoFiltro={setEstadoFiltro}
        estadoFiltro={estadoFiltro}
        openModal={setModalActivo}
      />

      {/* Tabla de proveedores */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : !categoris && !filteredCategoris ? (
        <NotFound />
      ) : (
        (filteredCategoris && (
          <CategoriasTable
            estadoFiltro={estadoFiltro}
            categorias={filteredCategoris}
          />
        )) ||
        (categoris && (
          <CategoriasTable estadoFiltro={estadoFiltro} categorias={categoris} />
        ))
      )}

      {/* Modal de activación */}
      {modalActivo && (
        <CreateCategoriModal openModalActivation={setModalActivo} />
      )}
    </div>
  );
}
