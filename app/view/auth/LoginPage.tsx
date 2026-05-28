"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";
import { useAutoClear } from "@/app/hooks/useAutoClear";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useUIStore } from "@/app/store/uiStore";

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
  } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { showToast, showLoading, hideLoading } = useUIStore();

  useAutoClear(error, clearError);
  useAutoClear(message, clearMessage);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "cliente") router.push("/cliente/dashboard");
      else if (user.role === "proveedor") router.push("/proveedor/dashboard");
      else if (user.role === "admin") router.push("/admin/dashboard");
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    showLoading("Iniciando sesión...");

    const result = await login(email, password);
    hideLoading();
    setLoading(false);

    if (!result.success) {
      showToast(result.error || "Error al iniciar sesión", "error");
    } else {
      showToast("¡Bienvenido de vuelta!", "success");
    }
  };

  return (
    <div className="  h-full top-0 z-50 flex items-center justify-center py-12 px-4 absolute border w-full bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-4 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido</h1>
          <p className="mt-1 text-gray-600">Inicia sesión en tu cuenta</p>
        </div>

        {message && (
          <div className="p-3 mb-4 text-sm text-green-700 border border-green-200 rounded-lg bg-green-50">
            {message}
          </div>
        )}

        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 transition border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                disabled={loading}
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

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 py-2 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Ingresando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>

          <div className="text-sm text-center text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
