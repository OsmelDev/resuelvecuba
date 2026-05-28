"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useServicioStore } from "@/app/store/servicioStore";
import { ArrowLeft, Save, Plus, X } from "lucide-react";

const categoriasPredefinidas = [
  "Ropa",
  "Zapatos",
  "Accesorios",
  "Electrónica",
  "Hogar",
  "Deportes",
  "Salud",
  "Belleza",
  "Juguetes",
  "Alimentos",
  "Otros",
];

const tiposVariante = [
  { value: "talla", label: "Talla", ej: "S, M, L, XL" },
  { value: "color", label: "Color", ej: "Rojo, Azul, Negro" },
  { value: "talla_color", label: "Talla y Color", ej: "S-Rojo, M-Azul" },
  { value: "personalizado", label: "Personalizado", ej: "Personalizado" },
];

export default function NuevoProductoPage() {
  const router = useRouter();
  const { crearServicio, loadCategorias, categorias } = useServicioStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tieneVariantes, setTieneVariantes] = useState(false);
  const [tipoVariante, setTipoVariante] = useState("talla");
  const [opcionesVariante, setOpcionesVariante] = useState<string[]>([]);
  const [nuevaOpcion, setNuevaOpcion] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    tipo: "producto",
    unidad_medida: "unidad",
    imagenes: [],
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const agregarOpcion = () => {
    if (nuevaOpcion.trim() && !opcionesVariante.includes(nuevaOpcion.trim())) {
      setOpcionesVariante([...opcionesVariante, nuevaOpcion.trim()]);
      setNuevaOpcion("");
    }
  };

  const eliminarOpcion = (opcion: string) => {
    setOpcionesVariante(opcionesVariante.filter((o) => o !== opcion));
  };

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

    const payload: any = {
      ...formData,
      precio: Number(formData.precio),
      tipo: "producto",
    };

    if (tieneVariantes && opcionesVariante.length > 0) {
      payload.variantes = {
        tipo: tipoVariante,
        opciones: opcionesVariante,
      };
    }

    const result = await crearServicio(payload);

    if (result.success) {
      router.push("/proveedor/mis-servicios");
    } else {
      setError(result.error || "Error al crear producto");
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/proveedor/mis-servicios"
          className="p-2 text-gray-500 transition hover:text-gray-700"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Nuevo Producto</h1>
          <p className="mt-1 text-gray-600">
            Completa la información de tu producto
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
            Nombre del producto *
          </label>
          <input
            type="text"
            required
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="w-full px-4 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Camisa de algodón, Zapatos deportivos..."
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
            placeholder="Describe detalladamente el producto..."
          />
        </div>

        {/* Categoría y Precio */}
        <div className="grid gap-4 mb-4 md:grid-cols-2">
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
              className="w-full px-4 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

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
                step="100"
                value={formData.precio}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                className="w-full py-2 pl-8 pr-4 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Unidad de medida */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Unidad de medida
          </label>
          <select
            value={formData.unidad_medida}
            onChange={(e) =>
              setFormData({ ...formData, unidad_medida: e.target.value })
            }
            className="w-full px-4 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="unidad">Unidad</option>
            <option value="par">Par</option>
            <option value="kg">Kilogramo</option>
            <option value="litro">Litro</option>
            <option value="metro">Metro</option>
          </select>
        </div>

        {/* Variantes */}
        <div className="mb-6">
          <label className="flex items-center gap-3 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={tieneVariantes}
              onChange={(e) => {
                setTieneVariantes(e.target.checked);
                if (!e.target.checked) {
                  setOpcionesVariante([]);
                }
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              ¿El producto tiene variantes?
            </span>
          </label>

          {tieneVariantes && (
            <div className="p-4 space-y-4 rounded-lg bg-gray-50">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Tipo de variante
                </label>
                <select
                  value={tipoVariante}
                  onChange={(e) => setTipoVariante(e.target.value)}
                  className="w-full px-4 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {tiposVariante.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label} ({t.ej})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Opciones
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={nuevaOpcion}
                    onChange={(e) => setNuevaOpcion(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && agregarOpcion()}
                    placeholder="Ej: S, Rojo, 38..."
                    className="flex-1 px-4 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={agregarOpcion}
                    className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {opcionesVariante.map((opcion) => (
                    <span
                      key={opcion}
                      className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-gray-200 rounded-full"
                    >
                      {opcion}
                      <button
                        type="button"
                        onClick={() => eliminarOpcion(opcion)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                {opcionesVariante.length === 0 && (
                  <p className="mt-1 text-xs text-gray-400">
                    Agrega al menos una opción (talla, color, etc.)
                  </p>
                )}
              </div>
            </div>
          )}
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
            {loading ? "Guardando..." : "Crear Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
