"use client";

import { useUIStore } from "@/app/store/uiStore";

export function LoadingOverlay() {
  const { isLoading, loadingMessage } = useUIStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl min-w-[200px]">
        <div className="w-10 h-10 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        <p className="font-medium text-gray-700">
          {loadingMessage || "Cargando..."}
        </p>
      </div>
    </div>
  );
}
