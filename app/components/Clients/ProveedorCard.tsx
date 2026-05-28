import { Proveedor } from "@/app/types/dataTypes";
import { Home, MapPin, Package, Star, Truck, Wrench } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ServiceCardProps {
  proveedor: Proveedor;
}

const ProveedorCard: FC<ServiceCardProps> = ({ proveedor }) => {
  return (
    // <div className="transition bg-gray-100 rounded-lg shadow-gray-400 shadow-sm hover:shadow-lg hover:shadow-gray-400 group h-80 cursor-pointer">
    //   <div className="p-5 flex flex-col justify-between h-full">
    //     {/* Categoría */}
    //     <div className="flex items-start justify-between mb-2">
    //       <span className="px-2 py-1 text-md text-blue-600 rounded-lg bg-blue-50">
    //         {proveedor.negocio}
    //       </span>
    //       {/* Calificación (implementar después) */}
    //       <div className="flex items-center gap-1">
    //         <Star size={16} className="text-yellow-400 fill-current" />
    //         <span className="text-md text-gray-600">
    //           {proveedor.calificacion_promedio || "Nuevo"}
    //         </span>
    //       </div>
    //     </div>

    //     {/* Nombre */}
    //     <h3 className="mb-1 text-lg font-semibold text-gray-800 transition group-hover:text-blue-600 border">
    //       {proveedor.nombre}
    //     </h3>

    //     {/* Proveedor */}
    //     {/* <p className="mb-2 text-sm text-gray-500">
    //       {service.proveedor_id?.nombre}
    //     </p> */}

    //     {/* Descripción */}
    //     <p className="mb-3 text-sm text-gray-600 line-clamp-2">
    //       {/* {proveedor.descripcion} */}
    //     </p>
    //     <div className="flex flex-col gap-2">
    //       <div className="flex flex-col">
    //         <span className="text-[12px] text-red-600 font-semibold">
    //           Ubicacion:
    //         </span>
    //         <span className="text-[10px] text-gray-600">
    //           {proveedor.ubicacion.direccion_texto}
    //         </span>
    //       </div>
    //       <div className="flex items-center justify-between pt-3 border-t">
    //         <Link
    //           href={`/cliente/proveedor/${proveedor._id}`}
    //           className="px-4 py-2 text-xs text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
    //         >
    //           Ver detalles
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Link
      key={proveedor._id}
      href={`/cliente/proveedor/${proveedor._id}`}
      className="bg-white rounded-lg shadow border hover:shadow-lg transition group"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {proveedor.tipo_oferta === "servicios" ? (
              <Wrench size={18} className="text-blue-600" />
            ) : (
              <Package size={18} className="text-green-600" />
            )}
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {proveedor.tipo_oferta === "servicios"
                ? "Servicios"
                : "Productos"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium">
              {proveedor.calificacion_promedio || "Nuevo"}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition">
          {proveedor.negocio || proveedor.nombre}
        </h3>

        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
          <MapPin size={12} />
          {proveedor.ubicacion?.ciudad || "Ubicación no especificada"}
        </p>

        <div className="flex gap-3 mt-3 pt-3 border-t text-xs text-gray-500">
          {proveedor.tipo_oferta === "servicios" &&
            proveedor.servicioDomicilio && (
              <span className="flex items-center gap-1">
                <Home size={12} />
                Domicilio
              </span>
            )}
          {proveedor.tipo_oferta === "productos" && proveedor.ofrece_envio && (
            <span className="flex items-center gap-1">
              <Truck size={12} />
              Envíos
            </span>
          )}
          <span>{proveedor.total_resenas || 0} reseñas</span>
        </div>
      </div>
    </Link>
  );
};

export default ProveedorCard;
