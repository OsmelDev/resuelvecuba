// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { useCitaStore } from "@/app/store/citaStore";
// import { ArrowLeft, Calendar, Clock } from "lucide-react";
// import { useClientActions } from "../../hooks/useClientAction";
// import FormularioDeSolicitud from "../../components/Clients/dashboar/FormularioDeSolicitud";
// import LoadingComponent from "@/app/components/LoadingComponent";

// export default function SolicitarCitaPage() {
//   const params = useParams();
//   const router = useRouter();
//   const id = params.id as string;
//   const { crearCita } = useCitaStore();
//   const { cargarServicio, servicio, loading } = useClientActions();
//   const [enviando, setEnviando] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     fecha: "",
//     hora_inicio: "",
//     tipo_cita: "hora_exacta" as "hora_exacta" | "rango",
//     rango_horario: "",
//   });

//   useEffect(() => {
//     cargarServicio(id);
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setEnviando(true);
//     setError("");

//     if (!formData.fecha) {
//       setError("Selecciona una fecha");
//       setEnviando(false);
//       return;
//     }

//     let horaInicio = formData.hora_inicio;
//     let horaFin = undefined;

//     if (formData.tipo_cita === "rango") {
//       const [inicio, fin] = formData.rango_horario.split("-");
//       horaInicio = inicio.trim();
//       horaFin = fin.trim();
//     }

//     if (!horaInicio) {
//       setError("Selecciona un horario");
//       setEnviando(false);
//       return;
//     }
//     const result = await crearCita({
//       servicio_id: id,
//       proveedor_id: servicio!.proveedor_id._id,
//       fecha: formData.fecha,
//       hora_inicio: horaInicio,
//       hora_fin: horaFin,
//       tipo_cita: formData.tipo_cita,
//     });

//     if (result.success) {
//       router.push("/cliente/mis-citas?success=true");
//     } else {
//       setError(result.error || "Error al solicitar cita");
//       setEnviando(false);
//     }
//   };

//   if (loading) {
//     return <LoadingComponent />;
//   }

//   if (!servicio) {
//     return (
//       <div className="container px-4 py-8 mx-auto">
//         <div className="p-4 text-center text-red-600 rounded-lg bg-red-50">
//           Servicio no encontrado
//         </div>
//       </div>
//     );
//   }

//   // Fecha mínima (mañana)
//   const minDate = new Date();
//   minDate.setDate(minDate.getDate() + 1);
//   const minDateStr = minDate.toISOString().split("T")[0];

//   return (
//     <div className="container max-w-4xl px-4 py-8 mx-auto">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-6">
//         <Link
//           href={`/cliente/servicio/${id}`}
//           className="p-2 text-gray-500 transition hover:text-gray-700"
//         >
//           <ArrowLeft size={24} />
//         </Link>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Solicitar Cita</h1>
//           <p className="mt-1 text-gray-600">
//             Agenda tu servicio con {servicio.proveedor_id.nombre}
//           </p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         {/* Info del servicio */}
//         <div className="p-4 mb-2 h-full rounded-lg bg-gray-50 flex justify-center gap-10 flex-col">
//           <h3 className="font-semibold text-gray-800">{servicio.nombre}</h3>
//           <p className="mt-1 font-bold text-green-600">
//             ${servicio.precio.toLocaleString()}
//           </p>
//           <p className="mt-1 font-normal text-gray-600">
//             {servicio.descripcion}
//           </p>
//         </div>

//         {/* Formulario */}

//         <FormularioDeSolicitud
//           error={error}
//           minDateStr={minDateStr}
//           formData={formData}
//           setFormData={setFormData}
//           id={id}
//           enviando={enviando}
//           handleSubmit={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { useAuthStore } from "@/app/store/authStore";
import { useCitaStore } from "@/app/store/citaStore";
import api from "@/app/services/api";
import { ArrowLeft, Calendar, Clock, AlertCircle, Loader2 } from "lucide-react";
import { useClientActions } from "@/app/hooks/useClientAction";
import LoadingComponent from "@/app/components/LoadingComponent";

