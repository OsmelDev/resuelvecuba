"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useProveedorStore } from "@/app/store/proveedorStore";
import {
  MapPin,
  Star,
  Phone,
  Mail,
  Package,
  Wrench,
  Truck,
  Home,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { ItemProveedor } from "@/app/types/dataTypes";
import ProveedorServiceCard from "@/app/components/Clients/ProveedorServiceCard";
import ModalProductSelected from "@/app/components/Clients/ModalProductSelected";

export default function PerfilProveedorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { proveedor, services, isLoading, loadProveedor } = useProveedorStore();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<ItemProveedor | null>(null);
  const [varianteSeleccionada, setVarianteSeleccionada] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (id) {
      loadProveedor(id);
    }
  }, [id]);

  const abrirModalVariantes = (item: ItemProveedor) => {
    setProductoSeleccionado(item);
    setVarianteSeleccionada({});
    setModalAbierto(true);
  };

  const handleVarianteChange = (tipo: string, valor: string) => {
    setVarianteSeleccionada((prev) => ({ ...prev, [tipo]: valor }));
  };

  const handleComprarWhatsApp = () => {
    if (!proveedor) return;

    const telefono = proveedor?.telefono;
    if (!telefono) return;

    let mensaje = `Hola, vi tu producto "${productoSeleccionado?.nombre}" en ServiciosApp.%0A`;
    mensaje += `%0A📦 Producto: ${productoSeleccionado?.nombre}`;
    mensaje += `%0A💰 Precio: $${productoSeleccionado?.precio.toLocaleString()}`;

    // ✅ Agregar variantes seleccionadas al mensaje
    if (Object.keys(varianteSeleccionada).length > 0) {
      mensaje += `%0A🎨 Opciones seleccionadas:`;
      for (const [tipo, valor] of Object.entries(varianteSeleccionada)) {
        mensaje += `%0A   - ${tipo}: ${valor}`;
      }
    }

    mensaje += `%0A%0A¿Podrías darme más información sobre disponibilidad y envío?`;

    const whatsappUrl = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(whatsappUrl, "_blank");
    setModalAbierto(false);
    setProductoSeleccionado(null);
    setVarianteSeleccionada({});
  };

  // Función para generar opciones según el tipo de variante
  const obtenerOpcionesVariante = (item: ItemProveedor) => {
    if (!item.variantes) return [];

    const { tipo, opciones } = item.variantes;

    if (tipo === "talla_color") {
      // Para talla y color, necesitamos combinar
      const tallas = opciones.filter((o: string) =>
        ["S", "M", "L", "XL", "XS", "XXL"].includes(o),
      );
      const colores = opciones.filter(
        (o: string) => !["S", "M", "L", "XL", "XS", "XXL"].includes(o),
      );
      return { tipo: "talla_color", tallas, colores };
    }

    return { tipo, opciones };
  };

  console.log(services);
  console.log(proveedor);

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!proveedor) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-4 text-center text-red-600 rounded-lg bg-red-50">
          Proveedor no encontrado
        </div>
      </div>
    );
  }

  const esServicios = proveedor.tipo_oferta === "servicios";

  return (
    <div className="container max-w-5xl px-4 py-8 mx-auto">
      {/* Botón volver */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-600 transition hover:text-gray-800"
      >
        <ArrowLeft size={20} />
        Volver
      </button>

      {/* Header del proveedor */}
      <div className="p-6 mb-6 bg-white rounded-lg shadow">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {esServicios ? (
                <Wrench size={24} className="text-blue-600" />
              ) : (
                <Package size={24} className="text-green-600" />
              )}
              <h1 className="text-2xl font-bold text-gray-800">
                {proveedor.negocio || proveedor.nombre}
              </h1>
            </div>

            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                {proveedor.calificacion_promedio || "Nuevo"}(
                {proveedor.total_resenas || 0} reseñas)
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} />
                {proveedor.ubicacion?.direccion_texto ||
                  "Ubicación no especificada"}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="text-gray-400" />
                <a
                  href={`tel:${proveedor.telefono}`}
                  className="text-blue-600 hover:underline"
                >
                  {proveedor.telefono}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-gray-400" />
                <a
                  href={`mailto:${proveedor.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {proveedor.email}
                </a>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {esServicios && proveedor.servicioDomicilio && (
              <span className="flex items-center gap-1 px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                <Home size={14} />
                Servicio a domicilio
              </span>
            )}
            {!esServicios && proveedor.ofrece_envio && (
              <span className="flex items-center gap-1 px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                <Truck size={14} />
                Ofrece envíos
              </span>
            )}
            {!esServicios && proveedor.politica_devolucion && (
              <span className="flex items-center gap-1 px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full">
                <AlertCircle size={14} />
                Devoluciones
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Lista de items */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {esServicios ? "Servicios ofrecidos" : "Productos disponibles"}
        </h2>

        {!services ? (
          <div className="py-8 text-center text-gray-500">
            No hay {esServicios ? "servicios" : "productos"} disponibles
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <ProveedorServiceCard
                item={item}
                proveedor={proveedor}
                abrirModalVariantes={abrirModalVariantes}
                key={item._id}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ MODAL DE SELECCIÓN DE VARIANTES */}
      {modalAbierto && productoSeleccionado && (
        <ModalProductSelected
          product={productoSeleccionado}
          openModal={setModalAbierto}
          sendWhatsapp={handleComprarWhatsApp}
          changeVariants={handleVarianteChange}
          variant={varianteSeleccionada}
        />
      )}
    </div>
  );
}
