import { create } from "zustand";
import api from "@/app/services/api";
import { AxiosError } from "axios";
import { Categoria } from "./categoriesStore";
import { Service } from "../types/dataTypes";
import { ProductosFormData } from "../hooks/useActions";

interface Filtro {
  categoria: string;
  minPrecio: string;
  maxPrecio: string;
}

interface ServicioState {
  servicios: Service[];
  isLoading: boolean;
  categorias: Categoria[];
  loadServicios: (filtros?: {
    categoria: string;
    minPrecio: string;
    maxPrecio: string;
  }) => Promise<void>;
  loadServiciosByProveedor: (proveedorId: string) => Promise<void>;
  loadCategorias: () => Promise<void>;
  crearServicio: (data: {
    precio: number;
    tipo: string;
    nombre: string;
    descripcion: string;
    categoria: string;
    unidad_medida: string;
    variantes?:
      | {
          tipo: string;
          opciones: string[];
        }
      | undefined;
  }) => Promise<{ success: boolean; error?: string }>;
  actualizarServicio: (
    id: string,
    data: Partial<ProductosFormData>,
  ) => Promise<{ success: boolean; error?: string }>;
  eliminarServicio: (
    id: string,
  ) => Promise<{ success: boolean; error?: string }>;
}

export const useServicioStore = create<ServicioState>((set, get) => ({
  servicios: [],
  isLoading: false,
  categorias: [],

  loadServicios: async (filtros?) => {
    set({ isLoading: true });
    try {
      const params = new URLSearchParams();
      if (filtros?.categoria) params.append("categoria", filtros.categoria);
      if (filtros?.minPrecio) params.append("minPrecio", filtros.minPrecio);
      if (filtros?.maxPrecio) params.append("maxPrecio", filtros.maxPrecio);

      const url = params.toString() ? `/servicios?${params}` : "/servicios";
      const response = await api.get(url);
      set({ servicios: response.data, isLoading: false });
    } catch (error) {
      console.error("Error cargando servicios:", error);
      console.log(error);
      set({ isLoading: false });
    }
  },

  loadServiciosByProveedor: async (proveedorId: string) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/servicios/proveedor/${proveedorId}`);
      set({ servicios: response.data, isLoading: false });
    } catch (error) {
      console.error("Error cargando servicios del proveedor:", error);
      set({ isLoading: false });
    }
  },

  loadCategorias: async () => {
    try {
      const response = await api.get("/servicios/categorias");
      set({ categorias: response.data });
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  },

  crearServicio: async (data) => {
    try {
      const response = await api.post("/servicios", data);
      set({ servicios: [response.data.servicio, ...get().servicios] });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Error al crear servicio",
      };
    }
  },

  actualizarServicio: async (id, data) => {
    try {
      const response = await api.put(`/servicios/${id}`, data);
      const serviciosActualizados = get().servicios.map((s) =>
        s._id === id ? response.data.servicio : s,
      );
      set({ servicios: serviciosActualizados });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Error al actualizar servicio",
      };
    }
  },

  eliminarServicio: async (id) => {
    try {
      await api.delete(`/servicios/${id}`);
      set({ servicios: get().servicios.filter((s) => s._id !== id) });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Error al eliminar servicio",
      };
    }
  },
}));
