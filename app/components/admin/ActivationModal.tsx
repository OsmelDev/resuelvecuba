"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useActions } from "@/app/hooks/useActions";
import { Proveedor } from "@/app/types/dataTypes";
import { useAdminStore } from "@/app/store/adminStore";

interface ActivationModalProps {
  openModalActivation: Dispatch<SetStateAction<Proveedor | null>>;
  modalActivation: Proveedor | null;
  estadoFiltro: string;
}

const ActivationModal: FC<ActivationModalProps> = ({
  openModalActivation,
  modalActivation,
  estadoFiltro,
}) => {
  const [dias, setDias] = useState<number>(0);
  const { activarProveedor, isLoading, cargarProveedores } = useAdminStore();

  const handleActivation = async () => {
    const ok = await activarProveedor(
      openModalActivation,
      modalActivation,
      dias,
    );
    if (ok) await cargarProveedores(estadoFiltro);
  };

  console.log(dias, estadoFiltro);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Activar cuenta</h2>
        <p className="mb-4 text-gray-600">
          Proveedor: <strong>{modalActivation?.nombre}</strong>
        </p>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Selecciona el período
          </label>
          <select
            value={dias}
            onChange={(e) => setDias(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value={30}>30 días</option>
            <option value={90}>90 días</option>
            <option value={180}>180 días</option>
            <option value={365}>365 días</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => openModalActivation(null)}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleActivation}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Activando..." : "Activar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivationModal;
