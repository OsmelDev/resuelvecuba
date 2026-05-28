"use client";

import Link from "next/link";
import RegisterWizard from "@/app/components/auth/RegisterWizard";
import { ArrowLeft } from "lucide-react";
import { useRegisterStore } from "../../store/registerStore";

export default function RegisterPage() {
  const { isLoading } = useRegisterStore();

  return (
    <div className="  max-h-full top-0 z-50 flex items-center justify-center py-14 px-6 absolute border w-full bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        {/* Header */}
        {isLoading && (
          <div className="mb-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Crear cuenta</h1>
            <p className="mt-1 text-sm text-gray-500">
              Completa los siguientes pasos
            </p>
          </div>
        )}

        {/* Wizard */}
        <RegisterWizard />

        {/* Login link */}
        {isLoading && (
          <p className="mt-6 text-sm text-center text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Inicia sesión
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
