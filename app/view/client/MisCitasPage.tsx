"use client";

import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import Head from "next/head";
import Link from "next/link";
import { useCitaStore } from "@/app/store/citaStore";
import {
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  LucideProps,
} from "lucide-react";
import CitaCard from "@/app/components/Clients/citas/CitaCard";

const estadoConfig: Record<
  string,
  {
    label: string;
    color: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }
> = {
  pendiente: {
    label: "Pendiente",
    color: "bg-yellow-100 text-yellow-800",
    icon: AlertCircle,
  },
  confirmada: {
    label: "Confirmada",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  completada: {
    label: "Completada",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle,
  },
  cancelada: {
    label: "Cancelada",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

export default function MisCitasPage() {
  const { citas, isLoading, loadCitasCliente, cancelarCita } = useCitaStore();

  const [cancelando, setCancelando] = useState<string | null>(null);

  useEffect(() => {
    loadCitasCliente();
  }, []);

  const handleCancelar = async (id: string) => {
    const motivo = prompt("¿Por qué deseas cancelar la cita? (opcional)");
    if (motivo === null) return;

    setCancelando(id);
    const result = await cancelarCita(id, motivo || undefined);
    if (!result.success) alert(result.error);
    setCancelando(null);
  };

  return (
    <>
      <Head>
        <title>Mis Citas | ResuelveCuba</title>
        <meta name="description" content="Historial de tus citas" />
      </Head>

      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="text-3xl font-bold text-[#1E3A5F] mb-2">Mis Citas</h1>
          <p className="mb-6 text-gray-600">
            Historial de tus servicios agendados
          </p>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6]"></div>
            </div>
          ) : citas.length === 0 ? (
            <div className="p-12 text-center bg-white shadow-sm rounded-2xl">
              <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-[#1E3A5F] mb-2">
                No tienes citas agendadas
              </h3>
              <p className="mb-4 text-gray-500">
                Explora los servicios y agenda tu primera cita
              </p>
              <Link
                href="/cliente/proveedores"
                className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#F59E0B] text-white px-4 py-2 rounded-xl transition-colors"
              >
                <Package size={18} />
                Buscar profesionales
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {citas.map((cita) => {
                const EstadoIcon =
                  estadoConfig[cita.estado]?.icon || AlertCircle;
                return (
                  <CitaCard
                    IconState={EstadoIcon}
                    canceling={cancelando}
                    cita={cita}
                    configState={estadoConfig}
                    handleCancel={handleCancelar}
                    key={cita._id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
