import { Cita } from "@/app/store/citaStore";
import { Calendar, Clock, LucideProps } from "lucide-react";
import React, { FC, ForwardRefExoticComponent, RefAttributes } from "react";

interface CitaCardProps {
  cita: Cita;
  IconState: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  configState: Record<
    string,
    {
      label: string;
      color: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    }
  >;
  handleCancel: (id: string) => Promise<void>;
  canceling: string | null;
}

const CitaCard: FC<CitaCardProps> = ({
  cita,
  IconState,
  configState,
  handleCancel,
  canceling,
}) => {
  return (
    <div
      key={cita._id}
      className="p-5 transition bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#1E3A5F] mb-1">
            {cita.servicio_id?.nombre || "Servicio no disponible"}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            Proveedor: {cita.proveedor_id?.nombre || "Proveedor no disponible"}
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
          <p className="text-[#F59E0B] font-bold mt-2">
            ${cita.servicio_id?.precio?.toLocaleString() || 0}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${configState[cita.estado]?.color}`}
          >
            <IconState size={12} />
            {configState[cita.estado]?.label}
          </span>

          {cita.estado === "pendiente" && (
            <button
              onClick={() => handleCancel(cita._id)}
              disabled={canceling === cita._id}
              className="text-sm text-red-500 transition hover:text-red-600"
            >
              {canceling === cita._id ? "canceling..." : "Cancelar cita"}
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
