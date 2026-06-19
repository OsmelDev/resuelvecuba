"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";
import { useNotificacionStore } from "@/app/store/notificacionStore";
import { User } from "@/app/types/dataTypes";
import Notification from "../Notification";
import { getSocket } from "@/app/lib/socket";
import { useMobile } from "@/app/hooks/use-mobile";

interface NotificacionesProps {
  user: User;
}

export default function Notificaciones({ user }: NotificacionesProps) {
  const {
    notificaciones,
    noLeidas,
    isLoading,
    conectarSocket,
    cargarNotificaciones,
    marcarComoLeida,
    marcarTodasLeidas,
    removeNotification,
  } = useNotificacionStore();
  const [mostrar, setMostrar] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { isMobile } = useMobile();
  const socket = getSocket();

  // Cargar notificaciones iniciales
  const cargarDatos = useCallback(async () => {
    await cargarNotificaciones();
  }, [user?._id, cargarNotificaciones]);

  useEffect(() => {
    // cargarDatos();
    conectarSocket(user._id, socket);
  }, [cargarDatos]);

  // Polling como fallback (cada 30 segundos)
  useEffect(() => {
    if (!user?._id) return;

    const interval = setInterval(() => {
      cargarDatos();
    }, 30000);

    return () => clearInterval(interval);
  }, [user?._id, cargarDatos]);

  return (
    <div className="relative">
      <button
        onClick={() => setMostrar(!mostrar)}
        className="relative p-2 text-gray-600 hover:text-[#1E3A5F] rounded-full hover:bg-gray-100 transition"
      >
        <Bell size={20} />
        {noLeidas > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
            {noLeidas > 9 ? "9+" : noLeidas}
          </span>
        )}
      </button>

      {mostrar && (
        <>
          <div
            className="fixed inset-0 z-40 "
            onClick={() => setMostrar(false)}
          />
          <div
            className={`absolute ${!isMobile ? "right-0 w-96 mt-2" : "-right-4 w-80 mt-1"}  z-50  bg-white border shadow-xl  rounded-xl`}
          >
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="font-semibold text-[#1E3A5F]">Notificaciones</h3>
              {noLeidas > 0 && (
                <button
                  onClick={marcarTodasLeidas}
                  className="text-xs text-[#3B82F6] hover:text-[#F59E0B] flex items-center gap-1 transition"
                >
                  <CheckCheck size={14} />
                  Marcar todas
                </button>
              )}
            </div>

            <div className="overflow-y-auto max-h-96">
              {isLoading && notificaciones.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B82F6] mx-auto mb-2"></div>
                  <p className="text-sm">Cargando...</p>
                </div>
              ) : notificaciones.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={40} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No hay notificaciones</p>
                </div>
              ) : (
                notificaciones.map((notif) => (
                  <Notification
                    marcarComoLeida={marcarComoLeida}
                    removeNotification={removeNotification}
                    notif={notif}
                    key={notif._id}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
