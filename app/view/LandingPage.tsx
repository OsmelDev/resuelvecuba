"use client";
import Link from "next/link";
import { useAuthStore } from "../store/authStore";

const LandingPage = () => {
  const { user } = useAuthStore();
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mb-6 text-5xl font-bold">
          Conectamos <span className="text-blue-600">profesionales</span> con{" "}
          <span className="text-green-600">clientes</span>
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Encuentra el servicio que necesitas o haz crecer tu negocio
        </p>
        {!user && (
          <div className="flex justify-center gap-4">
            <Link
              href="/register?role=cliente"
              className="px-6 py-3 text-lg font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Soy Cliente
            </Link>
            <Link
              href="/register?role=proveedor"
              className="px-6 py-3 text-lg font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700"
            >
              Soy Proveedor
            </Link>
          </div>
        )}
      </div>
      {!user ? (
        <div className="grid gap-8 mt-20 md:grid-cols-3">
          <div className="p-6 text-center transition bg-white border shadow-sm rounded-xl hover:shadow-md">
            <div className="mb-4 text-5xl">🔍</div>
            <h3 className="mb-2 text-xl font-semibold">Busca</h3>
            <p className="text-gray-600">
              Encuentra profesionales calificados cerca de ti
            </p>
          </div>
          <div className="p-6 text-center transition bg-white border shadow-sm rounded-xl hover:shadow-md">
            <div className="mb-4 text-5xl">📅</div>
            <h3 className="mb-2 text-xl font-semibold">Agenda</h3>
            <p className="text-gray-600">
              Programa tu cita de forma rápida y sencilla
            </p>
          </div>
          <div className="p-6 text-center transition bg-white border shadow-sm rounded-xl hover:shadow-md">
            <div className="mb-4 text-5xl">⭐</div>
            <h3 className="mb-2 text-xl font-semibold">Califica</h3>
            <p className="text-gray-600">
              Comparte tu experiencia y ayuda a la comunidad
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 mt-20 md:grid-cols-3">
          <Link href="/cliente/buscar" className="cursor-pointer">
            <div className="p-6 text-center transition bg-white border shadow-sm rounded-xl hover:shadow-md">
              <div className="mb-4 text-5xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold">Busca</h3>
              <p className="text-gray-600">
                Encuentra profesionales calificados cerca de ti
              </p>
            </div>
          </Link>

          <Link href="/cliente/mis-citas" className="cursor-pointer">
            <div className="p-6 h-full text-center transition bg-white border shadow-sm rounded-xl hover:shadow-md">
              <div className="mb-4 text-5xl">📅</div>
              <h3 className="mb-2 text-xl font-semibold">Agenda</h3>
              <p className="text-gray-600">
                Programa tu cita de forma rápida y sencilla
              </p>
            </div>
          </Link>

          <div className="p-6 text-center transition bg-white border shadow-sm rounded-xl hover:shadow-md">
            <div className="mb-4 text-5xl">⭐</div>
            <h3 className="mb-2 text-xl font-semibold">Califica</h3>
            <p className="text-gray-600">
              Comparte tu experiencia y ayuda a la comunidad
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
