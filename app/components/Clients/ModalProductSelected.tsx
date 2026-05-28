import { ItemProveedor } from "@/app/types/dataTypes";
import { ShoppingBag, X } from "lucide-react";
import React, { FC, SetStateAction } from "react";

interface ModalProductSelectedProps {
  product: ItemProveedor;
  openModal: (value: SetStateAction<boolean>) => void;
  sendWhatsapp: () => void;
  changeVariants: (tipo: string, valor: string) => void;
  variant: Record<string, string>;
}

const ModalProductSelected: FC<ModalProductSelectedProps> = ({
  product,
  variant,
  openModal,
  sendWhatsapp,
  changeVariants,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="flex flex-col justify-between w-full max-w-md p-6 bg-white rounded-lg min-h-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{product.nombre}</h2>
          <button
            onClick={() => openModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600">{product.descripcion}</p>

        <p className="mb-4 text-2xl font-bold text-green-600">
          ${product.precio.toLocaleString()}
        </p>

        {/* Selectores de variantes */}
        {product.variantes && (
          <div className="mb-6 space-y-4">
            {product.variantes.tipo === "talla_color" ? (
              // Caso especial: talla y color
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
                          onClick={() => changeVariants("talla", talla)}
                          className={`px-4 py-2 rounded-lg border transition ${
                            variant.talla === talla
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 text-gray-700 hover:border-blue-600"
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
                          onClick={() => changeVariants("color", color)}
                          className={`px-2 py-1 text-xs font-bold rounded-lg border transition ${
                            variant.color === color
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 text-gray-700 hover:border-blue-600"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              // Caso normal: un solo tipo de variante
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
                        changeVariants(
                          product.variantes?.tipo === "talla"
                            ? "talla"
                            : "color",
                          opcion,
                        )
                      }
                      className={`px-2 py-1 text-xs font-bold rounded-lg border transition ${
                        variant[
                          product.variantes?.tipo === "talla"
                            ? "talla"
                            : "color"
                        ] === opcion
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-700 hover:border-blue-600"
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

        <div className="flex justify-between gap-3">
          <button
            onClick={() => openModal(false)}
            className="px-4 py-1 text-sm text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={sendWhatsapp}
            className="flex items-center justify-center gap-2 px-4 py-1 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            <ShoppingBag size={18} />
            Enviar por WhatsApp
          </button>
        </div>

        <p className="mt-4 text-xs text-center text-blue-600">
          Se abrirá WhatsApp con el mensaje predefinido
        </p>
      </div>
    </div>
  );
};

export default ModalProductSelected;
