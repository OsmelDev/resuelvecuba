import { create } from "zustand";
import { ItemProveedor, Proveedor, Service } from "../types/dataTypes";
import api from "../services/api";

interface ProveedorStore {
  proveedores: Proveedor[] | null;
  proveedor: Proveedor | null;
  services: ItemProveedor[] | null;
  isLoading: boolean;

  loadProveedores: (filtros: Filtros) => Promise<void>;
  loadProveedor: (id: string) => Promise<void>;
  loadProveedoresByState: (state?: string) => Promise<void>;
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
export interface Filtros {
  search: string;
  ciudad: string;
  tipo_oferta: string;
}

export const useProveedorStore = create<ProveedorStore>((set, get) => ({
  proveedores: [],
  proveedor: null,
  services: null,
  isLoading: false,

  loadProveedores: async (filtros?: Filtros) => {
    set({ isLoading: true });
    try {
      const params = new URLSearchParams();
      if (filtros?.tipo_oferta)
        params.append("tipo_oferta", filtros.tipo_oferta);
      if (filtros?.ciudad) params.append("ciudad", filtros.ciudad);
      if (filtros?.search) params.append("search", filtros.search);

      const url = params.toString()
        ? `/proveedor/proveedores?${params}`
        : "/proveedor/proveedores";
      const response = await api.get(url);
      set({ proveedores: response.data, isLoading: false });
    } catch (error) {
      console.error("Error listando proveedores:", error);
      set({ isLoading: false });
    }
  },
  //  async () => {
  //   set({ isLoading: true });
  //   try {
  //     const response = await api.get(`/proveedor/proveedores`);
  //     set({ proveedores: response.data, isLoading: false });
  //   } catch (error) {
  //     console.error("Error cargando los proveedores:", error);
  //     set({ isLoading: false });
  //   }
  // },
  loadProveedor: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/proveedor/${id}`);
      set({
        proveedor: response.data.proveedor,
        services: response.data.items,
        isLoading: false,
      });
    } catch (error) {
      console.log("Error obteniendo proveedor:", error);

      set({ isLoading: false });
    }
  },

  loadProveedoresByState: async (state?: string) => {
    set({ isLoading: true });
    try {
      const url = state
        ? `/admin/proveedores?estado=${state}`
        : "/admin/proveedores";
      const response = await api.get(url);
      set({
        proveedores: response.data.proveedores,
        isLoading: false,
      });
    } catch (error) {
      console.log("Error obteniendo proveedor:", error);

      set({ isLoading: false });
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
