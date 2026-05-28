import { create } from "zustand";
import api from "@/app/services/api";

interface EstadoProveedor {
  activo: boolean;
  periodo_prueba: boolean;
  fecha_expiracion: string;
  dias_restantes: number;
  expirado: boolean;
  modo_lectura: boolean;
}

interface ProveedorEstadoState {
  estado: EstadoProveedor | null;
  isLoading: boolean;
  cargarEstado: () => Promise<void>;
}

export const useProveedorEstadoStore = create<ProveedorEstadoState>(
  (set, get) => ({
    estado: null,
    isLoading: false,

    cargarEstado: async () => {
      set({ isLoading: true });
      try {
        const response = await api.get("/proveedor/estado");
        set({ estado: response.data, isLoading: false });
      } catch (error) {
        console.error("Error cargando estado:", error);
        set({ isLoading: false });
      }
    },
  }),
);
