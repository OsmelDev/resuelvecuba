import { Filter } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import FilterButton from "../ui/Button";

interface FiltersProps {
  setEstadoFiltro: Dispatch<SetStateAction<string>>;
  estadoFiltro: string;
}

const Filters: FC<FiltersProps> = ({ setEstadoFiltro, estadoFiltro }) => {
  const filtros = [
    {
      label: "Todos",
      value: "",
    },
    {
      label: "Activos",
      value: "activo",
    },
    {
      label: "En Prueba",
      value: "prueba",
    },
    {
      label: "Expirados",
      value: "expirado",
    },
    {
      label: "Suspendidos",
      value: "suspendido",
    },
  ];

  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow">
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
    </div>
  );
};

export default Filters;
