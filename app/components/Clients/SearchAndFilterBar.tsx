import { Categoria } from "@/app/store/categoriesStore";
import { useServicioStore } from "@/app/store/servicioStore";
import { Filter, Search, X } from "lucide-react";
import React, { Dispatch, FC, SetStateAction } from "react";

interface SearchAndFilterBarProps {
  activeFilters: number;
  showFilters: boolean;
  filters: {
    categoria: string;
    minPrecio: string;
    maxPrecio: string;
  };
  categorias: Categoria[];
  openFilters: () => void;
  search: () => Promise<void>;
  setFilters: Dispatch<
    SetStateAction<{
      categoria: string;
      minPrecio: string;
      maxPrecio: string;
    }>
  >;
  cleanFilters: () => void;
}

const SearchAndFilterBar: FC<SearchAndFilterBarProps> = ({
  activeFilters,
  showFilters,
  filters,
  categorias,
  openFilters,
  search,
  setFilters,
  cleanFilters,
}) => {
  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <button
            onClick={openFilters}
            className="flex items-center w-full gap-2 px-4 py-2 text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50 md:w-auto"
          >
            <Filter size={18} />
            Filtros
            {activeFilters > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-600 rounded-full">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={search}
          className="flex items-center justify-center gap-2 px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Search size={18} />
          Buscar
        </button>
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <div className="pt-4 mt-4 border-t">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Categoría */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Categoría
              </label>
              <select
                value={filters.categoria}
                onChange={(e) =>
                  setFilters({ ...filters, categoria: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas las categorías</option>
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Precio mínimo */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Precio mínimo
              </label>
              <div className="relative">
                <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={filters.minPrecio}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrecio: e.target.value })
                  }
                  placeholder="0"
                  className="w-full py-2 pl-8 pr-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Precio máximo */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Precio máximo
              </label>
              <div className="relative">
                <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={filters.maxPrecio}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrecio: e.target.value })
                  }
                  placeholder="Sin límite"
                  className="w-full py-2 pl-8 pr-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {activeFilters > 0 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={cleanFilters}
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
              >
                <X size={14} />
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilterBar;
