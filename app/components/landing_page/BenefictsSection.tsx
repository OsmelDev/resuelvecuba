import React from "react";

const Beneficts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
            ¿Por qué ResuelveCuba?
          </h2>
        </div>

        <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
          <div className="p-6 text-center transition-shadow rounded-xl hover:shadow-lg">
            <div className="mb-4 text-4xl">🤝</div>
            <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">
              Confianza
            </h3>
            <p className="text-gray-600">
              Profesionales verificados y calificados por la comunidad
            </p>
          </div>
          <div className="p-6 text-center transition-shadow rounded-xl hover:shadow-lg">
            <div className="mb-4 text-4xl">⚡</div>
            <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">
              Rapidez
            </h3>
            <p className="text-gray-600">
              Contacto directo por WhatsApp, sin intermediarios
            </p>
          </div>
          <div className="p-6 text-center transition-shadow rounded-xl hover:shadow-lg">
            <div className="mb-4 text-4xl">🏠</div>
            <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">
              Cercanía
            </h3>
            <p className="text-gray-600">Profesionales cerca de tu ubicación</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Beneficts;
