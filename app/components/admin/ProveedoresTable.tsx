import { useActions } from "@/app/hooks/useActions";
import { useHandleError } from "@/app/hooks/useHandleError";
import api from "@/app/services/api";
import { useAdminStore } from "@/app/store/adminStore";
import { Proveedor } from "@/app/types/dataTypes";
import { Dispatch, FC, SetStateAction, useCallback } from "react";

interface ProveedoresTableProps {
  proveedores: Proveedor[];
  estadoFiltro: string;
  openModal: Dispatch<SetStateAction<Proveedor | null>>;
}

const ProveedoresTable: FC<ProveedoresTableProps> = ({
  openModal,
  estadoFiltro,
  proveedores,
}) => {
  const { handleError } = useHandleError();
  // const { cargarProveedores } = useActions();
  const { cargarProveedores } = useAdminStore();

  const extenderPeriodo = async (id: string, dias: number) => {
    try {
      await api.put(`/admin/proveedores/${id}/extender`, { dias });
    } catch (error) {
      const message = handleError(error);
      alert(message || "Error al extender período");
    } finally {
      cargarProveedores();
    }
  };

  const suspenderProveedor = async (id: string) => {
    if (!confirm("¿Estás seguro de suspender este proveedor?")) return;
    try {
      await api.put(`/admin/proveedores/${id}/suspender`, {
        motivo: "Suspendido por administrador",
      });
    } catch (error) {
      console.error("Error:", error);
      const message = handleError(error);
      alert(message || "Error al suspender proveedor");
    } finally {
      cargarProveedores(estadoFiltro);
    }
  };

  const getEstadoBadge = (proveedor: Proveedor) => {
    const expirado = new Date(proveedor.fecha_expiracion) < new Date();
    //expirado en true
    if (!proveedor.activo && expirado) {
      return { label: "Expirado", color: "bg-red-100 text-red-800" };
    }
    if (proveedor.periodo_prueba && proveedor.activo) {
      return { label: "Prueba", color: "bg-blue-100 text-blue-800" };
    }
    if (proveedor.activo && !proveedor.periodo_prueba) {
      return { label: "Activo", color: "bg-green-100 text-green-800" };
    }
    return { label: "Suspendido", color: "bg-gray-100 text-gray-800" };
  };

  const getDiasRestantes = useCallback((fechaExpiracion: string) => {
    const hoy = new Date();
    const expiracion = new Date(fechaExpiracion);
    const diff = Math.ceil(
      (expiracion.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24),
    );
    return Math.max(0, diff);
  }, []);

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                Proveedor
              </th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                Contacto
              </th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                Estado
              </th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                Expiración
              </th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {proveedores.map((proveedor) => {
              const estadoBadge = getEstadoBadge(proveedor);
              const diasRestantes = getDiasRestantes(
                proveedor.fecha_expiracion,
              );
              const expirado =
                new Date(proveedor.fecha_expiracion) < new Date();

              const fechaExpiracion = new Date(proveedor.fecha_expiracion);

              return (
                <tr key={proveedor._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {proveedor.nombre}
                    </div>
                    <div className="text-sm text-gray-500">
                      {proveedor.negocio || "Sin negocio"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {proveedor.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {proveedor.telefono}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${estadoBadge.color}`}
                    >
                      {estadoBadge.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {proveedor.activo ? (
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(
                            proveedor.fecha_expiracion,
                          ).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {diasRestantes} días restantes
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-red-600">
                        {expirado ? "Expirado" : "Suspendido"}ss
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {!proveedor.activo && (
                        <button
                          onClick={() => openModal(proveedor)}
                          className="text-sm text-green-600 hover:text-green-800"
                        >
                          Activar
                        </button>
                      )}
                      {proveedor.activo && (
                        <>
                          <button
                            onClick={() => extenderPeriodo(proveedor._id, 30)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            +30d
                          </button>
                          <button
                            onClick={() => suspenderProveedor(proveedor._id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Suspender
                          </button>

                          {proveedor.periodo_prueba && (
                            <button
                              onClick={() => openModal(proveedor)}
                              className="text-sm text-green-600 hover:text-green-800"
                            >
                              Activar
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProveedoresTable;
