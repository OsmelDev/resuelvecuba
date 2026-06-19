import { create } from "zustand";
import {
  Estadisticas,
  ItemProveedor,
  Proveedor,
  Service,
} from "../types/dataTypes";
import api from "../services/api";
import { Dispatch, SetStateAction } from "react";
import { useHandleError, handleError } from "../hooks/useHandleError";

interface AdminStore {
  proveedores: Proveedor[] | null;
  estadisticas: Estadisticas | null;
  services: ItemProveedor[] | null;
  isLoading: boolean;
  parameters: {
    dias_activar: number;
    periodo_prueba: boolean;
  };
  cargarProveedores: (filtros?: string) => Promise<void>;
  cargarEstadisticas: () => Promise<void>;
  activarProveedor: (
    openModalActivation: Dispatch<SetStateAction<Proveedor | null>>,
    modalActivation: Proveedor | null,
    dias: number,
  ) => Promise<boolean | undefined>;
}

interface ProveedorState {
  proveedores: Proveedor[];
  proveedorSeleccionado: Proveedor | null;
  itemsProveedor: ItemProveedor[];
  isLoading: boolean;
  listarProveedores: (filtros?: {
    tipo_oferta?: string;
    ciudad?: string;
    search?: string;
  }) => Promise<void>;
  getProveedorPublico: (id: string) => Promise<void>;
}
interface Filtros {
  tipo_oferta: string;
  ciudad: string;
  search: string;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  proveedores: [],
  estadisticas: null,
  services: null,
  isLoading: false,
  parameters: {
    dias_activar: 0,
    periodo_prueba: true,
  },

  cargarProveedores: async (estadoFiltro?: string) => {
    set({ isLoading: true });
    console.log("se ejecuta la carga de proveedores");
    try {
      const url = estadoFiltro
        ? `/admin/proveedores?estado=${estadoFiltro}`
        : "/admin/proveedores";
      const response = await api.get(url);
      set({ proveedores: response.data.proveedores, isLoading: false });
    } catch (error) {
      console.error("Error listando proveedores:", error);
      set({ isLoading: false });
    }
  },

  cargarEstadisticas: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/admin/estadisticas");
      set({
        estadisticas: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.log("Error obteniendo proveedor:", error);

      set({ isLoading: false });
    }
  },

  activarProveedor: async (
    openModalActivation: Dispatch<SetStateAction<Proveedor | null>>,
    modalActivation: Proveedor | null,
    dias: number,
  ) => {
    if (!modalActivation) return;

    set({ isLoading: true });

    try {
      const response = await api.put(
        `/admin/proveedores/${modalActivation._id}/activar`,
        {
          dias,
          periodo_prueba: false,
        },
      );
      console.log(response);
      openModalActivation(null);
      return true;
    } catch (error) {
      const message = handleError(error);
      alert(message || "Error al activar proveedor");
      return false;
    } finally {
      set({ isLoading: true });
    }
  },

  // async (id: string) => {
  //   set({ isLoading: true });
  //   try {
  //     const response = await api.get(`/proveedor/${id}`);
  //     console.log(response);
  //     set({
  //       proveedor: response.data.proveedor,
  //       services: response.data.servicios,
  //       isLoading: false,
  //     });
  //   } catch (error) {
  //     console.error("Error cargando los proveedores:", error);
  //     set({ isLoading: false });
  //   }
  // },

  //   loadCitasProveedor: async () => {
  //     set({ isLoading: true });
  //     try {
  //       const response = await api.get("/citas/proveedor");
  //       set({ citas: response.data, isLoading: false });
  //     } catch (error) {
  //       console.error("Error cargando citas:", error);
  //       set({ isLoading: false });
  //     }
  //   },

  //   crearCita: async (data) => {
  //     try {
  //       const response = await api.post("/citas", data);
  //       set({ citas: [response.data.cita, ...get().citas] });
  //       return { success: true };
  //     } catch (error: any) {
  //       return {
  //         success: false,
  //         error: error.response?.data?.error || "Error al crear cita",
  //       };
  //     }
  //   },

  //   confirmarCita: async (id) => {
  //     try {
  //       const response = await api.put(`/citas/${id}/confirmar`);
  //       const citasActualizadas = get().citas.map((cita) =>
  //         cita._id === id ? { ...cita, estado: "completado" } : cita,
  //       );

  //       set({ citas: citasActualizadas });

  //       return { success: true };
  //     } catch (error: any) {
  //       return {
  //         success: false,
  //         error: error.response?.data?.error || "Error al confirmar cita",
  //       };
  //     }
  //   },

  //   cancelarCita: async (id, motivo) => {
  //     try {
  //       const response = await api.put(`/citas/${id}/cancelar`, { motivo });
  //       const citasActualizadas = get().citas.map((cita) =>
  //         cita._id === id
  //           ? { ...cita, estado: "cancelada", motivo_cancelacion: motivo }
  //           : cita,
  //       );
  //       set({ citas: citasActualizadas });
  //       return { success: true };
  //     } catch (error: any) {
  //       return {
  //         success: false,
  //         error: error.response?.data?.error || "Error al cancelar cita",
  //       };
  //     }
  //   },

  //   completarCita: async (id) => {
  //     try {
  //       const response = await api.put(`/citas/${id}/completar`);
  //       const citasActualizadas = get().citas.map((cita) =>
  //         cita._id === id ? { ...cita, estado: "completada" } : cita,
  //       );
  //       set({ citas: citasActualizadas });
  //       return { success: true };
  //     } catch (error: any) {
  //       return {
  //         success: false,
  //         error: error.response?.data?.error || "Error al completar cita",
  //       };
  //     }
  //   },
}));
