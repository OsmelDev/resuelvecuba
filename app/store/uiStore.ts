import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface UIState {
  toasts: Toast[];
  isLoading: boolean;
  loadingMessage: string | null;
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: string) => void;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  clearToasts: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  toasts: [],
  isLoading: false,
  loadingMessage: null,

  showToast: (message, type) => {
    const id = Date.now().toString();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },

  hideToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  showLoading: (message) =>
    set({ isLoading: true, loadingMessage: message || null }),

  hideLoading: () => set({ isLoading: false, loadingMessage: null }),

  clearToasts: () => set({ toasts: [] }),
}));
