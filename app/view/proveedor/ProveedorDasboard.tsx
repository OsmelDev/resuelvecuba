"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";
import { useProveedorEstadoStore } from "@/app/store/proveedorEstadoStore";
import BannerEstado from "@/app/components/proveedor/BannerEstado";
import {
  Calendar,
  Star,
  Settings,
  Wrench,
  ShoppingBag,
  Plus,
  TrendingUp,
} from "lucide-react";

export default function ProveedorDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { estado, cargarEstado } = useProveedorEstadoStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user?._id) {
      cargarEstado();
    }
  }, [user?._id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6]"></div>
      </div>
    );
  }

  if (!user) return null;

  const estaExpirado = estado?.expirado || false;
  const esServicios = user?.tipo_oferta === "servicios";
  const esProductos = user?.tipo_oferta === "productos";

  return (
    <>
      <Head>
        <title>Mi Panel | ResuelveCuba</title>
        <meta
          name="description"
          content="Gestiona tu negocio en ResuelveCuba"
        />
      </Head>

      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="container px-4 py-8 mx-auto">
          {/* Banner de estado */}
          <BannerEstado />

          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#3B82F6] rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-1 text-2xl font-bold">
                  ¡Hola, {user.nombre}! 👋
                </h1>
                <p className="text-blue-100">
                  {estaExpirado
                    ? "Tu cuenta está en modo solo lectura"
                    : `Bienvenido a tu panel de control - ${esServicios ? "Servicios" : "Productos"}`}
                </p>
              </div>
              <div className="p-2 rounded-full bg-white/20">
                {esServicios ? (
                  <Wrench size={24} className="text-white" />
                ) : (
                  <ShoppingBag size={24} className="text-white" />
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 mb-8 md:grid-cols-4">
            <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                {esServicios ? (
                  <Wrench size={28} className="text-[#3B82F6]" />
                ) : (
                  <ShoppingBag size={28} className="text-[#F59E0B]" />
                )}
                <span className="text-2xl font-bold text-[#1E3A5F]">0</span>
              </div>
              <h3 className="text-gray-600">
                {esServicios ? "Servicios activos" : "Productos activos"}
              </h3>
            </div>

            <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Calendar size={28} className="text-[#F59E0B]" />
                <span className="text-2xl font-bold text-[#1E3A5F]">0</span>
              </div>
              <h3 className="text-gray-600">Citas este mes</h3>
            </div>

            <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Star size={28} className="text-yellow-400" />
                <span className="text-2xl font-bold text-[#1E3A5F]">
                  {user?.calificacion_promedio || "Nuevo"}
                </span>
              </div>
              <h3 className="text-gray-600">Calificación promedio</h3>
            </div>

            <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp size={28} className="text-green-500" />
                <span className="text-2xl font-bold text-[#1E3A5F]">0</span>
              </div>
              <h3 className="text-gray-600">Visitas al perfil</h3>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="p-6 mb-8 bg-white shadow-sm rounded-xl">
            <h2 className="text-xl font-semibold text-[#1E3A5F] mb-4">
              Acciones rápidas
            </h2>

            {estaExpirado ? (
              <div className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 rounded-xl">
                <div className="text-2xl text-red-500">⛔</div>
                <div>
                  <p className="font-medium text-red-700">Cuenta expirada</p>
                  <p className="text-sm text-red-600">
                    Tu período de prueba ha terminado. Contacta al administrador
                    para renovar.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/proveedor/${esServicios ? "servicios" : "productos"}/nuevo`}
                  className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#F59E0B] text-white px-4 py-2 rounded-xl transition-colors"
                >
                  <Plus size={18} />
                  {esServicios ? "Nuevo Servicio" : "Nuevo Producto"}
                </Link>
                <Link
                  href="/proveedor/mis-servicios"
                  className="flex items-center gap-2 border-2 border-[#3B82F6] text-[#1E3A5F] hover:bg-[#3B82F6] hover:text-white px-4 py-2 rounded-xl transition-all"
                >
                  <Settings size={18} />
                  {esServicios ? "Mis Servicios" : "Mis Productos"}
                </Link>
                <Link
                  href="/proveedor/mis-citas"
                  className="flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white px-4 py-2 rounded-xl transition-colors"
                >
                  <Calendar size={18} />
                  Ver Citas
                </Link>
              </div>
            )}
          </div>

          {/* Próximas citas */}
          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="text-xl font-semibold text-[#1E3A5F] mb-4">
              Próximas citas
            </h2>
            <div className="py-8 text-center text-gray-500">
              <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No tienes citas próximas</p>
              {!estaExpirado && (
                <p className="mt-1 text-sm">
                  Cuando los clientes soliciten tus{" "}
                  {esServicios ? "servicios" : "productos"}, aparecerán aquí
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
