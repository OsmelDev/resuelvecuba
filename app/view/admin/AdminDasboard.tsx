"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import StadisticCard from "../../components/admin/StadistiscCard";
import QuickActions from "../../components/admin/QuickActions";
import { useAdminStore } from "@/app/store/adminStore";
import LoadingScreen from "@/app/components/ui/LoadingScreen";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const { cargarEstadisticas, isLoading, estadisticas } = useAdminStore();

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  console.log(estadisticas);
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Panel de Administración
        </h1>
        <p className="mt-1 text-gray-600">Bienvenido, {user?.nombre}</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <StadisticCard estadisticas={estadisticas} />

      {/* Acciones rápidas */}
      <QuickActions estadisticas={estadisticas} />
    </div>
  );
}
