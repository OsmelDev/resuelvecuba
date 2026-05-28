import { Estadisticas } from "@/app/types/dataTypes";
import React, { FC } from "react";

interface QuickActionsProps {
  estadisticas: Estadisticas | null;
}

const QuickActions: FC<QuickActionsProps> = ({ estadisticas }) => {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Acciones rápidas
        </h2>
        <div className="space-y-3">
          <a
            href="/admin/proveedores?estado=pendiente"
            className="block w-full px-4 py-2 text-center text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Ver proveedores pendientes
          </a>
          <a
            href="/admin/proveedores?estado=expirado"
            className="block w-full px-4 py-2 text-center text-white transition bg-yellow-600 rounded-lg hover:bg-yellow-700"
          >
            Ver proveedores expirados
          </a>
          <a
            href="/admin/proveedores"
            className="block w-full px-4 py-2 text-center text-white transition bg-gray-600 rounded-lg hover:bg-gray-700"
          >
            Ver todos los proveedores
          </a>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Proveedores expirados recientemente
        </h2>
        {estadisticas?.expirados_recientes?.length === 0 ? (
          <p className="py-4 text-center text-gray-500">
            No hay proveedores expirados recientemente
          </p>
        ) : (
          <div className="space-y-3">
            {estadisticas?.expirados_recientes?.map((prov) => (
              <div
                key={prov._id}
                className="flex items-center justify-between pb-2 border-b"
              >
                <div>
                  <p className="font-medium text-gray-800">{prov.nombre}</p>
                  <p className="text-sm text-gray-500">{prov.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-red-600">
                    Expiró:{" "}
                    {new Date(prov.fecha_expiracion).toLocaleDateString()}
                  </p>
                  <a
                    href={`/admin/proveedores?buscar=${prov._id}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Activar
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
