import { Service } from "@/app/types/dataTypes";
import { Star } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  console.log(service);
  return (
    <div className="transition bg-white border rounded-lg shadow hover:shadow-lg group ">
      <div className="flex flex-col justify-between p-5">
        {/* Categoría */}
        <div className="flex items-start justify-between mb-2">
          <span className="px-2 py-1 text-xs text-blue-600 rounded-full bg-blue-50">
            {service.categoria.nombre}
          </span>
          {/* Calificación (implementar después) */}
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">
              {service.proveedor_id?.calificacion_promedio || "Nuevo"}
            </span>
          </div>
        </div>

        {/* Nombre */}
        <h3 className="mb-1 text-lg font-semibold text-gray-800 transition group-hover:text-blue-600">
          {service.nombre}
        </h3>

        {/* Proveedor */}
        <p className="mb-2 text-sm text-gray-500">
          {service.proveedor_id?.nombre}
        </p>

        {/* Descripción */}
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {service.descripcion}
        </p>

        {/* Precio */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ${service.precio.toLocaleString()}
            </span>
          </div>
          {service.tipo === "servicio" ? (
            <Link
              href={`/cliente/details/servicio/${service._id}`}
              className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Ver detalles
            </Link>
          ) : (
            <Link
              href={`/cliente/details/product/${service._id}`}
              className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Ver detalles
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
