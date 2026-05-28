import { useState } from "react";
import { Service, ServicioDetalle } from "../types/dataTypes";
import api from "../services/api";

export const useClientActions = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [servicio, setServicio] = useState<Service | null>(null);

  const cargarServicio = async (id: string) => {
    try {
      const response = await api.get(`/servicios/${id}`);
      setServicio(response.data);
    } catch (error) {
      console.error("Error cargando servicio:", error);
      setError("No se pudo cargar el servicio");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    servicio,
    cargarServicio,
  };
};
