import { useEffect, useRef } from "react";
import { getSocket } from "@/app/lib/socket";
import { useAuthStore } from "@/app/store/authStore";

export function useSocket() {
  const { user } = useAuthStore();
  const socketRef = useRef<any>(null);
  const eventsRegisteredRef = useRef(false);

  useEffect(() => {
    if (!user?._id) return;

    // Obtener socket
    const socket = getSocket();
    socketRef.current = socket;

    // Solo registrar eventos una vez
    if (!eventsRegisteredRef.current) {
      eventsRegisteredRef.current = true;

      socket?.on("connect", () => {
        console.log("Socket conectado, uniendo a sala:", user._id);
        socket.emit("join", user._id);
      });

      if (socket?.connected) {
        console.log("Socket ya conectado, uniendo a sala:", user._id);
        socket.emit("join", user._id);
      }
    }

    // Cleanup al desmontar
    return () => {
      if (socketRef.current && user?._id) {
        socketRef.current.emit("leave", user._id);
        // No desconectar el socket global, solo salir de la sala
      }
    };
  }, [user?._id]);

  return { socket: socketRef.current };
}
