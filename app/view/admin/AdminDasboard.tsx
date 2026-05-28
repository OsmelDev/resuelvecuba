"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useActions } from "../../hooks/useActions";
import StadisticCard from "../../components/admin/StadistiscCard";
import QuickActions from "../../components/admin/QuickActions";
import LoadingComponent from "../../components/LoadingComponent";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const { cargarEstadisticas, estadisticas, loading } = useActions();

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

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
