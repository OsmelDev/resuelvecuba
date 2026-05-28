import { Estadisticas } from "@/app/types/dataTypes";
import { AlertCircle, Package, TrendingUp, Users } from "lucide-react";
import { FC } from "react";

interface StadisticCardProps {
  estadisticas: Estadisticas | null;
}

const StadisticCard: FC<StadisticCardProps> = ({ estadisticas }) => {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-4">
      <div className="p-6 bg-white border-l-4 border-green-500 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Proveedores Activos</p>
            <p className="text-3xl font-bold text-gray-800">
              {estadisticas?.activos || 0}
            </p>
          </div>
          <Users size={32} className="text-green-500" />
        </div>
      </div>

      <div className="p-6 bg-white border-l-4 border-blue-500 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">En período de prueba</p>
            <p className="text-3xl font-bold text-gray-800">
              {estadisticas?.en_prueba || 0}
            </p>
          </div>
          <TrendingUp size={32} className="text-blue-500" />
        </div>
      </div>

      <div className="p-6 bg-white border-l-4 border-yellow-500 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Expirados</p>
            <p className="text-3xl font-bold text-gray-800">
              {estadisticas?.expirados || 0}
            </p>
          </div>
          <AlertCircle size={32} className="text-yellow-500" />
        </div>
      </div>

      <div className="p-6 bg-white border-l-4 border-red-500 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Suspendidos</p>
            <p className="text-3xl font-bold text-gray-800">
              {estadisticas?.suspendidos || 0}
            </p>
          </div>
          <Package size={32} className="text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default StadisticCard;
