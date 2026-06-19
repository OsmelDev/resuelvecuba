"use client";

import { useRegisterStore } from "@/app/store/registerStore";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

export default function Step1BasicInfo() {
  const { data, updateData, error } = useRegisterStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tipo de cuenta *
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => updateData("tipo", "cliente")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
              data.tipo === "cliente"
                ? "bg-[#3B82F6] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <UserCircle size={18} />
            Cliente
          </button>
          <button
            type="button"
            onClick={() => updateData("tipo", "proveedor")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
              data.tipo === "proveedor"
                ? "bg-[#3B82F6] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Briefcase size={18} />
            Proveedor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
            placeholder="Pérez"
          />
        </div>
      </div>

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
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
            placeholder="juan@email.com"
          />
        </div>
      </div>

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
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
            placeholder="+53 5 1234 5678"
          />
        </div>
      </div>

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
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
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
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
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
