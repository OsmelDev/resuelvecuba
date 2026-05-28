"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCitaStore } from "@/app/store/citaStore";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useClientActions } from "../../hooks/useClientAction";
import FormularioDeSolicitud from "../../components/Clients/FormularioDeSolicitud";
import LoadingComponent from "@/app/components/LoadingComponent";

export default function SolicitarCitaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { crearCita } = useCitaStore();
  const { cargarServicio, servicio, loading } = useClientActions();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fecha: "",
    hora_inicio: "",
    tipo_cita: "hora_exacta" as "hora_exacta" | "rango",
    rango_horario: "",
  });

  useEffect(() => {
    cargarServicio(id);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError("");

    if (!formData.fecha) {
      setError("Selecciona una fecha");
      setEnviando(false);
      return;
    }

    let horaInicio = formData.hora_inicio;
    let horaFin = undefined;

    if (formData.tipo_cita === "rango") {
      const [inicio, fin] = formData.rango_horario.split("-");
      horaInicio = inicio.trim();
      horaFin = fin.trim();
    }

    if (!horaInicio) {
      setError("Selecciona un horario");
      setEnviando(false);
      return;
    }
    const result = await crearCita({
      servicio_id: id,
      proveedor_id: servicio!.proveedor_id._id,
      fecha: formData.fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      tipo_cita: formData.tipo_cita,
    });

    if (result.success) {
      router.push("/cliente/mis-citas?success=true");
    } else {
      setError(result.error || "Error al solicitar cita");
      setEnviando(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (!servicio) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-4 text-center text-red-600 rounded-lg bg-red-50">
          Servicio no encontrado
        </div>
      </div>
    );
  }

  // Fecha mínima (mañana)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/cliente/servicio/${id}`}
          className="p-2 text-gray-500 transition hover:text-gray-700"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Solicitar Cita</h1>
          <p className="mt-1 text-gray-600">
            Agenda tu servicio con {servicio.proveedor_id.nombre}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Info del servicio */}
        <div className="p-4 mb-2 h-full rounded-lg bg-gray-50 flex justify-center gap-10 flex-col">
          <h3 className="font-semibold text-gray-800">{servicio.nombre}</h3>
          <p className="mt-1 font-bold text-green-600">
            ${servicio.precio.toLocaleString()}
          </p>
          <p className="mt-1 font-normal text-gray-600">
            {servicio.descripcion}
          </p>
        </div>

        {/* Formulario */}

        <FormularioDeSolicitud
          error={error}
          minDateStr={minDateStr}
          formData={formData}
          setFormData={setFormData}
          id={id}
          enviando={enviando}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
