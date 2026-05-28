"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";
import { ArrowLeft, Star, MapPin, Phone, Calendar, Wrench } from "lucide-react";
import { useClientActions } from "@/app/hooks/useClientAction";

export default function DetalleProductoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAuthStore();
  const { loading, error, servicio, cargarServicio } = useClientActions();

  useEffect(() => {
    cargarServicio(id);
  }, [id]);

  console.log(servicio);
  const handleSolicitarCita = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "cliente") {
      alert("Solo los clientes pueden solicitar citas");
      return;
    }
    router.push(`/cliente/solicitar-cita/${id}`);
  };

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !servicio) {
    return (
      <div className="px-4 py-8 mx-auto bg-black ">
        <div className="p-4 text-center text-red-600 rounded-lg bg-red-60">
          {error || "Servicio no encontrado"}
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      {/* Botón volver */}
      <Link
        href="/cliente/buscar"
        className="inline-flex items-center gap-2 mb-6 text-gray-600 transition hover:text-gray-800"
      >
        <ArrowLeft size={20} />
        Volver a resultados
      </Link>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Columna principal */}
        <div className="md:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow">
            {/* Categoría */}
            <div className="flex items-center gap-2 mb-4">
              <Wrench size={16} className="text-blue-600" />
              <span className="px-2 py-1 text-sm text-blue-600 rounded-full bg-blue-50">
                {servicio.categoria.nombre}
              </span>
            </div>

            {/* Nombre */}
            <h1 className="mb-3 text-3xl font-bold text-gray-800">
              {servicio.nombre}
            </h1>

            {/* Calificación */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star size={18} className="text-yellow-400 fill-current" />
                <span className="font-semibold">
                  {servicio.proveedor_id.calificacion_promedio || "Nuevo"}
                </span>
                <span className="text-sm text-gray-500">
                  ({servicio.proveedor_id.calificacion_promedio || 0} reseñas)
                </span>
              </div>
            </div>

            {/* Precio */}
            <div className="p-4 mb-6 rounded-lg bg-green-50">
              <p className="mb-1 text-sm text-green-700">Precio</p>
              <p className="text-3xl font-bold text-green-600">
                ${servicio.precio.toLocaleString()}
              </p>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Descripción del servicio
              </h2>
              <p className="leading-relaxed text-gray-600">
                {servicio.descripcion}
              </p>
            </div>
          </div>
        </div>

        {/* Columna lateral - Información del proveedor */}
        <div className="md:col-span-1">
          <div className="sticky p-6 bg-white rounded-lg shadow top-24">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Proveedor
            </h2>

            <div className="mb-4">
              <p className="font-medium text-gray-900">
                {servicio.proveedor_id.nombre}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">
                  {servicio.proveedor_id.calificacion_promedio ||
                    "Sin calificaciones"}
                </span>
              </div>
            </div>

            {servicio.proveedor_id.ubicacion && (
              <div className="flex items-start gap-2 mb-4">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="text-xs text-gray-700">
                    {servicio.proveedor_id.ubicacion.direccion_texto}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 mb-6">
              <Phone size={16} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Teléfono de contacto</p>
                <p className="text-sm text-gray-700">
                  {servicio.proveedor_id.telefono}
                </p>
              </div>
            </div>

            <button
              onClick={handleSolicitarCita}
              className="flex items-center justify-center w-full gap-2 py-3 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Calendar size={18} />
              Solicitar Cita
            </button>

            {user?.role === "cliente" && (
              <p className="mt-3 text-xs text-center text-gray-500">
                Al solicitar, el proveedor recibirá tu información de contacto
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
