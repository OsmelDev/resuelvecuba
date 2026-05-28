import { create } from "zustand";

interface ToastState {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  showToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

type ToastType = "success" | "error" | "info" | "warning";

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message, type) => {
    const id = Date.now().toString();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
