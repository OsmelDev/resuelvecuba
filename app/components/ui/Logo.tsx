import React from "react";
import Image from "next/image";
import { useIcon } from "./HandshakeIcon";

interface LogoProps {
  variant?: "full" | "icon" | "simple";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 32, text: "text-xl", handshake: 24 },
  md: { icon: 48, text: "text-2xl", handshake: 32 },
  lg: { icon: 64, text: "text-4xl", handshake: 48 },
};

export default function Logo({
  variant = "full",
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const currentSize = sizes[size];
  const { HandshakeIcon } = useIcon(currentSize);
  // Componente del apretón de manos (SVG)
  // const HandshakeIcon = () => (
  //   <svg
  //     width={currentSize.handshake}
  //     height={currentSize.handshake}
  //     viewBox="0 0 24 24"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //     className="inline-block"
  //   >
  //     {/* Mano izquierda */}
  //     <path
  //       d="M6.5 14.5L4 12L6.5 9.5L9 12L6.5 14.5Z"
  //       fill="#3B82F6"
  //       stroke="#1E3A5F"
  //       strokeWidth="0.5"
  //     />
  //     {/* Mano derecha */}
  //     <path
  //       d="M17.5 14.5L20 12L17.5 9.5L15 12L17.5 14.5Z"
  //       fill="#F59E0B"
  //       stroke="#1E3A5F"
  //       strokeWidth="0.5"
  //     />
  //     {/* Estrella central (confianza) */}
  //     <path
  //       d="M12 8L13.5 11.5L17 12L13.5 13.5L12 17L10.5 13.5L7 12L10.5 11.5L12 8Z"
  //       fill="#FBBF24"
  //       stroke="#D97706"
  //       strokeWidth="0.3"
  //     />
  //     {/* Muñecas */}
  //     <path
  //       d="M6.5 14.5C6.5 14.5 5 16 5 17.5C5 19 6.5 20.5 8 20.5C9.5 20.5 11 19.5 11.5 18"
  //       stroke="#1E3A5F"
  //       strokeWidth="1.2"
  //       strokeLinecap="round"
  //       fill="none"
  //     />
  //     <path
  //       d="M17.5 14.5C17.5 14.5 19 16 19 17.5C19 19 17.5 20.5 16 20.5C14.5 20.5 13 19.5 12.5 18"
  //       stroke="#1E3A5F"
  //       strokeWidth="1.2"
  //       strokeLinecap="round"
  //       fill="none"
  //     />
  //     {/* Efecto de movimiento */}
  //     <circle cx="4" cy="11" r="1.5" fill="#3B82F6" opacity="0.4" />
  //     <circle cx="20" cy="11" r="1.5" fill="#F59E0B" opacity="0.4" />
  //   </svg>
  // );

  // Versión solo icono
  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <div className="relative">
          <HandshakeIcon />
        </div>
      </div>
    );
  }

  // Versión simple (icono + texto sin decoración)
  if (variant === "simple") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <HandshakeIcon />
        {showText && (
          <span className={`font-bold text-gray-800 ${currentSize.text}`}>
            Resuelve<span className="text-blue-600">Cuba</span>
          </span>
        )}
      </div>
    );
  }

  // Versión completa (con fondo y estilo)
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Círculo de fondo */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-orange-500 opacity-10 blur-sm"></div>
        <div className="relative p-2 bg-white border border-gray-100 rounded-full shadow-md">
          <HandshakeIcon />
        </div>
      </div>

      {/* Texto */}
      {showText && (
        <div>
          <div className={`font-bold ${currentSize.text} leading-tight`}>
            <span className="text-gray-800">Resuelve</span>
            <span className="text-blue-600">Cuba</span>
          </div>
          <p className="-mt-1 text-xs text-gray-500">Tu red de profesionales</p>
        </div>
      )}
    </div>
  );
}
