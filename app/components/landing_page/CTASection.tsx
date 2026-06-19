import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#1E3A5F] to-[#3B82F6]">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          ¿Listo para resolver?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-blue-100">
          Únete a miles de cubanos que ya confían en ResuelveCuba
        </p>
        <Link
          href="/register"
          className="inline-block bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Crear cuenta gratis
        </Link>
      </div>
    </section>
  );
};

export default CTA;
