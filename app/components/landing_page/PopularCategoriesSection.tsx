import React from "react";

const PopularCategories = () => {
  return (
    <section className="py-16 bg-white ">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
            Categorías populares
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Miles de profesionales listos para ayudarte
          </p>
        </div>

        <div className="grid max-w-4xl grid-cols-2 gap-4 mx-auto md:grid-cols-4">
          {[
            { icon: "🔧", name: "Plomería", color: "hover:border-[#3B82F6]" },
            {
              icon: "⚡",
              name: "Electricidad",
              color: "hover:border-[#F59E0B]",
            },
            { icon: "🧹", name: "Limpieza", color: "hover:border-[#3B82F6]" },
            {
              icon: "📦",
              name: "Productos",
              color: "hover:border-[#F59E0B]",
            },
          ].map((cat) => (
            <div
              key={cat.name}
              className={`bg-[#F3F4F6] rounded-xl p-4 text-center hover:shadow-md transition-all cursor-pointer ${cat.color} border-2 border-transparent`}
            >
              <div className="mb-2 text-3xl">{cat.icon}</div>
              <p className="font-medium text-[#1E3A5F]">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
