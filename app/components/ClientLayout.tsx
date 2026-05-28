// "use client";

// import { useEffect, useState } from "react";
// import { useAuthStore } from "@/app/store/authStore";
// import Navbar from "./layout/Navbar";

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { checkAuth, isLoading } = useAuthStore();
//   const [isInitialized, setIsInitialized] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     const init = async () => {
//       console.log("🔍 useEffect ejecutado", { isInitialized });

//       if (isInitialized) {
//         console.log("⏭️ Ya inicializado, saltando");
//         return;
//       }

//       console.log("🚀 Ejecutando checkAuth...");

//       try {
//         await checkAuth();
//         console.log("✅ checkAuth exitoso");
//       } catch (error) {
//         console.log("❌ checkAuth falló");
//       } finally {
//         console.log("📌 Marcando como inicializado");
//         if (isMounted) {
//           setIsInitialized(true);
//         }
//       }
//     };

//     init();

//     return () => {
//       isMounted = false;
//     };
//   }, [checkAuth, isInitialized]);

//   if (!isInitialized && isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-600">Cargando...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <main className="min-h-[calc(100vh-73px)] bg-gray-50">{children}</main>
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import Navbar from "./layout/Navbar";
import { Toaster } from "@/app/components/ui/Toast";
import { LoadingOverlay } from "@/app/components/ui/LoadingOverlay";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAuth, isLoading, isAuthenticated, user } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const hasChecked = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!hasChecked.current) {
        hasChecked.current = true;
        await checkAuth();
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [checkAuth]);

  if (!isInitialized && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-73px)] bg-gray-50">{children}</main>
      {/* ✅ Toast notifications globales */}
      <Toaster />
      {/* ✅ Loading overlay global */}
      <LoadingOverlay />
    </>
  );
}
