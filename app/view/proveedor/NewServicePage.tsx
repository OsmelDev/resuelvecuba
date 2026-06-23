"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { useServicioStore } from "@/app/store/servicioStore";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

const categoriasPredefinidas = [
  "Plomería",
  "Electricidad",
  "Limpieza",
  "Jardinería",
  "Pintura",
  "Carpintería",
  "Mudanzas",
  "Mecánica",
  "Tecnología",
  "Salud",
  "Educación",
  "Otros",
];

export default function NewServicePage() {
  const router = useRouter();
  const { crearServicio, loadCategorias, categorias } = useServicioStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    tipo: "servicio",
    duracion_estimada: "",
    incluye_materiales: false,
    unidad_medida: "",
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.nombre.trim()) {
      setError("El nombre es requerido");
      setLoading(false);
      return;
    }
    if (!formData.descripcion.trim()) {
      setError("La descripción es requerida");
      setLoading(false);
      return;
    }
    if (!formData.precio || Number(formData.precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      setLoading(false);
      return;
    }
    if (!formData.categoria) {
      setError("La categoría es requerida");
      setLoading(false);
      return;
    }

    const result = await crearServicio({
      ...formData,
      precio: Number(formData.precio),
      tipo: "servicio",
    });

    if (result.success) {
      router.push("/proveedor/mis-servicios");
    } else {
      setError(result.error || "Error al crear servicio");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Nuevo Servicio | ResuelveCuba</title>
        <meta name="description" content="Crea un nuevo servicio" />
      </Head>

      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="container max-w-2xl px-4 py-8 mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/proveedor/mis-servicios"
              className="p-2 text-gray-500 hover:text-[#1E3A5F] transition"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F]">
                Nuevo Servicio
              </h1>
              <p className="mt-1 text-sm text-gray-600 md:text-base">
                Completa la información de tu servicio
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white shadow-sm rounded-xl md:p-6"
          >
            {error && (
              <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-xl">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Nombre del servicio *
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
                placeholder="Ej: Reparación de PC, Limpieza de oficinas..."
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Descripción *
              </label>
              <textarea
                required
                rows={4}
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition resize-none"
                placeholder="Describe detalladamente el servicio que ofreces..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Precio *
                </label>
                <div className="relative">
                  <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={formData.precio}
                    onChange={(e) =>
                      setFormData({ ...formData, precio: e.target.value })
                    }
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Categoría *
                </label>
                <select
                  required
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.length > 0
                    ? categorias.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.nombre}
                        </option>
                      ))
                    : categoriasPredefinidas.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Duración estimada
                </label>
                <input
                  type="text"
                  value={formData.duracion_estimada}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duracion_estimada: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
                  placeholder="Ej: 2 horas, 1 día..."
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.incluye_materiales}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        incluye_materiales: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-[#3B82F6] rounded focus:ring-[#3B82F6]"
                  />
                  <span className="text-sm text-gray-700">
                    Incluye materiales
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proveedor/mis-servicios"
                className="order-2 px-4 py-2 text-center text-gray-700 transition border border-gray-300 sm:order-1 rounded-xl hover:bg-gray-50"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="order-1 sm:order-2 flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#F59E0B] text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {loading ? "Creando..." : "Crear Servicio"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
