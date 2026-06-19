"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { Toaster } from "@/app/components/ui/Toast";
import { LoadingOverlay } from "@/app/components/ui/LoadingOverlay";
import LoadingScreen from "./ui/LoadingScreen";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAuth, isLoading } = useAuthStore();
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
    return <LoadingScreen />;
  }

  return (
    <>
      <main className="max-h-[calc(100vh-47px)] h-full  bg-gray-50">
        {children}
      </main>
      {/* ✅ Toast notifications globales */}
      <Toaster />
      {/* ✅ Loading overlay global */}
      <LoadingOverlay />
    </>
  );
}
