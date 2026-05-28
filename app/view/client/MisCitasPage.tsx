"use client";

import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
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
import CitaCard from "../../components/Clients/CitaCard";
import LoadingComponent from "../../components/LoadingComponent";

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
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  completada: {
    label: "Completada",
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
  },
  cancelada: {
    label: "Cancelada",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export default function MisCitasPage() {
  const searchParams = useSearchParams();
  const { citas, isLoading, loadCitasCliente, cancelarCita } = useCitaStore();
  const [success, setSuccess] = useState(false);
  const [cancelando, setCancelando] = useState<string | null>(null);

  useEffect(() => {
    loadCitasCliente();
    if (searchParams.get("success") === "true") {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }
  }, []);

  const handleCancelar = async (id: string) => {
    const motivo = prompt("¿Por qué deseas cancelar la cita? (opcional)");
    if (motivo === null) return;

    setCancelando(id);
    const result = await cancelarCita(id, motivo || undefined);
    if (!result.success) {
      alert(result.error);
    }
    setCancelando(null);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">Mis Citas</h1>
      <p className="mb-6 text-gray-600">Historial de tus servicios agendados</p>

      {success && (
        <div className="p-4 mb-6 text-green-700 bg-green-100 rounded-lg">
          ✅ ¡Cita solicitada exitosamente! El proveedor te confirmará pronto.
        </div>
      )}

      {citas.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-lg shadow">
          <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No tienes citas agendadas
          </h3>
          <p className="mb-4 text-gray-500">
            Explora los servicios y agenda tu primera cita
          </p>
          <Link
            href="/cliente/buscar"
            className="inline-flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Package size={18} />
            Buscar Servicios
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {citas.map((cita) => {
            const EstadoIcon = estadoConfig[cita.estado]?.icon || AlertCircle;
            return (
              <CitaCard
                estadoConfig={estadoConfig}
                EstadoIcon={EstadoIcon}
                cancelando={cancelando}
                handleCancelar={handleCancelar}
                cita={cita}
                key={cita._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
