import { create } from "zustand";
import api from "@/app/services/api";
import { User } from "../types/dataTypes";
import { FieldValues } from "react-hook-form";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  message: string | null;
  _isChecking: boolean; // ✅ Agregar este flag
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  message: null,
  _isChecking: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null, message: null });

    const data = {
      email,
      password,
    };
    try {
      const response = await api.post("/auth/login", data);
      const { user } = response.data;
      console.log(user);
      set({
        user,
        isAuthenticated: true,
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

  logout: async () => {
    try {
      const res = await api.post("/auth/logout");
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        message: null,
        isLoading: false,
      });
      return true;
    } catch (error) {
      console.error("Error en logout:", error);
      return false;
    }
  },

  checkAuth: async () => {
    // ✅ 1. Si ya está verificando, salir
    const { _isChecking, isAuthenticated, user } = get();

    if (_isChecking) {
      console.log("⏭️ Ya hay una verificación en curso, saltando");
      return;
    }

    // ✅ 2. Si ya está autenticado, solo asegurar isLoading false
    if (isAuthenticated && user) {
      console.log("✅ Ya autenticado, saltando");
      if (get().isLoading) set({ isLoading: false });
      return;
    }

    // ✅ 3. Marcar como verificando
    set({ _isChecking: true, isLoading: true });

    try {
      const response = await api.get("/auth/verify");
      console.log("📡 Respuesta recibida");
      const { user: verifiedUser } = response.data;
      console.log(verifiedUser);

      set({
        user: verifiedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        _isChecking: false, // ✅ Liberar flag
      });
      console.log("✅ Estado actualizado");
    } catch (error) {
      console.log("❌ Error en verificación: ", error);

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        _isChecking: false, // ✅ Liberar flag también en error
      });
      // ❌ No hacer return aquí, ya seteamos todo
    }
  },

  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),
}));
