"use client";
import LogoSimple from "../ui/LogoSimple";
import { useMobile } from "@/app/hooks/use-mobile";
import { useAuthStore } from "@/app/store/authStore";
import Link from "next/link";

const Hero = () => {
  const { isMobile } = useMobile();
  const { user } = useAuthStore();

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container px-4 py-4 mx-auto md:py-12">
        {/* Logo centrado */}
        <div className="flex justify-center p-2 mb-4 md:p-8">
          {isMobile ? (
            <LogoSimple showIcon={false} variant="full" size="md" />
          ) : (
            <LogoSimple variant="full" size="lg" />
          )}
        </div>

        {/* Título principal */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-[#1E3A5F] mb-6 leading-tight">
            Encuentra profesionales de{" "}
            <span className="text-[#3B82F6]">confianza</span> en Cuba
          </h1>
          <p className="mb-8 text-sm text-gray-600 md:text-xl">
            Conectamos clientes con los mejores proveedores de servicios y
            productos. Fácil, rápido y seguro.
          </p>

          {!user && (
            <Link
              href="/login"
              className="px-8 py-4 text-white transition bg-blue-600 rounded-lg hover:bg-orange-500"
            >
              Comenzar ahora
            </Link>
          )}
        </div>

        {/* Ilustración decorativa */}
        <div className="flex items-center justify-center mt-16">
          <div className="grid max-w-md grid-cols-3 gap-8">
            <div className="p-4 text-center bg-white shadow-md rounded-xl">
              <div className="mb-2 text-3xl">🔍</div>
              <p className="text-sm font-medium text-[#1E3A5F]">Busca</p>
            </div>
            <div className="p-4 text-center transform bg-white shadow-md rounded-xl">
              <div className="mb-2 text-3xl">🤝</div>
              <p className="text-sm font-medium text-[#1E3A5F]">Conecta</p>
            </div>
            <div className="p-4 text-center bg-white shadow-md rounded-xl">
              <div className="mb-2 text-3xl">✅</div>
              <p className="text-sm font-medium text-[#1E3A5F]">Resuelve</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
