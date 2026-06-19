"use client";

import { useEffect, useState } from "react";
import { useProveedorEstadoStore } from "@/app/store/proveedorEstadoStore";
import {
  AlertCircle,
  Calendar,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";

export default function BannerEstado() {
  const { estado, isLoading, cargarEstado } = useProveedorEstadoStore();
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    cargarEstado();
  }, []);

  if (isLoading || !estado || !mostrar) return null;

  if (estado.expirado) {
    return (
      <div className="p-4 mb-6 border-l-4 border-red-500 bg-red-50 rounded-r-xl">
        <div className="flex items-start gap-3">
          <AlertCircle
            className="text-red-500 flex-shrink-0 mt-0.5"
            size={20}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-red-800">Cuenta expirada</h3>
            <p className="mt-1 text-sm text-red-700">
              Tu período de prueba ha terminado. Puedes ver tus datos
              históricos, pero no puedes crear nuevos servicios ni aceptar
              citas.
            </p>
            <p className="mt-2 text-xs text-red-600">
              📞 Contacta al administrador para renovar: ✉
              webmaster@resuelvecuba.com
            </p>
          </div>
          <button
            onClick={() => setMostrar(false)}
            className="text-red-400 hover:text-red-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (estado.periodo_prueba && estado.dias_restantes <= 5) {
    const porcentaje = (estado.dias_restantes / 30) * 100;
    return (
      <div className="p-4 mb-6 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle
            className="text-yellow-500 flex-shrink-0 mt-0.5"
            size={20}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-yellow-800">
              ⚠️ Tu período de prueba termina en {estado.dias_restantes}{" "}
              {estado.dias_restantes === 1 ? "día" : "días"}
            </h3>
            <p className="mt-1 text-sm text-yellow-700">
              Tu período gratuito de 30 días está por terminar. Contacta al
              administrador para renovar tu suscripción.
            </p>
            <div className="w-full h-2 mt-2 bg-yellow-200 rounded-full">
              <div
                className="h-2 transition-all bg-yellow-600 rounded-full"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setMostrar(false)}
            className="text-yellow-400 hover:text-yellow-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (estado.periodo_prueba) {
    const porcentaje = (estado.dias_restantes / 30) * 100;
    return (
      <div className="bg-blue-50 border-l-4 border-[#3B82F6] p-4 mb-6 rounded-r-xl">
        <div className="flex items-start gap-3">
          <Calendar className="text-[#3B82F6] flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-800">
              Período de prueba activo
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Te quedan {estado.dias_restantes} días de prueba gratuita.
              Disfruta de todos los beneficios sin límites.
            </p>
            <div className="w-full h-2 mt-2 bg-blue-200 rounded-full">
              <div
                className="bg-[#3B82F6] h-2 rounded-full transition-all"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setMostrar(false)}
            className="text-blue-400 hover:text-blue-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (!estado.periodo_prueba && estado.activo) {
    return (
      <div className="p-4 mb-6 border-l-4 border-green-500 bg-green-50 rounded-r-xl">
        <div className="flex items-start gap-3">
          <CheckCircle
            className="text-green-500 flex-shrink-0 mt-0.5"
            size={20}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-green-800">Suscripción activa</h3>
            <p className="mt-1 text-sm text-green-700">
              Tu suscripción está vigente hasta el{" "}
              {new Date(estado.fecha_expiracion).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setMostrar(false)}
            className="text-green-400 hover:text-green-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
