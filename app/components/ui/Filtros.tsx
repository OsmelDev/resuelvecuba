import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

interface FiltroOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FiltrosProps {
  titulo?: string;
  filters: {
    key: string;
    label: string;
    type: "select" | "radio" | "checkbox" | "range";
    options?: FiltroOption[];
    min?: number;
    max?: number;
    placeholder?: string;
  }[];
  valores: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
  onApply: () => void;
  isLoading?: boolean;
}

export function Filtros({
  titulo = "Filtros",
  filters,
  valores,
  onChange,
  onReset,
  onApply,
  isLoading,
}: FiltrosProps) {
  const [expandido, setExpandido] = useState(false);

  const handleChange = (key: string, value: any) => {
    onChange(key, value);
  };

  const renderInput = (filter: (typeof filters)[0]) => {
    const value = valores[filter.key];

    switch (filter.type) {
      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) => handleChange(filter.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Todos</option>
            {filter.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="flex flex-wrap gap-2">
            {filter.options?.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleChange(filter.key, opt.value)}
                className={`px-3 py-1 rounded-full text-sm transition flex items-center gap-1 ${
                  value === opt.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        );

      case "range":
        return (
          <div className="flex gap-3 items-center">
            <input
              type="number"
              min={filter.min}
              max={filter.max}
              placeholder="Mín"
              value={value?.min || ""}
              onChange={(e) =>
                handleChange(filter.key, { ...value, min: e.target.value })
              }
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <span className="text-gray-400">—</span>
            <input
              type="number"
              min={filter.min}
              max={filter.max}
              placeholder="Máx"
              value={value?.max || ""}
              onChange={(e) =>
                handleChange(filter.key, { ...value, max: e.target.value })
              }
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const filtrosActivos = Object.keys(valores).filter((key) => {
    const val = valores[key];
    if (val === undefined || val === null || val === "") return false;
    if (typeof val === "object") {
      return val.min || val.max;
    }
    return true;
  }).length;

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      {/* Header */}
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setExpandido(!expandido)}
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <h3 className="font-medium text-gray-800">{titulo}</h3>
          {filtrosActivos > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filtrosActivos}
            </span>
          )}
        </div>
        <button type="button" className="text-gray-400 hover:text-gray-600">
          {expandido ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Body */}
      {expandido && (
        <div className="p-4 pt-0 border-t">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {filters.map((filter) => (
              <div key={filter.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {filter.label}
                </label>
                {renderInput(filter)}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
            >
              <X size={14} />
              Limpiar
            </button>
            <button
              type="button"
              onClick={onApply}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm"
            >
              {isLoading ? "Aplicando..." : "Aplicar filtros"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
