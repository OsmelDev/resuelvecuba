"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRegisterStore } from "@/app/store/registerStore";
import { useAuthStore } from "@/app/store/authStore";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2SpecificData from "./Step2SpecificData";
import Step3Terms from "./Step3Terms";
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react";

export default function RegisterWizard() {
  const router = useRouter();
  const { step, nextStep, prevStep, register, isLoading, error, resetData } =
    useRegisterStore();
  const { login } = useAuthStore();
  const [registroExitoso, setRegistroExitoso] = useState(false);

  // Limpiar estado al desmontar
  useEffect(() => {
    return () => {
      resetData();
    };
  }, [resetData]);

  const handleRegister = async () => {
    const result = await register();
    if (result.success) {
      setRegistroExitoso(true);
      // Auto-login después de registro exitoso
      const { data } = useRegisterStore.getState();
      await login(data.email, data.password);
      setTimeout(() => {
        if (data.tipo === "proveedor") {
          router.push("/proveedor/espera-activacion");
        } else {
          router.push("/cliente/dashboard");
        }
      }, 1500);
    }
  };

  const steps = [
    { number: 1, title: "Datos personales", component: Step1BasicInfo },
    { number: 2, title: "Datos específicos", component: Step2SpecificData },
    { number: 3, title: "Términos y condiciones", component: Step3Terms },
  ];

  const CurrentComponent = steps[step - 1].component;

  if (registroExitoso) {
    return (
      <div className="py-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          ¡Registro exitoso!
        </h2>
        <p className="mb-4 text-gray-600">Redirigiendo a tu panel...</p>
        <Loader2 size={24} className="mx-auto text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between mb-2">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`text-center flex-1 ${
                step >= s.number ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div className="text-xs font-medium">{s.title}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`h-1 flex-1 rounded-full transition ${
                step > s.number
                  ? "bg-green-500"
                  : step === s.number
                    ? "bg-blue-600"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Formulario */}
      <div className="space-y-4">
        <CurrentComponent />

        {error && (
          <div className="p-2 text-sm text-center text-red-600 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-1 text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ChevronLeft size={18} />
              Anterior
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-1 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Siguiente
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRegister}
              disabled={isLoading}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-1 text-white transition bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Registrando...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Registrarse
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
