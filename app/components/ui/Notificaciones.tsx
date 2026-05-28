import { useEffect, useState } from "react";
import { Bell, Check, X, CheckCheck, Trash2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useNotificacionStore } from "../../store/notificacionStore";

export default function Notificaciones() {
  const { user, isAuthenticated } = useAuthStore();
  const {
    notificaciones,
    noLeidas,
    isLoading,
    conectarSocket,
    cargarNotificaciones,
    marcarComoLeida,
    marcarTodasLeidas,
    eliminarNotificacion,
    eliminarLeidas,
  } = useNotificacionStore();

  const [mostrar, setMostrar] = useState(false);
  const [mostrarMenuAcciones, setMostrarMenuAcciones] = useState(false);

  // Cargar notificaciones iniciales y conectar socket
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      cargarNotificaciones();
      conectarSocket(user._id);
    }
  }, [isAuthenticated, user?._id, cargarNotificaciones, conectarSocket]);

  // Polling fallback (cada 30 segundos por si el socket falla)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      cargarNotificaciones();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, cargarNotificaciones]);

  const getTipoIcono = (tipo: string) => {
    switch (tipo) {
      case "activacion":
        return "🎉";
      case "vencimiento":
        return "⚠️";
      case "nueva_cita":
        return "📅";
      case "cambio_cita":
        return "🔄";
      case "recordatorio":
        return "⏰";
      default:
        return "📢";
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "activacion":
        return "bg-green-100/50 hover:bg-green-100 border-green-500";
      case "vencimiento":
        return "bg-red-100/50 hover:bg-red-100 border-red-500";
      case "nueva_cita":
        return "bg-blue-100/50 hover:bg-blue-100 border-blue-500";
      case "cambio_cita":
        return "bg-orange-100/50 hover:bg-orange-100 border-orange-500";
      case "recordatorio":
        return "bg-yellow-100/50 hover:bg-yellow-100 border-yellow-500";
      default:
        return "bg-gray-100 hover:bg-gray-50 border-gray-500";
    }
  };

  const formatearFecha = (fecha: string) => {
    const diff = Math.floor((Date.now() - new Date(fecha).getTime()) / 1000);

    if (diff < 60) return "hace unos segundos";
    if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
    return new Date(fecha).toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Botón campana */}
      <button
        onClick={() => setMostrar(!mostrar)}
        className="relative p-2 text-gray-600 transition rounded-full hover:text-gray-900 hover:bg-gray-100"
      >
        <Bell size={20} />
        {noLeidas > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
            {noLeidas > 9 ? "9+" : noLeidas}
          </span>
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {mostrar && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMostrar(false)}
          />
          <div className="absolute right-0 z-50 mt-2 bg-white border rounded-lg shadow-xl w-96">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="font-semibold text-gray-800">Notificaciones</h3>
              <div className="relative">
                <button
                  onClick={() => setMostrarMenuAcciones(!mostrarMenuAcciones)}
                  className="p-1 text-gray-400 rounded hover:text-gray-600"
                >
                  ⋯
                </button>
                {mostrarMenuAcciones && (
                  <div className="absolute right-0 z-50 w-40 mt-2 bg-white border rounded-lg shadow-lg">
                    <button
                      onClick={() => {
                        marcarTodasLeidas();
                        setMostrarMenuAcciones(false);
                      }}
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <CheckCheck size={14} />
                      Marcar todas leídas
                    </button>
                    <button
                      onClick={() => {
                        eliminarLeidas();
                        setMostrarMenuAcciones(false);
                      }}
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Eliminar leídas
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Lista de notificaciones */}
            <div className="overflow-y-auto max-h-96">
              {isLoading && notificaciones.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="w-8 h-8 mx-auto mb-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                  <p className="text-sm">Cargando...</p>
                </div>
              ) : notificaciones.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={40} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No hay notificaciones</p>
                </div>
              ) : (
                notificaciones.map((notif) => (
                  <div
                    key={notif._id}
                    className={`p-3 border-b transition relative cursor-pointer ${getTipoColor(notif.tipo)} ${
                      !notif.leida ? "bg-blue-50" : ""
                    }`}
                    onClick={() => !notif.leida && marcarComoLeida(notif._id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 text-xl">
                        {getTipoIcono(notif.tipo)}
                      </div>
                      <div className="flex-1 pr-12">
                        <p
                          className={`text-sm ${!notif.leida ? "font-semibold text-gray-900" : "text-gray-700"}`}
                        >
                          {notif.mensaje}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {formatearFecha(notif.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="absolute flex gap-1 right-2 top-3">
                      {!notif.leida && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            marcarComoLeida(notif._id);
                          }}
                          className="p-1 text-green-600 rounded hover:bg-green-100"
                          title="Marcar como leída"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarNotificacion(notif._id);
                        }}
                        className="p-1 text-gray-400 rounded hover:text-red-600 hover:bg-red-50"
                        title="Eliminar"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notificaciones.length > 0 && (
              <div className="p-2 text-center border-t">
                <button
                  onClick={() => setMostrar(false)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
