import { Users } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="p-12 text-center bg-white rounded-lg shadow">
      <Users size={48} className="mx-auto mb-4 text-gray-400" />
      <h3 className="mb-2 text-lg font-medium text-gray-900">
        No hay proveedores
      </h3>
      <p className="text-gray-500">
        No se encontraron proveedores con los filtros seleccionados
      </p>
    </div>
  );
};

export default NotFound;
