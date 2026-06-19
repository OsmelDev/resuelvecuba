import { create } from "zustand";
import api from "@/app/services/api";

export interface RegisterData {
  // Paso 1 - Datos básicos
  tipo: "cliente" | "proveedor";
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  password: string;
  confirmPassword: string;

  // Paso 2 - Datos de proveedor (solo si tipo = proveedor)
  negocio: string;
  direccion: string;
  telefonoFijo: string;
  servicioDomicilio: boolean;

  tipo_oferta: "servicios" | "productos";
  ofrece_envio: boolean;
  politica_devolucion: string;

  // Paso 3 - Aceptación
  aceptaTerminos: boolean;
  aceptaContrato: boolean;
}

interface RegisterState {
  step: number;
  data: RegisterData;
  isLoading: boolean;
  error: string | null;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (field: keyof RegisterData, value: any) => void;
  resetData: () => void;
  signup: () => Promise<{ success: boolean; error?: string }>;
}

const initialState: RegisterData = {
  tipo: "cliente",
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  password: "",
  confirmPassword: "",
  negocio: "",
  direccion: "",
  telefonoFijo: "",
  servicioDomicilio: false,
  tipo_oferta: "servicios",
  ofrece_envio: false,
  politica_devolucion: "",
  aceptaTerminos: false,
  aceptaContrato: false,
};

export const useRegisterStore = create<RegisterState>((set, get) => ({
  step: 1,
  data: { ...initialState },
  isLoading: false,
  error: null,

  nextStep: () => {
    const { step, data } = get();

    // Validaciones por paso
    if (step === 1) {
      if (!data.nombre.trim()) {
        set({ error: "El nombre es requerido" });
        return;
      }
      if (!data.apellidos.trim()) {
        set({ error: "Los apellidos son requeridos" });
        return;
      }
      if (!data.email.trim()) {
        set({ error: "El email es requerido" });
        return;
      }
      if (!data.telefono.trim()) {
        set({ error: "El teléfono es requerido" });
        return;
      }
      if (!data.password) {
        set({ error: "La contraseña es requerida" });
        return;
      }
      if (data.password !== data.confirmPassword) {
        set({ error: "Las contraseñas no coinciden" });
        return;
      }
      if (data.password.length < 6) {
        set({ error: "La contraseña debe tener al menos 6 caracteres" });
        return;
      }
    }

    if (step === 2 && data.tipo === "proveedor") {
      if (!data.negocio.trim()) {
        set({ error: "El nombre del negocio es requerido" });
        return;
      }
      if (!data.direccion.trim()) {
        set({ error: "La dirección es requerida" });
        return;
      }
    }

    if (step === 3) {
      if (!data.aceptaTerminos) {
        set({ error: "Debes aceptar los términos y condiciones" });
        return;
      }
      if (!data.aceptaContrato) {
        set({ error: "Debes aceptar el contrato de servicio" });
        return;
      }
    }

    set({ error: null, step: step + 1 });
  },

  prevStep: () => {
    const { step } = get();
    set({ error: null, step: step - 1 });
  },

  updateData: (field, value) => {
    set((state) => ({
      data: { ...state.data, [field]: value },
      error: null,
    }));
  },

  resetData: () => {
    set({ step: 1, data: { ...initialState }, error: null, isLoading: false });
  },

  signup: async () => {
    const { data } = get();
    set({ isLoading: true, error: null });

    try {
      // ✅ Construir payload usando axios
      const payload: any = {
        nombre: `${data.nombre} ${data.apellidos}`,
        email: data.email,
        telefono: data.telefono,
        password: data.password,
        role: data.tipo,
      };

      // Si es proveedor, agregar datos adicionales
      if (data.tipo === "proveedor") {
        payload.negocio = data.negocio;
        payload.telefonoFijo = data.telefonoFijo;
        payload.servicioDomicilio = data.servicioDomicilio;
        payload.tipo_oferta = data.tipo_oferta;
        payload.ofrece_envio = data.ofrece_envio;
        payload.politica_devolucion = data.politica_devolucion;
        payload.ubicacion = {
          ciudad: data.direccion.split(",")[0]?.trim() || "",
          direccion_texto: data.direccion,
        };
      }

      // ✅ Usar axios en lugar de fetch
      const response = await api.post("/auth/register", payload);

      set({ isLoading: false });
      return { success: true };
    } catch (error: any) {
      console.error("Error en registro:", error);
      const errorMsg =
        error.response?.data?.error || "Error al registrar usuario";
      set({ isLoading: false, error: errorMsg });
      return { success: false, error: errorMsg };
    }
  },
}));
