import { Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProximasCitas = () => {
  return (
    <div className="p-6 bg-white shadow-sm rounded-xl">
      <h2 className="text-xl font-semibold text-[#1E3A5F] mb-4">
        Próximas citas
      </h2>
      <div className="py-8 text-center text-gray-500">
        <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
        <p>No tienes citas próximas</p>
        <Link
          href="/cliente/proveedores"
          className="inline-block mt-3 text-[#3B82F6] hover:text-[#F59E0B] transition"
        >
          Buscar profesionales →
        </Link>
      </div>
    </div>
  );
};

export default ProximasCitas;
