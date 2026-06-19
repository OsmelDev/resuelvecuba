import { Proveedor } from "@/app/types/dataTypes";
import {
  AlertCircle,
  Home,
  Mail,
  MapPin,
  Package,
  Phone,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import React, { FC } from "react";
interface HeaderProps {
  proveedor: Proveedor;
  esServicios: boolean;
}
const Header: FC<HeaderProps> = ({ proveedor, esServicios }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {esServicios ? (
              <Wrench size={24} className="text-[#3B82F6]" />
            ) : (
              <Package size={24} className="text-[#F59E0B]" />
            )}
            <h1 className="text-2xl font-bold text-[#1E3A5F]">
              {proveedor.negocio || proveedor.nombre}
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              {proveedor.calificacion_promedio || "Nuevo"}(
              {proveedor.total_resenas || 0} reseñas)
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {proveedor.ubicacion?.ciudad || "Ubicación no especificada"}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-gray-400" />
              <a
                href={`tel:${proveedor.telefono}`}
                className="text-[#3B82F6] hover:text-[#F59E0B] transition"
              >
                {proveedor.telefono}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail size={14} className="text-gray-400" />
              <a
                href={`mailto:${proveedor.email}`}
                className="text-[#3B82F6] hover:text-[#F59E0B] transition"
              >
                {proveedor.email}
              </a>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {esServicios && proveedor.servicioDomicilio && (
            <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              <Home size={14} />
              Servicio a domicilio
            </span>
          )}
          {!esServicios && proveedor.ofrece_envio && (
            <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              <Truck size={14} />
              Ofrece envíos
            </span>
          )}
          {!esServicios && proveedor.politica_devolucion && (
            <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              <AlertCircle size={14} />
              Devoluciones
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
