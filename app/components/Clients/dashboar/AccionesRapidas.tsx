import { Calendar, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const AccionesRapidas = () => {
  return (
    <div className="p-6 mb-8 bg-white shadow-sm rounded-xl">
      <h2 className="text-xl font-semibold text-[#1E3A5F] mb-4">
        Acciones rápidas
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Link
          href="/cliente/proveedores"
          className="flex items-center justify-center gap-2 bg-[#3B82F6] text-white p-3 rounded-xl hover:bg-[#F59E0B] transition-colors"
        >
          <Search size={18} />
          Buscar profesionales
        </Link>
        <Link
          href="/cliente/mis-citas"
          className="flex items-center justify-center gap-2 border-2 border-[#3B82F6] text-[#1E3A5F] p-3 rounded-xl hover:bg-[#3B82F6] hover:text-white transition-all"
        >
          <Calendar size={18} />
          Mis citas
        </Link>
      </div>
    </div>
  );
};

export default AccionesRapidas;
