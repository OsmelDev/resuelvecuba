import { Dispatch, SetStateAction, useState } from "react";
import api from "../services/api";
import { useHandleError } from "./useHandleError";
import { Estadisticas, Proveedor } from "../types/dataTypes";
import { useProveedorStore } from "../store/proveedorStore";

export const useActions = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [diasActivar, setDiasActivar] = useState(30);
  const { handleError } = useHandleError();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    tipo: "producto",
    unidad_medida: "unidad",
    activo: true,
  });
  const [tieneVariantes, setTieneVariantes] = useState(false);
  const [tipoVariante, setTipoVariante] = useState("talla");
  const [opcionesVariante, setOpcionesVariante] = useState<string[]>([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [error, setError] = useState("");
  const { loadProveedoresByState } = useProveedorStore();

  const cargarProveedores = async (estadoFiltro?: string) => {
    setLoading(true);
    try {
      await loadProveedoresByState(estadoFiltro);
    } catch (error) {
      console.error("Error cargando proveedores:", error);
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const { data } = await api.get("/admin/estadisticas");
      setEstadisticas(data);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const activarProveedor = async (
    openModalActivation: Dispatch<SetStateAction<Proveedor | null>>,
    estadoFiltro: string,
    modalActivation: Proveedor | null,
  ) => {
    if (!modalActivation) return;
    setProcesando(true);
    try {
      await api.put(`/admin/proveedores/${modalActivation._id}/activar`, {
        dias: diasActivar,
        periodo_prueba: false,
      });
      await cargarProveedores(estadoFiltro);

      openModalActivation(null);
    } catch (error) {
      const message = handleError(error);
      alert(message || "Error al activar proveedor");
    } finally {
      setProcesando(false);
    }
  };

  const cargarProducto = async (id: string) => {
    try {
      const response = await api.get(`/servicios/${id}`);
      const producto = response.data;

      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio.toString(),
        categoria: producto.categoria,
        tipo: producto.tipo,
        unidad_medida: producto.unidad_medida || "unidad",
        activo: producto.activo,
      });

      if (producto.variantes && producto.variantes.opciones?.length > 0) {
        setTieneVariantes(true);
        setTipoVariante(producto.variantes.tipo);
        setOpcionesVariante(producto.variantes.opciones);
      }
    } catch (error) {
      console.error("Error cargando producto:", error);
      setError("No se pudo cargar el producto");
    } finally {
      setCargandoDatos(false);
    }
  };

  return {
    cargarProveedores,
    cargarEstadisticas,
    activarProveedor,
    setDiasActivar,
    cargarProducto,
    setOpcionesVariante,
    setTieneVariantes,
    setTipoVariante,
    setError,
    setFormData,
    formData,
    tieneVariantes,
    tipoVariante,
    opcionesVariante,
    cargandoDatos,
    error,
    diasActivar,
    procesando,
    proveedores,
    loading,
    estadisticas,
  };
};
