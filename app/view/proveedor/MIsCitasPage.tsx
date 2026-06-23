"use client";

import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import { useCitaStore } from "@/app/store/citaStore";
import { useProveedorEstadoStore } from "@/app/store/proveedorEstadoStore";
import BannerEstado from "@/app/components/proveedor/BannerEstado";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Phone,
  Eye,
  LucideProps,
} from "lucide-react";

const estadoConfig: Record<
  string,
  {
    label: string;
    color: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }
> = {
  pendiente: {
    label: "Pendiente",
    color: "bg-yellow-100 text-yellow-800",
    icon: AlertCircle,
  },
  confirmada: {
    label: "Confirmada",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  completada: {
    label: "Completada",
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
  },
  cancelada: {
    label: "Cancelada",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export default function ProveedorCitasPage() {
  const {
    citas,
    isLoading,
    loadCitasProveedor,
    confirmarCita,
    cancelarCita,
    completarCita,
  } = useCitaStore();
  const { estado, cargarEstado } = useProveedorEstadoStore();
  const [procesando, setProcesando] = useState<string | null>(null);

  useEffect(() => {
    cargarEstado();
    loadCitasProveedor();
  }, []);

  const estaExpirado = estado?.expirado || false;
  const modoLectura = estaExpirado;

  const handleConfirmar = async (id: string) => {
    if (modoLectura) return;
    setProcesando(id);
    const result = await confirmarCita(id);
    if (!result.success) alert(result.error);
    setProcesando(null);
  };

  const handleRechazar = async (id: string) => {
    if (modoLectura) return;
    const motivo = prompt("¿Por qué rechazas la cita?");
    if (motivo === null) return;

    setProcesando(id);
    const result = await cancelarCita(id, motivo);
    if (!result.success) alert(result.error);
    setProcesando(null);
  };

  const handleCompletar = async (id: string) => {
    if (modoLectura) return;
    setProcesando(id);
    const result = await completarCita(id);
    if (!result.success) alert(result.error);
    setProcesando(null);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <BannerEstado />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Citas</h1>
        <p className="mt-1 text-gray-600">
          {modoLectura
            ? "Modo solo lectura - No puedes modificar citas"
            : "Administra las solicitudes de tus clientes"}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : citas.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-lg shadow">
          <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No tienes citas
          </h3>
          <p className="text-gray-500">
            Cuando los clientes soliciten tus servicios, aparecerán aquí
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {citas.map((cita) => {
            const EstadoIcon = estadoConfig[cita.estado]?.icon || AlertCircle;
            return (
              <div
                key={cita._id}
                className="p-5 bg-white border rounded-lg shadow"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  {/* Info principal */}
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-gray-800">
                      {cita.servicio_id.nombre}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {cita.cliente_id.nombre}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone size={14} />
                        {cita.cliente_id.telefono}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(cita.fecha).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {cita.hora_inicio}{" "}
                        {cita.hora_fin && `- ${cita.hora_fin}`}
                      </div>
                    </div>
                    <p className="mt-2 font-bold text-green-600">
                      ${cita.servicio_id.precio.toLocaleString()}
                    </p>
                  </div>

                  {/* Estado y acciones */}
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${estadoConfig[cita.estado]?.color}`}
                    >
                      <EstadoIcon size={12} />
                      {estadoConfig[cita.estado]?.label}
                    </span>

                    {modoLectura ? (
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Eye size={14} />
                        Solo lectura
                      </div>
                    ) : (
                      <div className="flex gap-2 mt-2">
                        {cita.estado === "pendiente" && (
                          <>
                            <button
                              onClick={() => handleConfirmar(cita._id)}
                              disabled={procesando === cita._id}
                              className="px-3 py-1 text-sm text-white transition bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
                            >
                              {procesando === cita._id ? "..." : "Confirmar"}
                            </button>
                            <button
                              onClick={() => handleRechazar(cita._id)}
                              disabled={procesando === cita._id}
                              className="px-3 py-1 text-sm text-white transition bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
                            >
                              Rechazar
                            </button>
                          </>
                        )}

                        {cita.estado === "confirmada" && (
                          <button
                            onClick={() => handleCompletar(cita._id)}
                            disabled={procesando === cita._id}
                            className="px-3 py-1 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                          >
                            Marcar completada
                          </button>
                        )}
                      </div>
                    )}

                    {cita.estado === "cancelada" && cita.motivo_cancelacion && (
                      <p className="text-xs text-gray-400 max-w-[200px] text-right">
                        Motivo: {cita.motivo_cancelacion}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
