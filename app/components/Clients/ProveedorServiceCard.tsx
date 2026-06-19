import { ItemProveedor, Proveedor } from "@/app/types/dataTypes";
import {
  CheckCircle,
  ClipboardPaste,
  Clock,
  MessageSquare,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProveedorServiceCardProps {
  item: ItemProveedor;
  proveedor: Proveedor;
  abrirModalVariantes: (item: ItemProveedor) => void;
}

const ProveedorServiceCard: FC<ProveedorServiceCardProps> = ({
  item,
  proveedor,
  abrirModalVariantes,
}) => {
  return (
    <div
      key={item._id}
      className="flex flex-col justify-between p-4 transition border rounded-lg hover:shadow-md min-h-48"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{item.nombre}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {item.descripcion}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-green-600">
            ${item.precio.toLocaleString()}
          </p>
          {item.tipo === "producto" && item.unidad_medida && (
            <p className="text-xs text-gray-400">por {item.unidad_medida}</p>
          )}
        </div>
      </div>

      {/* Detalles específicos para servicios */}
      {item.tipo === "servicio" && (
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
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

      {/* Botón para servicios o productos con variantes */}
      <div className="mt-4">
        {item.tipo === "servicio" ? (
          <div className="flex flex-col items-center justify-between gap-2 md:gap-8 md:flex-row">
            {/* <button > */}
            <Link
              href={`/cliente/solicitar-cita/${item._id}`}
              className="flex items-center justify-center w-full gap-2 px-1 py-2 text-xs text-white transition bg-green-600 rounded-lg md:py-2 md:w-1/2 hover:bg-green-700"
            >
              <ClipboardPaste size={16} />
              Agendar Cita
            </Link>
            {/* </button> */}
            <button
              onClick={() => {
                const telefono = proveedor?.telefono;
                if (telefono) {
                  const mensaje = `Hola, vi tu servicio "${item.nombre}" en ServiciosApp.%0A%0A💰 Precio: $${item.precio.toLocaleString()}%0A%0A¿Podrías darme más información?`;
                  window.open(
                    `https://wa.me/${telefono}?text=${mensaje}`,
                    "_blank",
                  );
                }
              }}
              className="flex items-center justify-center w-full gap-2 px-2 py-2 text-xs text-white transition bg-green-600 rounded-lg md:w-1/2 hover:bg-green-700"
            >
              <MessageSquare size={16} />
              WhatsApp
            </button>
          </div>
        ) : (
          <button
            onClick={() => abrirModalVariantes(item)}
            className="flex items-center justify-center w-full gap-2 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            <ShoppingBag size={16} />
            Comprar por WhatsApp
          </button>
        )}
      </div>
    </div>
  );
};

export default ProveedorServiceCard;
