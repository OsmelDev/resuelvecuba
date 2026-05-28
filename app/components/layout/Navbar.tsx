"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { useEffect } from "react";
import { useNotificacionStore } from "@/app/store/notificacionStore";
import Notificaciones from "../ui/Notificaciones";

export default function Navbar() {
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading } = useAuthStore();
  const { conectarSocket } = useNotificacionStore();

  const handleLogout = async () => {
    const ok = await logout();
    if (ok) {
      router.push("/");
      router.refresh();
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      conectarSocket(user._id);
    }
  }, [isAuthenticated, user?._id, conectarSocket]);

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container flex items-center justify-between px-2 py-2 mx-auto">
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 transition hover:text-blue-700"
        >
          Atajo
        </Link>

        <div className="flex items-center gap-4">
          {!isLoading && isAuthenticated && user ? (
            <>
              {user.role === "admin" && (
                <>
                  <Link
                    href="/admin/dashboard"
                    className="text-sm text-purple-600 transition hover:text-purple-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/proveedores"
                    className="text-sm text-purple-600 transition hover:text-purple-800"
                  >
                    Proveedores
                  </Link>
                  <Link
                    href="/admin/moderacion"
                    className="text-sm text-purple-600 transition hover:text-purple-800"
                  >
                    Moderacion
                  </Link>
                </>
              )}
              {user.role === "cliente" && (
                <>
                  <Link
                    href="/cliente/dashboard"
                    className="text-sm text-blue-600 transition hover:text-blue-800"
                  >
                    Mi Panel
                  </Link>
                  <Link
                    href="/cliente/buscar"
                    className="text-sm text-blue-600 transition hover:text-blue-800"
                  >
                    Buscar Servicios
                  </Link>

                  <Link
                    href="/cliente/mis-citas"
                    className="text-sm text-blue-600 transition hover:text-blue-800"
                  >
                    Mis Citas
                  </Link>
                </>
              )}
              {user.role === "proveedor" && user.activo && (
                <>
                  <Link
                    href="/proveedor/dashboard"
                    className="text-sm text-blue-600 transition hover:text-blue-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/proveedor/mis-servicios"
                    className="text-sm text-blue-600 transition hover:text-blue-800"
                  >
                    Mis Servicios
                  </Link>
                  <Link
                    href="/proveedor/mis-citas"
                    className="text-sm text-blue-600 transition hover:text-blue-800"
                  >
                    Citas
                  </Link>
                </>
              )}
              {user.role === "proveedor" && !user.activo && (
                <>
                  <Link
                    href="/proveedor/espera-activacion"
                    className="text-sm text-yellow-600 transition hover:text-yellow-800"
                  >
                    Espera Activación
                  </Link>
                  <Link
                    href="/proveedor/dashboard"
                    className="text-sm text-blue-600 transition hover:text-blue-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/proveedor/mis-servicios"
                    className="text-sm text-blue-600 transition hover:text-blue-800"
                  >
                    {user.tipo_oferta === "servicio"
                      ? "Mis Servicios"
                      : "Mis Productos"}
                  </Link>
                </>
              )}
              <span className="text-sm text-gray-700">{user.nombre}</span>
              <Notificaciones />
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-white transition bg-red-500 rounded-lg hover:bg-red-600"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-blue-600 transition hover:text-blue-800"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="px-4 py-1 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
