import { useState } from "react";
import { Categoria, useCategoryStore } from "../store/categoriesStore";

export const useFilters = () => {
  const { categoris } = useCategoryStore();
  const [filteredCategoris, setFilteredCategoris] = useState<
    Categoria[] | null
  >(null);

  const filterCategoris = (estadoFiltro: string) => {
    if (!categoris) return null;

    const result = categoris.filter((cat) => {
      if (estadoFiltro === "") {
        return cat;
      }
      return cat.clasificacion === estadoFiltro;
    });

    setFilteredCategoris(result);
  };

  return {
    filterCategoris,
    filteredCategoris,
  };
};
