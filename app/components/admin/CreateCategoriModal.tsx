"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { useActions } from "@/app/hooks/useActions";
import { Proveedor } from "@/app/types/dataTypes";
import { useCategoryStore } from "@/app/store/categoriesStore";

interface CreateCategoriModalProps {
  openModalActivation: Dispatch<SetStateAction<boolean>>;
  // estadoFiltro: string;
}

const CreateCategoriModal: FC<CreateCategoriModalProps> = ({
  openModalActivation,
  // estadoFiltro,
}) => {
  const [categoria, setCategoria] = useState({
    nombre: "",
    clasificacion: "",
  });
  const { createCategori, isLoading } = useCategoryStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Nueva Categoria</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Ingrese el nombre
          </label>
          <input
            value={categoria.nombre}
            onChange={(e) =>
              setCategoria({ ...categoria, nombre: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el nombre"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Selecciona su clasificacion
          </label>
          <select
            value={categoria.clasificacion}
            onChange={(e) =>
              setCategoria({ ...categoria, clasificacion: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Servicios">Servicios</option>
            <option value="Productos">Productos</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => openModalActivation(false)}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              await createCategori(categoria.clasificacion, categoria.nombre);
              openModalActivation(false);
            }}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Creando..." : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoriModal;
