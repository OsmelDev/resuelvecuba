import { Filter, Search } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import FilterButton from "../ui/Button";

interface FiltersProps {
  setEstadoFiltro: Dispatch<SetStateAction<string>>;
  setSearchTerm: (value: SetStateAction<string>) => void;
  estadoFiltro: string;
  searchTerm: string;
}

const Filters: FC<FiltersProps> = ({
  setEstadoFiltro,
  estadoFiltro,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow">
      <div className="flex flex-col gap-3 mb-4 md:flex-row">
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
              placeholder="Buscar por nombre, email o negocio..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t">
        <Filter size={18} className="text-gray-400" />
        <button
          onClick={() => setEstadoFiltro("")}
          className={`px-3 py-1 rounded-full text-sm transition ${
            estadoFiltro === ""
              ? "bg-[#1E3A5F] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setEstadoFiltro("activo")}
          className={`px-3 py-1 rounded-full text-sm transition ${
            estadoFiltro === "activo"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Activos
        </button>
        <button
          onClick={() => setEstadoFiltro("prueba")}
          className={`px-3 py-1 rounded-full text-sm transition ${
            estadoFiltro === "prueba"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          En prueba
        </button>
        <button
          onClick={() => setEstadoFiltro("expirado")}
          className={`px-3 py-1 rounded-full text-sm transition ${
            estadoFiltro === "expirado"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Expirados
        </button>
        <button
          onClick={() => setEstadoFiltro("suspendido")}
          className={`px-3 py-1 rounded-full text-sm transition ${
            estadoFiltro === "suspendido"
              ? "bg-gray-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Suspendidos
        </button>
      </div>
    </div>
  );
};

export default Filters;
