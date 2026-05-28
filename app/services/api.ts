import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // ✅ No redirigir en la ruta de verificación ni en registro/login
    const excludePaths = ["/auth/verify", "/auth/register", "/auth/login"];
    const shouldExclude = excludePaths.some((path) =>
      originalRequest.url?.includes(path),
    );

    if (shouldExclude) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
