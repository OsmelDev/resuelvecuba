import { Calendar, Search, Star, TrendingUp } from "lucide-react";
import React from "react";

const StatsCards = () => {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-4">
      <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <Search size={28} className="text-[#3B82F6]" />
          <span className="text-2xl font-bold text-[#1E3A5F]">0</span>
        </div>
        <h3 className="text-gray-600">Búsquedas realizadas</h3>
      </div>

      <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <Calendar size={28} className="text-[#F59E0B]" />
          <span className="text-2xl font-bold text-[#1E3A5F]">0</span>
        </div>
        <h3 className="text-gray-600">Citas agendadas</h3>
      </div>

      <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <Star size={28} className="text-yellow-400" />
          <span className="text-2xl font-bold text-[#1E3A5F]">0</span>
        </div>
        <h3 className="text-gray-600">Calificaciones</h3>
      </div>

      <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <TrendingUp size={28} className="text-green-500" />
          <span className="text-2xl font-bold text-[#1E3A5F]">0</span>
        </div>
        <h3 className="text-gray-600">Servicios contratados</h3>
      </div>
    </div>
  );
};

export default StatsCards;
