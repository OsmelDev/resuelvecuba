import { create } from "zustand";
import api from "../services/api";
import { getSocket } from "../lib/socket";

export interface Notificacion {
  _id: string;
  mensaje: string;
  tipo: string;
  leida: boolean;
  createdAt: string;
}

interface NotificacionState {
  notificaciones: Notificacion[];
  noLeidas: number;
  isLoading: boolean;
  socketEventsRegistered: boolean;
  socketConnected: boolean;
  conectarSocket: (userId: string, socket: any) => void;
  cargarNotificaciones: () => Promise<void>;
  marcarComoLeida: (id: string) => Promise<void>;
  marcarTodasLeidas: () => Promise<void>;
  removeNotification: (id: string) => Promise<void>;
  eliminarLeidas: () => Promise<void>;
}

export const useNotificacionStore = create<NotificacionState>((set, get) => ({
  notificaciones: [],
  noLeidas: 0,
  isLoading: false,
  socketEventsRegistered: false,
  socketConnected: false,

  conectarSocket: (userId, socket) => {
    socket?.emit("join", userId);

    socket?.on("nueva_notificacion", (notificacion: Notificacion) => {
      console.log("📨 Notificación en tiempo real:", notificacion);
      set((state) => ({
        notificaciones: [notificacion, ...state.notificaciones],
        noLeidas: state.noLeidas + 1,
      }));
    });
  },

  cargarNotificaciones: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/notificaciones");

      const notificaciones = data.notificaciones;

      const noLeidas = notificaciones.filter(
        (n: Notificacion) => !n.leida,
      ).length;
      set({ notificaciones, noLeidas, isLoading: false });
    } catch (error) {
      console.log("Error cargando notificaciones:", error);
      set({ isLoading: false });
    }
  },

  marcarComoLeida: async (id: string) => {
    try {
      await api.put(`/notificaciones/${id}/leer`);
      set((state) => {
        const notificacionesActualizadas = state.notificaciones.map((n) =>
          n._id === id ? { ...n, leida: true } : n,
        );
        const noLeidas = notificacionesActualizadas.filter(
          (n) => !n.leida,
        ).length;
        return { notificaciones: notificacionesActualizadas, noLeidas };
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },

  marcarTodasLeidas: async () => {
    try {
      await api.put("/notificaciones/leer-todas");
      set((state) => ({
        notificaciones: state.notificaciones.map((n) => ({
          ...n,
          leida: true,
        })),
        noLeidas: 0,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  },

  removeNotification: async (id: string) => {
    try {
      await api.delete(`/notificaciones/${id}`);
      set((state) => {
        const notificacionesActualizadas = state.notificaciones.filter(
          (n) => n._id !== id,
        );
        const noLeidas = notificacionesActualizadas.filter(
          (n) => !n.leida,
        ).length;
        return { notificaciones: notificacionesActualizadas, noLeidas };
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },

  eliminarLeidas: async () => {
    try {
      await api.delete("/notificaciones/leidas/eliminar");
      set((state) => ({
        notificaciones: state.notificaciones.filter((n) => !n.leida),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));
