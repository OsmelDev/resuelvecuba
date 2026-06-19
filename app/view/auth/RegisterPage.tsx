"use client";
import Link from "next/link";
import Head from "next/head";
import { ArrowLeft } from "lucide-react";
import RegisterWizard from "@/app/components/auth/RegisterWizard";
import LogoSimple from "@/app/components/ui/LogoSimple";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Crear Cuenta | ResuelveCuba</title>
        <meta
          name="description"
          content="Regístrate en ResuelveCuba y comienza a resolver"
        />
      </Head>

      <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container max-w-2xl mx-auto">
          {/* Botón volver */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1E3A5F] hover:text-[#3B82F6] mb-6 transition"
          >
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>

          {/* Tarjeta de registro */}
          <div className="p-8 bg-white shadow-xl rounded-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <LogoSimple variant="icon" size="md" />
            </div>

            {/* Título */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-[#1E3A5F]">
                Crear cuenta
              </h1>
              <p className="mt-1 text-gray-500">
                Completa los siguientes pasos
              </p>
            </div>

            {/* Wizard de registro */}
            <RegisterWizard />

            {/* Link a login */}
            <p className="mt-6 text-sm text-center text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="text-[#3B82F6] hover:text-[#F59E0B] font-medium transition"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
