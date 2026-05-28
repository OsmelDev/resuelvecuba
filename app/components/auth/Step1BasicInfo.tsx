"use client";

import { useRegisterStore } from "@/app/store/registerStore";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Step1BasicInfo() {
  const { data, updateData, error } = useRegisterStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-3">
      {/* Tipo de cuenta - Botones */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tipo de cuenta
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => updateData("tipo", "cliente")}
            className={`flex-1 py-1 px-4 rounded-lg font-medium transition text-xs ${
              data.tipo === "cliente"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Cliente
          </button>
          <button
            type="button"
            onClick={() => updateData("tipo", "proveedor")}
            className={`flex-1 py-2 text-xs  px-4 rounded-lg font-medium transition ${
              data.tipo === "proveedor"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Proveedor
          </button>
        </div>
      </div>

      {/* Nombre y Apellidos */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <div className="relative">
            <User
              size={18}
              className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
            />
            <input
              type="text"
              value={data.nombre}
              onChange={(e) => updateData("nombre", e.target.value)}
              className="w-full py-1 pl-10 pr-3 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Juan"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Apellidos *
          </label>
          <input
            type="text"
            value={data.apellidos}
            onChange={(e) => updateData("apellidos", e.target.value)}
            className="w-full px-3 py-1 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Pérez"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Correo electrónico *
        </label>
        <div className="relative">
          <Mail
            size={18}
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData("email", e.target.value)}
            className="w-full py-1 pl-10 pr-3 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="juan@email.com"
          />
        </div>
      </div>

      {/* Teléfono */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Teléfono móvil (WhatsApp) *
        </label>
        <div className="relative">
          <Phone
            size={18}
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            type="tel"
            value={data.telefono}
            onChange={(e) => updateData("telefono", e.target.value)}
            className="w-full py-1 pl-10 pr-3 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+56 9 1234 5678"
          />
        </div>
      </div>

      {/* Contraseña */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Contraseña *
        </label>
        <div className="relative">
          <Lock
            size={18}
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) => updateData("password", e.target.value)}
            className="w-full py-1 pl-10 pr-10 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirmar contraseña */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Repetir contraseña *
        </label>
        <div className="relative">
          <Lock
            size={18}
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={data.confirmPassword}
            onChange={(e) => updateData("confirmPassword", e.target.value)}
            className="w-full py-1 pl-10 pr-10 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 rounded-lg bg-red-50">
          {error}
        </div>
      )}
    </div>
  );
}