interface ServicioInfo {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  proveedor_id: {
    _id: string;
    nombre: string;
  };
}

export default function SolicitarCitaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuthStore();
  const { crearCita } = useCitaStore();
  const { cargarServicio, servicio, loading } = useClientActions();

  // const [servicio, setServicio] = useState<ServicioInfo | null>(null);
  // const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fecha: "",
    hora_inicio: "",
    tipo_cita: "hora_exacta" as "hora_exacta" | "rango",
    rango_horario: "",
  });

  useEffect(() => {
    if (id) {
      cargarServicio(id);
    }
  }, [id]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setEnviando(true);
  //   setError("");

  //   if (!formData.fecha) {
  //     setError("Selecciona una fecha");
  //     setEnviando(false);
  //     return;
  //   }

  //   let horaInicio = formData.hora_inicio;
  //   let horaFin = undefined;

  //   if (formData.tipo_cita === "rango") {
  //     const [inicio, fin] = formData.rango_horario.split("-");
  //     horaInicio = inicio.trim();
  //     horaFin = fin.trim();
  //   }

  //   if (!horaInicio) {
  //     setError("Selecciona un horario");
  //     setEnviando(false);
  //     return;
  //   }

  //   const result = await crearCita({
  //     servicio_id: id,
  //     proveedor_id: servicio.proveedor_id._id,
  //     fecha: formData.fecha,
  //     hora_inicio: horaInicio,
  //     hora_fin: horaFin,
  //     tipo_cita: formData.tipo_cita,
  //   });

  //   if (result.success) {
  //     router.push("/cliente/mis-citas?success=true");
  //   } else {
  //     setError(result.error || "Error al solicitar cita");
  //     setEnviando(false);
  //   }
  // };
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
      <div className="min-h-screen flex justify-center items-center bg-[#F3F4F6]">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
          Servicio no encontrado
        </div>
      </div>
    );
  }

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <>
      <Head>
        <title>Solicitar Cita | ResuelveCuba</title>
        <meta name="description" content="Agenda tu servicio" />
      </Head>

      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href={`/cliente/servicio/${id}`}
              className="p-2 text-gray-500 hover:text-[#1E3A5F] transition"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#1E3A5F]">
                Solicitar Cita
              </h1>
              <p className="text-gray-600 mt-1">
                Agenda tu servicio con {servicio.proveedor_id.nombre}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-[#1E3A5F]">{servicio.nombre}</h3>
            <p className="text-[#F59E0B] font-bold mt-1">
              ${servicio.precio.toLocaleString()}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm flex items-start gap-2">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de la cita *
              </label>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="date"
                  required
                  min={minDateStr}
                  value={formData.fecha}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-4 h-4 text-[#3B82F6]"
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
                    className="w-4 h-4 text-[#3B82F6]"
                  />
                  <span>Rango horario</span>
                </label>
              </div>
            </div>

            {formData.tipo_cita === "hora_exacta" ? (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora *
                </label>
                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="time"
                    required
                    value={formData.hora_inicio}
                    onChange={(e) =>
                      setFormData({ ...formData, hora_inicio: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rango horario *
                </label>
                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <select
                    required
                    value={formData.rango_horario}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rango_horario: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="08:00 - 12:00">
                      Mañana (08:00 - 12:00)
                    </option>
                    <option value="14:00 - 18:00">Tarde (14:00 - 18:00)</option>
                    <option value="18:00 - 22:00">Noche (18:00 - 22:00)</option>
                  </select>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-xl p-3 mb-6">
              <p className="text-sm text-blue-700">
                📌 El proveedor recibirá tu solicitud y te confirmará la cita.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/cliente/servicio/${id}`}
                className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={enviando}
                className="flex-1 bg-[#3B82F6] hover:bg-[#F59E0B] text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-50 font-medium"
              >
                {enviando ? "Enviando..." : "Solicitar Cita"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
