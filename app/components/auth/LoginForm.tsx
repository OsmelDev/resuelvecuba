import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  login: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    error?: string | undefined;
  }>;
  isLoading: boolean;
}

const LoginForm: FC<LoginFormProps> = ({ login, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (isLoading) return;
    await login(data.email, data.password);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition"
          placeholder="tu@email.com"
          disabled={isLoading}
          autoComplete="email"
          {...register("email", {
            required: {
              value: true,
              message: "Debe ingresar su correo",
            },
          })}
        />
        <p className="mt-1 text-xs font-semibold text-red-500">
          {errors.email && String(errors.email.message)}
        </p>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition pr-10"
            placeholder="••••••••"
            disabled={isLoading}
            autoComplete="current-password"
            {...register("password", {
              required: {
                value: true,
                message: "Debe ingresar su contraseña",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="mt-1 text-xs font-semibold text-red-500">
          {errors.password && String(errors.password.message)}
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#3B82F6] hover:bg-[#F59E0B] text-white font-semibold py-2 rounded-xl transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Ingresando...
          </>
        ) : (
          "Iniciar Sesión"
        )}
      </button>

      <div className="text-sm text-center text-gray-500">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="text-[#3B82F6] hover:text-[#F59E0B] font-medium transition"
        >
          Regístrate aquí
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
