"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";
import { useServicioStore } from "@/app/store/servicioStore";
import { useProveedorEstadoStore } from "@/app/store/proveedorEstadoStore";
import BannerEstado from "@/app/components/proveedor/BannerEstado";
import { Pencil, Trash2, Plus, Wrench, Eye, ShoppingBag } from "lucide-react";
import { useUIStore } from "@/app/store/uiStore";
import { ConfirmModal } from "@/app/components/ui/Modal";
import { Service } from "@/app/types/dataTypes";

export default function MisServiciosPage() {
  const { user } = useAuthStore();
  const { servicios, isLoading, loadServiciosByProveedor, eliminarServicio } =
    useServicioStore();
  const { estado, cargarEstado } = useProveedorEstadoStore();

  const [servicioAEliminar, setServicioAEliminar] = useState<Service | null>(
    null,
  );
  const { showToast } = useUIStore();

  useEffect(() => {
    cargarEstado();
  }, []);

  useEffect(() => {
    if (user?._id) {
      loadServiciosByProveedor(user._id);
    }
  }, [user?._id]);

  const estaExpirado = estado?.expirado || false;
  const modoLectura = estaExpirado;
  const esServicios = user?.tipo_oferta === "servicios";
  const esProductos = user?.tipo_oferta === "productos";

  // const handleEliminar = async (id: string) => {
  //   if (modoLectura) return;

  //   if (
  //     !confirm(
  //       `¿Estás seguro de eliminar este ${esServicios ? "servicio" : "producto"}?`,
  //     )
  //   )
  //     return;

  //   const result = await eliminarServicio(id);
  //   if (!result.success) {
  //     alert(result.error);
  //   }
  // };

  const handleEliminar = async () => {
    if (!servicioAEliminar) return;

    const result = await eliminarServicio(servicioAEliminar._id);
    if (result.success) {
      showToast(
        `${servicioAEliminar.tipo === "servicio" ? "Servicio" : "Producto"} eliminado correctamente`,
        "success",
      );
      setServicioAEliminar(null);
    } else {
      showToast(result.error || "Error al eliminar", "error");
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <BannerEstado />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {esServicios ? "Mis Servicios" : "Mis Productos"}
          </h1>
          <p className="mt-1 text-gray-600">
            {modoLectura
              ? "Modo solo lectura - No puedes crear o editar"
              : `Gestiona los ${esServicios ? "servicios" : "productos"} que ofreces`}
          </p>
        </div>

        {!modoLectura && (
          <Link
            href={`/proveedor/${esServicios ? "servicios" : "productos"}/nuevo`}
            className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            {esServicios ? "Nuevo Servicio" : "Nuevo Producto"}
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : servicios.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-lg shadow">
          {esServicios ? (
            <Wrench size={48} className="mx-auto mb-4 text-gray-400" />
          ) : (
            <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
          )}
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No tienes {esServicios ? "servicios" : "productos"}
          </h3>
          <p className="mb-4 text-gray-500">
            {modoLectura
              ? "Tu cuenta está expirada. Renueva para agregar."
              : `Comienza creando tu primer ${esServicios ? "servicio" : "producto"}`}
          </p>
          {!modoLectura && (
            <Link
              href={`/proveedor/${esServicios ? "servicios" : "productos"}/nuevo`}
              className="inline-flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              {esServicios ? "Crear Servicio" : "Crear Producto"}
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((item) => (
            <div
              key={item._id}
              className="transition bg-white border rounded-lg shadow hover:shadow-lg"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {item.tipo === "servicio" ? (
                        <Wrench size={16} className="text-blue-600" />
                      ) : (
                        <ShoppingBag size={16} className="text-green-600" />
                      )}
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.nombre}
                      </h3>
                    </div>
                    <p className="mb-2 text-sm text-gray-500">
                      {item.categoria.nombre}
                    </p>
                  </div>
                  {modoLectura ? (
                    <Eye
                      size={18}
                      className="text-gray-400"
                      title="Modo lectura"
                    />
                  ) : (
                    <div className="flex gap-1">
                      <Link
                        href={`/proveedor/${esServicios ? "servicios" : "productos"}/editar/${item._id}`}
                        className="p-1 text-gray-500 transition hover:text-blue-600"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => setServicioAEliminar(item)}
                        className="p-1 text-gray-500 transition hover:text-red-600"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {item.descripcion}
                </p>

                {/* Detalles específicos */}
                {item.tipo === "servicio" && item.duracion_estimada && (
                  <p className="mt-2 text-xs text-gray-500">
                    ⏱️ Duración: {item.duracion_estimada}
                  </p>
                )}

                {item.tipo === "producto" && item.variantes && (
                  <p className="mt-2 text-xs text-gray-500">
                    🎨 Variantes: {item.variantes.opciones?.length} opciones
                  </p>
                )}

                <div className="pt-3 mt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${item.precio.toLocaleString()}
                    </span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        item.activo
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.activo ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        isOpen={!!servicioAEliminar}
        onClose={() => setServicioAEliminar(null)}
        onConfirm={handleEliminar}
        title="Eliminar"
        message={`¿Estás seguro de que deseas eliminar "${servicioAEliminar?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        confirmVariant="danger"
      />
    </div>
  );
}
