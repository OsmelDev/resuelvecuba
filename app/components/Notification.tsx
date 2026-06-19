import { Check, X } from "lucide-react";
import React, { FC, MouseEvent } from "react";
import { Notificacion } from "../store/notificacionStore";

interface NotificationProps {
  notif: Notificacion;
  removeNotification: (id: string) => Promise<void>;
  marcarComoLeida: (id: string) => Promise<void>;
}

const Notification: FC<NotificationProps> = ({
  notif,
  marcarComoLeida,
  removeNotification,
}) => {
  const handleMarcarLeida = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await marcarComoLeida(id);
  };

  const handleEliminar = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await removeNotification(id);
  };

  const getTipoIcono = (tipo: string) => {
    switch (tipo) {
      case "activacion":
        return "🎉";
      case "vencimiento":
        return "⚠️";
      case "nueva_cita":
        return "📅";
      case "recordatorio":
        return "⏰";
      default:
        return "📢";
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "activacion":
        return "border-green-500 bg-green-50";
      case "vencimiento":
        return "border-red-500 bg-red-50";
      case "nueva_cita":
        return "border-[#3B82F6] bg-blue-50";
      case "recordatorio":
        return "border-yellow-500 bg-yellow-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  return (
    <div
      key={notif._id}
      className={`p-3 border-b hover:bg-gray-50 transition relative cursor-pointer ${getTipoColor(notif.tipo)} ${!notif.leida ? "bg-blue-50" : ""}`}
      onClick={() => !notif.leida && marcarComoLeida(notif._id)}
    >
      <div className="flex gap-3">
        <div className="text-xl">{getTipoIcono(notif.tipo)}</div>
        <div className="flex-1 pr-12">
          <p className="text-sm text-gray-800">{notif.mensaje}</p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(notif.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="absolute flex gap-1 right-2 top-3">
        {!notif.leida && (
          <button
            onClick={(e) => handleMarcarLeida(notif._id, e)}
            className="p-1 text-green-600 transition rounded hover:bg-green-100"
            title="Marcar como leída"
          >
            <Check size={14} />
          </button>
        )}
        <button
          onClick={(e) => handleEliminar(notif._id, e)}
          className="p-1 text-gray-400 transition rounded hover:text-red-600 hover:bg-red-50"
          title="Eliminar"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
