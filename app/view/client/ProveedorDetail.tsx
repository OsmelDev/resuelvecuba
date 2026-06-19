"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head";
import { useProveedorStore } from "@/app/store/proveedorStore";
import { ArrowLeft } from "lucide-react";
import { ItemProveedor } from "@/app/types/dataTypes";
import LoadingScreen from "@/app/components/ui/LoadingScreen";
import Header from "@/app/components/Clients/proveedor/Header";
import ServiceCard from "@/app/components/Clients/proveedor/ServiceCard";
import VariantSelectModal from "@/app/components/Clients/proveedor/VariantSelectModal";

export default function ProveedorDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { proveedor, services, isLoading, loadProveedor } = useProveedorStore();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<ItemProveedor | null>(null);
  const [varianteSeleccionada, setVarianteSeleccionada] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (id) {
      loadProveedor(id as string);
    }
  }, [id]);

  const openVariantModal = (item: ItemProveedor) => {
    setProductoSeleccionado(item);
    setVarianteSeleccionada({});
    setModalAbierto(true);
  };

  const handleVarianteChange = (tipo: string, valor: string) => {
    setVarianteSeleccionada((prev) => ({ ...prev, [tipo]: valor }));
  };

  const handleComprarWhatsApp = () => {
    if (!productoSeleccionado) return;

    const telefono = proveedor?.telefono;
    if (!telefono) return;

    let mensaje = `Hola, vi tu producto "${productoSeleccionado.nombre}" en ResuelveCuba.%0A`;
    mensaje += `%0A📦 Producto: ${productoSeleccionado.nombre}`;
    mensaje += `%0A💰 Precio: $${productoSeleccionado.precio.toLocaleString()}`;

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!proveedor) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F3F4F6]">
        <div className="p-4 text-center text-red-600 bg-red-50 rounded-xl">
          Proveedor no encontrado
        </div>
      </div>
    );
  }

  const esServicios = proveedor.tipo_oferta === "servicios";

  return (
    <>
      <Head>
        <title>{proveedor.negocio || proveedor.nombre} | ResuelveCuba</title>
        <meta
          name="description"
          content={`Contacta con ${proveedor.negocio || proveedor.nombre} en ResuelveCuba`}
        />
      </Head>

      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="container max-w-5xl px-4 py-8 mx-auto">
          {/* Botón volver */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#1E3A5F] hover:text-[#3B82F6] mb-6 transition"
          >
            <ArrowLeft size={20} />
            Volver
          </button>

          {/* Header del proveedor */}
          <Header proveedor={proveedor} esServicios={esServicios} />

          {/* Lista de items */}
          <div className="p-6 bg-white shadow-sm rounded-2xl">
            <h2 className="text-xl font-semibold text-[#1E3A5F] mb-4">
              {esServicios ? "Servicios ofrecidos" : "Productos disponibles"}
            </h2>

            {services ? (
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((item) => (
                  <ServiceCard
                    item={item}
                    openModal={openVariantModal}
                    telefono={proveedor.telefono}
                    key={item._id}
                  />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No hay {esServicios ? "servicios" : "productos"} disponibles
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de selección de variantes */}
      {modalAbierto && productoSeleccionado && (
        <VariantSelectModal
          handleBuy={handleComprarWhatsApp}
          openModal={setModalAbierto}
          handleVarianteChange={handleVarianteChange}
          product={productoSeleccionado}
          selectedVariant={varianteSeleccionada}
        />
      )}
    </>
  );
}
