import { ItemProveedor, Proveedor } from "@/app/types/dataTypes";
import { CheckCircle, Clock, ShoppingBag } from "lucide-react";
import React, { FC } from "react";

interface ServiceCardProps {
  item: ItemProveedor;
  openModal: (item: ItemProveedor) => void;
  telefono: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ item, openModal, telefono }) => {
  return (
    <div
      key={item._id}
      className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-[#1E3A5F]">{item.nombre}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {item.descripcion}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-[#F59E0B]">
            ${item.precio.toLocaleString()}
          </p>
          {item.tipo === "producto" && item.unidad_medida && (
            <p className="text-xs text-gray-400">por {item.unidad_medida}</p>
          )}
        </div>
      </div>

      {/* Detalles específicos para servicios */}
      {item.tipo === "servicio" && (
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
          {item.duracion_estimada && (
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {item.duracion_estimada}
            </div>
          )}
          {item.incluye_materiales && (
            <div className="flex items-center gap-1">
              <CheckCircle size={12} />
              Incluye materiales
            </div>
          )}
        </div>
      )}

      {/* Botón */}
      <div className="mt-4">
        {item.tipo === "servicio" ? (
          <button
            onClick={() => {
              if (telefono) {
                const mensaje = `Hola, vi tu servicio "${item.nombre}" en ResuelveCuba.%0A%0A💰 Precio: $${item.precio.toLocaleString()}%0A%0A¿Podrías darme más información?`;
                window.open(
                  `https://wa.me/${telefono}?text=${mensaje}`,
                  "_blank",
                );
              }
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#F59E0B] text-white py-2 rounded-xl transition-colors"
          >
            <ShoppingBag size={16} />
            Solicitar por WhatsApp
          </button>
        ) : (
          <button
            onClick={() => openModal(item)}
            className="w-full flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#F59E0B] text-white py-2 rounded-xl transition-colors"
          >
            <ShoppingBag size={16} />
            Comprar por WhatsApp
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
