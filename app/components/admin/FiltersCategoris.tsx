import { Filter, Plus } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import FilterButton from "../ui/Button";

interface FiltersProps {
  setEstadoFiltro: Dispatch<SetStateAction<string>>;
  estadoFiltro: string;
  openModal: Dispatch<SetStateAction<boolean>>;
}

const FiltersCategoris: FC<FiltersProps> = ({
  setEstadoFiltro,
  openModal,
  estadoFiltro,
}) => {
  const filtros = [
    {
      label: "Todas",
      value: "",
    },
    {
      label: "Servicios",
      value: "Servicios",
    },
    {
      label: "Productos",
      value: "Productos",
    },
  ];

  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow flex justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <Filter size={18} className="text-gray-400" />
        {filtros.map((filter) => (
          <FilterButton
            label={filter.label}
            filter={estadoFiltro}
            action={() => setEstadoFiltro(filter.value)}
            key={filter.label}
            id={filter.value}
          />
        ))}
      </div>

      <button
        className="  flex items-center gap-2 px-4 py-1 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        onClick={() => openModal(true)}
      >
        <Plus size={20} />
        Crear Categoria
      </button>
    </div>
  );
};

export default FiltersCategoris;
