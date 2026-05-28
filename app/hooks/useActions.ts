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

  const cargarProveedores = async (estadoFiltro: string) => {
    setLoading(true);
    try {
      const url = estadoFiltro
        ? `/admin/proveedores?estado=${estadoFiltro}`
        : "/admin/proveedores";
      const response = await api.get(url);
      setProveedores(response.data.proveedores || []);
    } catch (error) {
      console.error("Error cargando proveedores:", error);
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const response = await fetch("/api/admin/estadisticas");
      const data = await response.json();
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

  return {
    cargarProveedores,
    cargarEstadisticas,
    activarProveedor,
    setDiasActivar,
    diasActivar,
    procesando,
    proveedores,
    loading,
    estadisticas,
  };
};
