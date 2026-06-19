import { AlertCircle, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import React, { Dispatch, FC, FormEvent, SetStateAction } from "react";

interface FormularioDeSolicitudProps {
  error: string;
  minDateStr: string;
  formData: {
    fecha: string;
    hora_inicio: string;
    tipo_cita: "hora_exacta" | "rango";
    rango_horario: string;
  };
  id: string;
  enviando: boolean;
  handleSubmit: (e: FormEvent<Element>) => Promise<void>;
  setFormData: Dispatch<
    SetStateAction<{
      fecha: string;
      hora_inicio: string;
      tipo_cita: "hora_exacta" | "rango";
      rango_horario: string;
    }>
  >;
}

const FormularioDeSolicitud: FC<FormularioDeSolicitudProps> = ({
  error,
  minDateStr,
  formData,
  id,
  enviando,
  handleSubmit,
  setFormData,
}) => {
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      {error && (
        <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Fecha */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Fecha de la cita *
        </label>
        <div className="relative">
          <Calendar
            size={18}
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            type="date"
            required
            min={minDateStr}
            value={formData.fecha}
            onChange={(e) =>
              setFormData({ ...formData, fecha: e.target.value })
            }
            className="w-full py-2 pl-10 pr-4 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tipo de cita */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tipo de cita *
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="hora_exacta"
              checked={formData.tipo_cita === "hora_exacta"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tipo_cita: "hora_exacta",
                  rango_horario: "",
                })
              }
              className="w-4 h-4 text-blue-600"
            />
            <span>Hora exacta</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="rango"
              checked={formData.tipo_cita === "rango"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tipo_cita: "rango",
                  hora_inicio: "",
                })
              }
              className="w-4 h-4 text-blue-600"
            />
            <span>Rango horario</span>
          </label>
        </div>
      </div>

      {/* Horario */}
      {formData.tipo_cita === "hora_exacta" ? (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Hora *
          </label>
          <div className="relative">
            <Clock
              size={18}
              className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
            />
            <input
              type="time"
              required
              value={formData.hora_inicio}
              onChange={(e) =>
                setFormData({ ...formData, hora_inicio: e.target.value })
              }
              className="w-full py-2 pl-10 pr-4 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Rango horario *
          </label>
          <div className="relative">
            <Clock
              size={18}
              className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
            />
            <select
              required
              value={formData.rango_horario}
              onChange={(e) =>
                setFormData({ ...formData, rango_horario: e.target.value })
              }
              className="w-full py-2 pl-10 pr-4 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecciona un rango</option>
              <option value="08:00 - 12:00">Mañana (08:00 - 12:00)</option>
              <option value="14:00 - 18:00">Tarde (14:00 - 18:00)</option>
              <option value="18:00 - 22:00">Noche (18:00 - 22:00)</option>
            </select>
          </div>
        </div>
      )}

      {/* Nota */}
      <div className="p-3 mb-4 rounded-lg bg-blue-50">
        <p className="text-sm text-blue-700">
          📌 El proveedor recibirá tu solicitud y te confirmará la cita.
        </p>
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <Link
          href={`/cliente/servicio/${id}`}
          className="flex-1 px-4 py-2 text-center text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={enviando}
          className="flex-1 px-4 py-2 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "Solicitar Cita"}
        </button>
      </div>
    </form>
  );
};

export default FormularioDeSolicitud;
