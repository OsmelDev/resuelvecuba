"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useServicioStore } from "@/app/store/servicioStore";
import api from "@/app/services/api";
import { ArrowLeft, Save } from "lucide-react";
import { useCategoryStore } from "@/app/store/categoriesStore";

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

export default function EditarServicioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { actualizarServicio, loadCategorias, categorias } = useServicioStore();
  const [loading, setLoading] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: {
      _id: "",
      nombre: "",
    },
    activo: true,
  });
  const [categ, setCatg] = useState("");

  const cargarServicio = async () => {
    try {
      const response = await api.get(`/servicios/${id}`);
      const servicio = response.data;
      setFormData({
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        precio: servicio.precio.toString(),
        categoria: {
          nombre: servicio.categoria.nombre,
          _id: servicio.categoria._id,
        },
        activo: servicio.activo,
      });
    } catch (error) {
      console.error("Error cargando servicio:", error);
      setError("No se pudo cargar el servicio");
    } finally {
      setCargandoDatos(false);
    }
  };

  useEffect(() => {
    const resul = () => Promise.all([loadCategorias(), cargarServicio()]);
    resul();
  }, [id]);

  useEffect(() => {
    const save = () => {
      setFormData({
        ...formData,
        categoria: categorias.filter((cat) => cat._id === categ)[0],
      });
    };
    save();
  }, [categ]);

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

    const result = await actualizarServicio(id, {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: Number(formData.precio),
      categoria: formData.categoria,
      activo: formData.activo,
    });

    if (result.success) {
      router.push("/proveedor/mis-servicios");
    } else {
      setError(result.error || "Error al actualizar servicio");
      setLoading(false);
    }
  };

  if (cargandoDatos) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/proveedor/mis-servicios"
          className="p-2 text-gray-500 transition hover:text-gray-700"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Editar Servicio</h1>
          <p className="mt-1 text-gray-600">
            Modifica la información de tu servicio
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow">
        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        {/* Nombre */}
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
            className="w-full px-4 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Descripción */}
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
            className="w-full px-4 py-2 transition border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Precio */}
        <div className="mb-4">
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
              className="w-full py-2 pl-8 pr-4 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Categoría *
          </label>
          <select
            required
            value={formData.categoria._id}
            onChange={(e) => {
              setCatg(e.target.value);
            }}
            className="w-full px-4 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categorias &&
              categorias.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.nombre}
                </option>
              ))}
          </select>
        </div>

        {/* Estado */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            value={formData.activo ? "activo" : "inactivo"}
            onChange={(e) =>
              setFormData({ ...formData, activo: e.target.value === "activo" })
            }
            className="w-full px-4 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Los servicios inactivos no se muestran a los clientes
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <Link
            href="/proveedor/mis-servicios"
            className="flex-1 px-4 py-2 text-center text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
