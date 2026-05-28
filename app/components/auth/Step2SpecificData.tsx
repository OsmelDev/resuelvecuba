"use client";

import { useRegisterStore } from "@/app/store/registerStore";
import { Building2, MapPin, Phone, Truck, Package, Wrench } from "lucide-react";

export default function Step2SpecificData() {
  const { data, updateData } = useRegisterStore();

  if (data.tipo === "cliente") {
    return (
      <div className="space-y-5">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            Resumen de tu cuenta
          </h3>
          <div className="space-y-1 text-sm text-blue-700">
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

        <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500 text-sm">
          Como cliente, podrás buscar y contratar servicios o comprar productos.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Nombre del negocio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del negocio *
        </label>
        <div className="relative">
          <Building2
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={data.negocio}
            onChange={(e) => updateData("negocio", e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Mi Negocio SPA"
          />
        </div>
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dirección completa *
        </label>
        <div className="relative">
          <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
          <textarea
            rows={2}
            value={data.direccion}
            onChange={(e) => updateData("direccion", e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Calle, número, ciudad, región"
          />
        </div>
      </div>

      {/* Teléfono fijo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono fijo (opcional)
        </label>
        <div className="relative">
          <Phone
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="tel"
            value={data.telefonoFijo}
            onChange={(e) => updateData("telefonoFijo", e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="+56 2 1234 5678"
          />
        </div>
      </div>

      {/* ✅ TIPO DE OFERTA - Servicios vs Productos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Qué ofreces? *
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              updateData("tipo_oferta", "servicios");
              updateData("servicioDomicilio", data.servicioDomicilio);
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              data.tipo_oferta === "servicios"
                ? "bg-blue-600 text-white"
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
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              data.tipo_oferta === "productos"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Package size={18} />
            Productos
          </button>
        </div>
      </div>

      {/* Campos específicos para SERVICIOS */}
      {data.tipo_oferta === "servicios" && (
        <div>
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
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-gray-500" />
              <span className="text-sm text-gray-700">
                Ofrezco servicio a domicilio
              </span>
            </div>
          </label>
          <p className="text-xs text-gray-400 mt-1 ml-12">
            Los clientes podrán solicitar que te desplaces a su ubicación
          </p>
        </div>
      )}

      {/* Campos específicos para PRODUCTOS */}
      {data.tipo_oferta === "productos" && (
        <div className="space-y-4 border-t pt-4 mt-2">
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={data.ofrece_envio}
                  onChange={(e) => updateData("ofrece_envio", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-gray-500" />
                <span className="text-sm text-gray-700">
                  Ofrezco envío de productos
                </span>
              </div>
            </label>
            <p className="text-xs text-gray-400 mt-1 ml-12">
              Los clientes podrán consultar costos de envío por WhatsApp
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Política de devolución (opcional)
            </label>
            <textarea
              rows={2}
              value={data.politica_devolucion}
              onChange={(e) =>
                updateData("politica_devolucion", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Ej: 30 días para devoluciones, producto debe estar en su empaque original..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
