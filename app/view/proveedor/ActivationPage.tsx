"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";
import { Clock, AlertCircle, Mail, Phone } from "lucide-react";

export default function EsperaActivacion() {
  const { user } = useAuthStore();
  const [diasRestantes, setDiasRestantes] = useState<number | null>(null);

  useEffect(() => {
    if (user?.fecha_expiracion) {
      const fechaExpiracion = new Date(user.fecha_expiracion);
      const dias = Math.ceil(
        (fechaExpiracion.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      );
      setDiasRestantes(Math.max(0, dias));
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Espera de Activación | ResuelveCuba</title>
        <meta
          name="description"
          content="Tu cuenta está en proceso de activación"
        />
      </Head>

      <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
          <div className="mb-4 text-6xl">⏳</div>
          <h1 className="text-2xl font-bold text-[#1E3A5F] mb-4">
            Cuenta en espera de activación
          </h1>

          <p className="mb-4 text-gray-600">
            Tu cuenta ha sido registrada exitosamente. Estamos esperando que el
            administrador procese tu pago y active tu cuenta.
          </p>

          {diasRestantes !== null && diasRestantes > 0 && (
            <div className="p-4 mb-4 bg-blue-50 rounded-xl">
              <div className="flex items-center justify-center gap-2 text-blue-800">
                <Clock size={18} />
                <p className="text-sm">
                  Tu período de prueba tiene{" "}
                  <span className="font-bold">{diasRestantes}</span> días
                  restantes.
                </p>
              </div>
            </div>
          )}

          <div className="p-4 bg-yellow-50 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2 text-yellow-800">
              <AlertCircle size={18} />
              <p className="text-sm font-medium">Mientras esperas</p>
            </div>
            <p className="text-sm text-yellow-700">
              Puedes ir preparando tus servicios y perfil. Tan pronto el
              administrador te active, podrás comenzar a recibir clientes.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              ¿Dudas? Contacta al administrador
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <a
                href="mailto:admin@resuelvecuba.com"
                className="text-[#3B82F6] hover:text-[#F59E0B] text-sm flex items-center gap-1"
              >
                <Mail size={14} />
                admin@resuelvecuba.com
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="tel:+5351234567"
                className="text-[#3B82F6] hover:text-[#F59E0B] text-sm flex items-center gap-1"
              >
                <Phone size={14} />
                +53 5 123 4567
              </a>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block mt-6 text-[#3B82F6] hover:text-[#F59E0B] transition text-sm"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
