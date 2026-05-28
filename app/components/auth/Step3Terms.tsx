"use client";

import { useRegisterStore } from "@/app/store/registerStore";
import { CheckCircle, FileText, ScrollText } from "lucide-react";

export default function Step3Terms() {
  const { data, updateData } = useRegisterStore();

  return (
    <div className="space-y-3 pt-2">
      {/* <!-- Términos y Condiciones --> */}
      <div className="overflow-hidden border rounded-lg">
        <div className="flex items-center gap-2 px-4 py-1 border-b bg-gray-50">
          <FileText size={18} className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">
            Términos y Condiciones
          </h3>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto text-sm text-gray-600 max-h-36">
          <p>
            1. Aceptación de los términos: Al registrarte en ServiciosApp,
            aceptas cumplir con estos términos y condiciones.
          </p>
          <p>
            2. Modificaciones: Nos reservamos el derecho de modificar estos
            términos en cualquier momento.
          </p>
          <p>
            3. Privacidad: Tus datos personales serán tratados según nuestra
            política de privacidad.
          </p>
          <p>
            4. Responsabilidad: Los servicios contratados son responsabilidad
            exclusiva del proveedor.
          </p>
          <p>
            5. Cancelaciones: Las citas pueden ser canceladas con al menos 24
            horas de anticipación.
          </p>
          <p>
            6. Pagos: La plataforma no procesa pagos, estos se realizan
            directamente entre las partes.
          </p>
          <p>
            7. Conducta: Está prohibido el uso de lenguaje ofensivo o conductas
            inapropiadas.
          </p>
          <p>
            8. Verificación: Nos reservamos el derecho de verificar la identidad
            de los usuarios.
          </p>
        </div>
      </div>

      {/* <!-- Contrato de Servicio --> */}
      <div className="overflow-hidden border rounded-lg">
        <div className="flex items-center gap-2 px-4 py-1 border-b bg-gray-50">
          <ScrollText size={18} className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">Contrato de Servicio</h3>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto text-sm text-gray-600 max-h-36">
          <p>
            1. Relación contractual: Este contrato establece la relación entre
            el proveedor y el cliente.
          </p>
          <p>
            2. Obligaciones del proveedor: El proveedor se compromete a prestar
            el servicio acordado.
          </p>
          <p>
            3. Obligaciones del cliente: El cliente se compromete a pagar el
            servicio contratado.
          </p>
          <p>
            4. Garantía: El proveedor garantiza la calidad del servicio
            prestado.
          </p>
          <p>
            5. Cancelación: En caso de cancelación, se aplicarán las políticas
            establecidas.
          </p>
          <p>
            6. Resolución de conflictos: Cualquier disputa será resuelta en
            tribunales de la ciudad de Santiago.
          </p>
          <p>
            7. Confidencialidad: Ambas partes acuerdan mantener confidencialidad
            sobre la información compartida.
          </p>
          <p>
            8. Vigencia: Este contrato tiene vigencia indefinida hasta su
            terminación por cualquiera de las partes.
          </p>
        </div>
      </div>

      {/* <!-- Aceptaciones --> */}
      <div className="pt-1 space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.aceptaTerminos}
            onChange={(e) => updateData("aceptaTerminos", e.target.checked)}
            className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-xs text-gray-700">
            He leído y acepto los{" "}
            <span className="text-blue-600">Términos y Condiciones</span>
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.aceptaContrato}
            onChange={(e) => updateData("aceptaContrato", e.target.checked)}
            className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-xs text-gray-700">
            He leído y acepto el{" "}
            <span className="text-blue-600">Contrato de Servicio</span>
          </span>
        </label>
      </div>

      {data.aceptaTerminos && data.aceptaContrato && (
        <div className="flex items-center gap-2 p-1.5 text-xs text-green-700 rounded-lg bg-green-50">
          <CheckCircle size={18} />
          Has aceptado todos los términos correctamente
        </div>
      )}
    </div>
  );
}
