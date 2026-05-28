import { create } from "zustand";
import api from "@/app/services/api";

export interface Cita {
  _id: string;
  cliente_id: {
    _id: string;
    nombre: string;
    telefono: string;
  };
  proveedor_id: {
    _id: string;
    nombre: string;
    telefono: string;
    calificacion_promedio: number;
  };
  servicio_id: {
    _id: string;
    nombre: string;
    precio: number;
  };
  fecha: string;
  hora_inicio: string;
  hora_fin?: string;
  tipo_cita: "hora_exacta" | "rango";
  estado:
    | "pendiente"
    | "confirmada"
    | "completada"
    | "cancelada"
    | "cambio_solicitado";
  motivo_cancelacion?: string;
  createdAt: string;
}

interface CreatingCita {
  servicio_id: string;
  proveedor_id: string;
  fecha: string;
  hora_inicio: string;
  hora_fin?: string;
  tipo_cita: string;
}

interface CitaState {
  citas: Cita[];
  isLoading: boolean;
  loadCitasCliente: () => Promise<void>;
  loadCitasProveedor: () => Promise<void>;
  crearCita: (
    data: CreatingCita,
  ) => Promise<{ success: boolean; error?: string }>;
  confirmarCita: (id: string) => Promise<{ success: boolean; error?: string }>;
  cancelarCita: (
    id: string,
    motivo?: string,
  ) => Promise<{ success: boolean; error?: string }>;
  completarCita: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export const useCitaStore = create<CitaState>((set, get) => ({
  citas: [],
  isLoading: false,

  loadCitasCliente: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/citas/cliente");
      set({ citas: response.data, isLoading: false });
    } catch (error) {
      console.error("Error cargando citas:", error);
      set({ isLoading: false });
    }
  },

  loadCitasProveedor: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/citas/proveedor");
      set({ citas: response.data, isLoading: false });
    } catch (error) {
      console.error("Error cargando citas:", error);
      set({ isLoading: false });
    }
  },

  crearCita: async (data) => {
    try {
      const response = await api.post("/citas", data);
      set({ citas: [response.data.cita, ...get().citas] });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Error al crear cita",
      };
    }
  },

  confirmarCita: async (id) => {
    try {
      const response = await api.put(`/citas/${id}/confirmar`);
      const citasActualizadas = get().citas.map((cita) =>
        cita._id === id ? { ...cita, estado: "completado" } : cita,
      );

      set({ citas: citasActualizadas });

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Error al confirmar cita",
      };
    }
  },

  cancelarCita: async (id, motivo) => {
    try {
      const response = await api.put(`/citas/${id}/cancelar`, { motivo });
      const citasActualizadas = get().citas.map((cita) =>
        cita._id === id
          ? { ...cita, estado: "cancelada", motivo_cancelacion: motivo }
          : cita,
      );
      set({ citas: citasActualizadas });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Error al cancelar cita",
      };
    }
  },

  completarCita: async (id) => {
    try {
      const response = await api.put(`/citas/${id}/completar`);
      const citasActualizadas = get().citas.map((cita) =>
        cita._id === id ? { ...cita, estado: "completada" } : cita,
      );
      set({ citas: citasActualizadas });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Error al completar cita",
      };
    }
  },
}));
