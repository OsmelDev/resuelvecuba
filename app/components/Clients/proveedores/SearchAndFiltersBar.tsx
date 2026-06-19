import { Filter, MapPin, Package, Search, Wrench } from "lucide-react";
import React, { FC, FormEvent, SetStateAction } from "react";

interface SearchAndFilterBarPrios {
  find: (e: FormEvent<Element>) => void;
  searchTerm: string;
  setSearchTerm: (value: SetStateAction<string>) => void;
  ciudad: string;
  setCiudad: (value: SetStateAction<string>) => void;
  setMostrarFiltros: (value: SetStateAction<boolean>) => void;
  mostrarFiltros: boolean;
  changeFilterType: (value: SetStateAction<string>) => void;
  filterType: string;
  onClear: () => void;
}

const SearchAndFiltersBar: FC<SearchAndFilterBarPrios> = ({
  find,
  setSearchTerm,
  setCiudad,
  setMostrarFiltros,
  changeFilterType,
  searchTerm,
  ciudad,
  mostrarFiltros,
  onClear,
  filterType,
}) => {
  return (
    <div className="p-4 mb-6 bg-white shadow-sm rounded-xl">
      <form onSubmit={find} className="flex flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search
              size={18}
              className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o negocio..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
            />
          </div>
        </div>
        <div className="md:w-48">
          <div className="relative">
            <MapPin
              size={18}
              className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
            />
            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="Ciudad"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#3B82F6] hover:bg-[#F59E0B] text-white px-6 py-2 rounded-xl transition-colors duration-300"
        >
          Buscar
        </button>
      </form>

      {/* Botón filtros móvil */}
      <button
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
        className="md:hidden flex items-center gap-2 mt-3 text-[#1E3A5F] w-full justify-center py-2 border border-gray-200 rounded-xl"
      >
        <Filter size={16} />
        {mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
      </button>

      {/* Filtros de tipo */}
      <div
        className={`${mostrarFiltros ? "block" : "hidden md:block"} mt-4 pt-3 border-t`}
      >
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => changeFilterType("")}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              filterType === ""
                ? "bg-[#1E3A5F] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => changeFilterType("servicios")}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1 ${
              filterType === "servicios"
                ? "bg-[#1E3A5F] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Wrench size={14} />
            Servicios
          </button>
          <button
            onClick={() => changeFilterType("productos")}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1 ${
              filterType === "productos"
                ? "bg-[#1E3A5F] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Package size={14} />
            Productos
          </button>

          {(filterType || searchTerm || ciudad) && (
            <button
              onClick={onClear}
              className="text-sm text-[#F59E0B] hover:text-[#D97706] transition"
            >
              Limpiar filtros ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFiltersBar;
