"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { useAuthStore } from "@/app/store/authStore";
import { useAutoClear } from "@/app/hooks/useAutoClear";
import { ArrowLeft } from "lucide-react";
import LogoSimple from "@/app/components/ui/LogoSimple";
import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const {
    login,
    isAuthenticated,
    user,
    error,
    message,
    clearError,
    clearMessage,
    isLoading,
  } = useAuthStore();
  useAutoClear(error, clearError);
  useAutoClear(message, clearMessage);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "cliente") router.push("/cliente/dashboard");
      else if (user.role === "proveedor") router.push("/proveedor/dashboard");
      else if (user.role === "admin") router.push("/admin/dashboard");
    }
  }, [isAuthenticated, user, router]);

  return (
    <>
      <Head>
        <title>Iniciar Sesión | ResuelveCuba</title>
        <meta name="description" content="Accede a tu cuenta de ResuelveCuba" />
      </Head>

      <div className="flex items-center justify-center max-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="w-full max-w-md">
          {/* Botón volver */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1E3A5F] hover:text-[#3B82F6] mb-6 transition"
          >
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>

          {/* Tarjeta de login */}
          <div className="p-8 bg-white shadow-xl rounded-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <LogoSimple variant="simple" size="md" />
            </div>

            {/* Título */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-[#1E3A5F]">
                Bienvenido de vuelta
              </h1>
              <p className="mt-1 text-gray-500">Inicia sesión en tu cuenta</p>
            </div>

            {/* Mensajes */}
            {message && (
              <div className="p-3 mb-4 text-sm text-green-700 border border-green-200 bg-green-50 rounded-xl">
                {message}
              </div>
            )}

            {error && (
              <div className="p-3 mb-4 text-sm text-red-600 border border-red-200 bg-red-50 rounded-xl">
                {error}
              </div>
            )}

            <LoginForm login={login} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
}
