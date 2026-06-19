import { Proveedor } from "@/app/types/dataTypes";
import { Home, MapPin, Package, Star, Truck, Wrench } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProveedorCardProps {
  proveedor: Proveedor;
}

const ProveedorCard: FC<ProveedorCardProps> = ({ proveedor }) => {
  return (
    <Link
      key={proveedor._id}
      href={`/cliente/proveedor/${proveedor._id}`}
      className="transition-all bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md group"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {proveedor.tipo_oferta === "servicios" ? (
              <Wrench size={18} className="text-[#3B82F6]" />
            ) : (
              <Package size={18} className="text-[#F59E0B]" />
            )}
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {proveedor.tipo_oferta === "servicios"
                ? "Servicios"
                : "Productos"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-[#1E3A5F]">
              {proveedor.calificacion_promedio || "Nuevo"}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-[#1E3A5F] mb-1 group-hover:text-[#3B82F6] transition">
          {proveedor.negocio || proveedor.nombre}
        </h3>

        <p className="flex items-center gap-1 mb-2 text-sm text-gray-500">
          <MapPin size={12} />
          {proveedor.ubicacion?.ciudad || "Ubicación no especificada"}
        </p>

        <div className="flex flex-wrap gap-3 pt-3 mt-3 text-xs text-gray-500 border-t">
          {proveedor.tipo_oferta === "servicios" &&
            proveedor.servicioDomicilio && (
              <span className="flex items-center gap-1">
                <Home size={12} className="text-[#3B82F6]" />
                Servicio a domicilio
              </span>
            )}
          {proveedor.tipo_oferta === "productos" && proveedor.ofrece_envio && (
            <span className="flex items-center gap-1">
              <Truck size={12} className="text-[#F59E0B]" />
              Ofrece envíos
            </span>
          )}
          <span>{proveedor.total_resenas || 0} reseñas</span>
        </div>
      </div>
    </Link>
  );
};

export default ProveedorCard;
