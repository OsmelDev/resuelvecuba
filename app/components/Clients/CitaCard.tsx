import { Cita } from "@/app/store/citaStore";
import { Calendar, Clock, LucideProps } from "lucide-react";
import React, { FC, ForwardRefExoticComponent, RefAttributes } from "react";

interface CitaCardProps {
  cita: Cita;
  estadoConfig: Record<
    string,
    {
      label: string;
      color: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    }
  >;
  EstadoIcon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  handleCancelar: (id: string) => Promise<void>;
  cancelando: string | null;
}

const CitaCard: FC<CitaCardProps> = ({
  cita,
  estadoConfig,
  EstadoIcon,
  handleCancelar,
  cancelando,
}) => {
  return (
    <div key={cita._id} className="p-5 bg-white border rounded-lg shadow">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        {/* Info principal */}
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-semibold text-gray-800">
            {cita.servicio_id.nombre}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            Proveedor: {cita.proveedor_id.nombre}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(cita.fecha).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {cita.hora_inicio} {cita.hora_fin && `- ${cita.hora_fin}`}
            </div>
          </div>
        </div>

        {/* Estado y acciones */}
        <div className="flex flex-col items-end gap-2">
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${estadoConfig[cita.estado]?.color}`}
          >
            <EstadoIcon size={12} />
            {estadoConfig[cita.estado]?.label}
          </span>

          {cita.estado === "pendiente" && (
            <button
              onClick={() => handleCancelar(cita._id)}
              disabled={cancelando === cita._id}
              className="text-sm text-red-600 transition hover:text-red-700"
            >
              {cancelando === cita._id ? "Cancelando..." : "Cancelar cita"}
            </button>
          )}

          {cita.estado === "cancelada" && cita.motivo_cancelacion && (
            <p className="text-xs text-gray-400 max-w-[200px] text-right">
              Motivo: {cita.motivo_cancelacion}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitaCard;
