import { Categoria } from "@/app/store/categoriesStore";
import { FC } from "react";

interface CategoriasTableProps {
  categorias: Categoria[];
  estadoFiltro: string;
}

const CategoriasTable: FC<CategoriasTableProps> = ({ categorias }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                Nombre
              </th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                -
              </th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                -
              </th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                -
              </th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                Creada
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categorias.map((categoria) => {
              const day = new Date(categoria.createdAt).getDay();
              const month = new Date(categoria.createdAt).getMonth();
              const year = new Date(categoria.createdAt).getFullYear();

              const fecha = `${day}/${month}/${year}`;
              return (
                <tr key={categoria._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {categoria.nombre}
                    </div>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">{String(fecha)}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriasTable;
