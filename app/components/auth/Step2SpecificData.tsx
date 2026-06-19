"use client";

import { useRegisterStore } from "@/app/store/registerStore";
import { Building2, MapPin, Phone, Truck, Package, Wrench } from "lucide-react";

export default function Step2SpecificData() {
  const { data, updateData } = useRegisterStore();

  if (data.tipo === "cliente") {
    return (
      <div className="space-y-5">
        <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl">
          <h3 className="font-semibold text-[#1E3A5F] mb-2">
            Resumen de tu cuenta
          </h3>
          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <strong>Nombre:</strong> {data.nombre} {data.apellidos}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {data.telefono}
            </p>
          </div>
        </div>

        <div className="p-4 text-sm text-center text-gray-500 border border-gray-100 bg-gray-50 rounded-xl">
          Como cliente, podrás buscar y contratar servicios o comprar productos.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Nombre del negocio *
        </label>
        <div className="relative">
          <Building2
            size={18}
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            type="text"
            value={data.negocio}
            onChange={(e) => updateData("negocio", e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
            placeholder="Mi Negocio SPA"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Dirección completa *
        </label>
        <div className="relative">
          <MapPin size={18} className="absolute text-gray-400 left-3 top-3" />
          <textarea
            rows={2}
            value={data.direccion}
            onChange={(e) => updateData("direccion", e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition resize-none"
            placeholder="Calle, número, ciudad, provincia"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Teléfono fijo (opcional)
        </label>
        <div className="relative">
          <Phone
            size={18}
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            type="tel"
            value={data.telefonoFijo}
            onChange={(e) => updateData("telefonoFijo", e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
            placeholder="+53 7 123 4567"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          ¿Qué ofreces? *
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              updateData("tipo_oferta", "servicios");
              updateData("servicioDomicilio", data.servicioDomicilio);
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
              data.tipo_oferta === "servicios"
                ? "bg-[#3B82F6] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Wrench size={18} />
            Servicios
          </button>
          <button
            type="button"
            onClick={() => {
              updateData("tipo_oferta", "productos");
              updateData("servicioDomicilio", false);
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
              data.tipo_oferta === "productos"
                ? "bg-[#3B82F6] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Package size={18} />
            Productos
          </button>
        </div>
      </div>

      {data.tipo_oferta === "servicios" && (
        <div className="p-4 bg-gray-50 rounded-xl">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={data.servicioDomicilio}
                onChange={(e) =>
                  updateData("servicioDomicilio", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#3B82F6] transition"></div>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-gray-500" />
              <span className="text-sm text-gray-700">
                Ofrezco servicio a domicilio
              </span>
            </div>
          </label>
          <p className="mt-2 ml-12 text-xs text-gray-400">
            Los clientes podrán solicitar que te desplaces a su ubicación
          </p>
        </div>
      )}

      {data.tipo_oferta === "productos" && (
        <div className="pt-4 space-y-4 border-t border-gray-100">
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={data.ofrece_envio}
                  onChange={(e) => updateData("ofrece_envio", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#3B82F6] transition"></div>
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-gray-500" />
                <span className="text-sm text-gray-700">
                  Ofrezco envío de productos
                </span>
              </div>
            </label>
            <p className="mt-2 ml-12 text-xs text-gray-400">
              Los clientes podrán consultar costos de envío por WhatsApp
            </p>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Política de devolución (opcional)
            </label>
            <textarea
              rows={2}
              value={data.politica_devolucion}
              onChange={(e) =>
                updateData("politica_devolucion", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition resize-none"
              placeholder="Ej: 30 días para devoluciones, producto debe estar en su empaque original..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
