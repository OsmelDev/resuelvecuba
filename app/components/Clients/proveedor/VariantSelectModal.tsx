import { ItemProveedor } from "@/app/types/dataTypes";
import { ShoppingBag, X } from "lucide-react";
import { FC, SetStateAction } from "react";

interface VariantSelectModalProps {
  product: ItemProveedor;
  selectedVariant: Record<string, string>;
  openModal: (value: SetStateAction<boolean>) => void;
  handleVarianteChange: (tipo: string, valor: string) => void;
  handleBuy: () => void;
}

const VariantSelectModal: FC<VariantSelectModalProps> = ({
  product,
  openModal,
  handleVarianteChange,
  selectedVariant,
  handleBuy,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#1E3A5F]">{product.nombre}</h2>
          <button
            onClick={() => openModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600">{product.descripcion}</p>

        <p className="text-2xl font-bold text-[#F59E0B] mb-4">
          ${product.precio.toLocaleString()}
        </p>

        {/* Selectores de variantes */}
        {product.variantes && (
          <div className="mb-6 space-y-4">
            {product.variantes.tipo === "talla_color" ? (
              <>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Selecciona talla
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["S", "M", "L", "XL", "XS", "XXL"]
                      .filter((talla) =>
                        product.variantes?.opciones.includes(talla),
                      )
                      .map((talla) => (
                        <button
                          key={talla}
                          type="button"
                          onClick={() => handleVarianteChange("talla", talla)}
                          className={`px-4 py-2 rounded-xl border transition ${
                            selectedVariant.talla === talla
                              ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                              : "border-gray-300 text-gray-700 hover:border-[#3B82F6]"
                          }`}
                        >
                          {talla}
                        </button>
                      ))}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Selecciona color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variantes.opciones
                      .filter(
                        (opcion: string) =>
                          !["S", "M", "L", "XL", "XS", "XXL"].includes(opcion),
                      )
                      .map((color: string) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleVarianteChange("color", color)}
                          className={`px-4 py-2 rounded-xl border transition ${
                            selectedVariant.color === color
                              ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                              : "border-gray-300 text-gray-700 hover:border-[#3B82F6]"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Selecciona{" "}
                  {product.variantes.tipo === "talla" ? "talla" : "color"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variantes.opciones.map((opcion: string) => (
                    <button
                      key={opcion}
                      type="button"
                      onClick={() =>
                        handleVarianteChange(
                          product.variantes?.tipo === "talla"
                            ? "talla"
                            : "color",
                          opcion,
                        )
                      }
                      className={`px-4 py-2 rounded-xl border transition ${
                        selectedVariant[
                          product.variantes?.tipo === "talla"
                            ? "talla"
                            : "color"
                        ] === opcion
                          ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                          : "border-gray-300 text-gray-700 hover:border-[#3B82F6]"
                      }`}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => openModal(false)}
            className="flex-1 px-4 py-2 text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleBuy}
            className="flex-1 flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white px-4 py-2 rounded-xl transition-colors"
          >
            <ShoppingBag size={18} />
            Enviar por WhatsApp
          </button>
        </div>

        <p className="mt-4 text-xs text-center text-gray-400">
          Se abrirá WhatsApp con el mensaje predefinido
        </p>
      </div>
    </div>
  );
};

export default VariantSelectModal;
