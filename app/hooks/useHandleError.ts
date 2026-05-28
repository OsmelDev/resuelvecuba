import { ApiError, AppError, NetworkError } from "@/app/types/error-types";
import { AxiosError } from "axios";

export const useHandleError = () => {
  // Función principal para manejar errores
  function handleError(error: AppError): string | undefined {
    if (error instanceof AxiosError) {
      // Error estándar de Axios
      console.error("Error:", error.message);
      return error.response?.data.message;
    } else if (error instanceof Error) {
      // Error estándar de JavaScripts
      console.error("Error:", error.message);
      return error.message;
    } else if (typeof error === "string") {
      // Error como string
      console.error("Error:", error);
      return error;
    } else if (isApiError(error)) {
      // Error de API
      console.error(`API Error (${error.statusCode}):`, error.message);
      if (error.data) {
        console.error("Data:", error.data);
      }
    } else if (isNetworkError(error)) {
      // Error de red
      console.error("Network Error:", error.message);
      if (error.code) {
        console.error("Error Code:", error.code);
      }
    } else {
      // Error desconocido
      console.error("Unknown error:", error);
    }
  }

  // Type guards
  function isApiError(error: any): error is ApiError {
    return (
      error &&
      typeof error.message === "string" &&
      typeof error.statusCode === "number"
    );
  }

  function isNetworkError(error: any): error is NetworkError {
    return error && typeof error.message === "string";
  }

  return { handleError };
};

export function handleError(error: AppError): string | undefined {
  if (error instanceof AxiosError) {
    // Error estándar de Axios
    console.error("Error:", error.message);
    return error.response?.data.message;
  } else if (error instanceof Error) {
    // Error estándar de JavaScripts
    console.error("Error:", error.message);
    return error.message;
  } else if (typeof error === "string") {
    // Error como string
    console.error("Error:", error);
    return error;
  } else if (isApiError(error)) {
    // Error de API
    console.error(`API Error (${error.statusCode}):`, error.message);
    if (error.data) {
      console.error("Data:", error.data);
    }
  } else if (isNetworkError(error)) {
    // Error de red
    console.error("Network Error:", error.message);
    if (error.code) {
      console.error("Error Code:", error.code);
    }
  } else {
    // Error desconocido
    console.error("Unknown error:", error);
  }
}

// Type guards
export function isApiError(error: any): error is ApiError {
  return (
    error &&
    typeof error.message === "string" &&
    typeof error.statusCode === "number"
  );
}

export function isNetworkError(error: any): error is NetworkError {
  return error && typeof error.message === "string";
}
