import React from "react";

const Help = () => {
  return (
    <section className="py-16 bg-[#F3F4F6]">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-600">
            Tres pasos simples para resolver lo que necesitas
          </p>
        </div>

        <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-3">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">Busca</h3>
            <p className="text-gray-600">Encuentra profesionales cerca de ti</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">
              Contacta
            </h3>
            <p className="text-gray-600">
              Comunícate directamente por WhatsApp
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#1E3A5F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">
              Resuelve
            </h3>
            <p className="text-gray-600">
              Recibe el servicio o producto que necesitas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
