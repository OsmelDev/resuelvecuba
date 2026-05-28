import { create } from "zustand";
import api from "@/app/services/api";

export interface Categoria {
  _id: string;
  nombre: string;
  clasificacion: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryState {
  categoris: Categoria[] | null;
  isLoading: boolean;
  error: string | null;
  message: string | null;

  createCategori: (
    clasificacion: string,
    nombre: string,
  ) => Promise<
    | {
        success: boolean;
        error?: undefined;
      }
    | {
        success: boolean;
        error: any;
      }
  >;
  loadCategoris: (clasificacion?: string | undefined) => Promise<void>;
  //   logout: () => Promise<void>;
  //   checkAuth: () => Promise<void>;
  clearError: () => void;
  clearMessage: () => void;
}

export interface RegisterData {
  nombre: string;
  email: string;
  telefono: string;
  password: string;
  confirmPassword: string;
  role: string;
  _isChecking: boolean;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categoris: null,
  isLoading: true,
  error: null,
  message: null,

  createCategori: async (clasificacion: string, nombre: string) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await api.post("/admin/categorias/create", {
        clasificacion,
        nombre,
      });
      const { data } = response.data;

      set({
        categoris: data,
        isLoading: false,
        message: "Inicio de sesión exitoso",
        error: null,
      });

      return { success: true };
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || "Error al iniciar sesión";
      set({ error: errorMsg, isLoading: false });
      return { success: false, error: errorMsg };
    }
  },

  loadCategoris: async (clasificacion?: string) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/admin/categorias`, { clasificacion });
      console.log(response);

      set({
        categoris: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),
}));

//   logout: async () => {
//     try {
//       const res = await api.post("/auth/logout");
//       console.log(res);
//     } catch (error) {
//       console.error("Error en logout:", error);
//     }

//     set({
//       user: null,
//       isAuthenticated: false,
//       error: null,
//       message: null,
//       isLoading: false,
//     });
//   },

//   checkAuth: async () => {
//     // ✅ 1. Si ya está verificando, salir
//     const { _isChecking, isAuthenticated, user } = get();

//     if (_isChecking) {
//       console.log("⏭️ Ya hay una verificación en curso, saltando");
//       return;
//     }

//     // ✅ 2. Si ya está autenticado, solo asegurar isLoading false
//     if (isAuthenticated && user) {
//       console.log("✅ Ya autenticado, saltando");
//       if (get().isLoading) set({ isLoading: false });
//       return;
//     }

//     // ✅ 3. Marcar como verificando
//     set({ _isChecking: true, isLoading: true });

//     try {
//       const response = await api.get("/auth/verify");
//       console.log("📡 Respuesta recibida");
//       const { user: verifiedUser } = response.data;
//       console.log(verifiedUser);

//       set({
//         user: verifiedUser,
//         isAuthenticated: true,
//         isLoading: false,
//         error: null,
//         _isChecking: false, // ✅ Liberar flag
//       });
//       console.log("✅ Estado actualizado");
//     } catch (error) {
//       console.log("❌ Error en verificación: ", error);

//       set({
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: null,
//         _isChecking: false, // ✅ Liberar flag también en error
//       });
//       // ❌ No hacer return aquí, ya seteamos todo
//     }
//   },
