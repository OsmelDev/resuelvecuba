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
  const { step, nextStep, prevStep, signup, isLoading, error, resetData } =
    useRegisterStore();
  const { login } = useAuthStore();
  const [registroExitoso, setRegistroExitoso] = useState(false);

  useEffect(() => {
    return () => {
      resetData();
    };
  }, [resetData]);

  const handleRegister = async () => {
    const result = await signup();
    if (result.success) {
      setRegistroExitoso(true);
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
        <h2 className="text-2xl font-bold text-[#1E3A5F] mb-2">
          ¡Registro exitoso!
        </h2>
        <p className="mb-4 text-gray-600">Redirigiendo a tu panel...</p>
        <Loader2 size={24} className="animate-spin mx-auto text-[#3B82F6]" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-2 mb-2 sm:flex-row">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`text-center flex-1 text-sm ${
                step >= s.number ? "text-[#3B82F6]" : "text-gray-400"
              }`}
            >
              <div className="hidden font-medium sm:block">{s.title}</div>
              <div className="sm:hidden">
                {step >= s.number ? `✓ Paso ${s.number}` : `Paso ${s.number}`}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                step > s.number
                  ? "bg-green-500"
                  : step === s.number
                    ? "bg-[#3B82F6]"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <CurrentComponent />

        {error && (
          <div className="p-3 text-sm text-red-600 border border-red-200 bg-red-50 rounded-xl">
            {error}
          </div>
        )}

        {/* Botones - Responsive */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center justify-center order-2 gap-2 px-4 py-2 text-gray-700 transition border border-gray-300 sm:order-1 rounded-xl hover:bg-gray-50"
            >
              <ChevronLeft size={18} />
              Anterior
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="order-1 sm:order-2 flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#F59E0B] text-white px-4 py-2 rounded-xl transition-colors"
            >
              Siguiente
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRegister}
              disabled={isLoading}
              className="order-1 sm:order-2 flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
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
