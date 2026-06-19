interface currentSize {
  icon: number;
  text: string;
  handshake: number;
}

export const useIcon = (currentSize: currentSize) => {
  const HandshakeIcon = () => (
    <svg
      width={currentSize.handshake}
      height={currentSize.handshake}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Mano izquierda */}
      <path
        d="M6.5 14.5L4 12L6.5 9.5L9 12L6.5 14.5Z"
        fill="#3B82F6"
        stroke="#1E3A5F"
        strokeWidth="0.5"
      />
      {/* Mano derecha */}
      <path
        d="M17.5 14.5L20 12L17.5 9.5L15 12L17.5 14.5Z"
        fill="#F59E0B"
        stroke="#1E3A5F"
        strokeWidth="0.5"
      />
      {/* Estrella central (confianza) */}
      <path
        d="M12 8L13.5 11.5L17 12L13.5 13.5L12 17L10.5 13.5L7 12L10.5 11.5L12 8Z"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="0.3"
      />
      {/* Muñecas */}
      <path
        d="M6.5 14.5C6.5 14.5 5 16 5 17.5C5 19 6.5 20.5 8 20.5C9.5 20.5 11 19.5 11.5 18"
        stroke="#1E3A5F"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17.5 14.5C17.5 14.5 19 16 19 17.5C19 19 17.5 20.5 16 20.5C14.5 20.5 13 19.5 12.5 18"
        stroke="#1E3A5F"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Efecto de movimiento */}
      <circle cx="4" cy="11" r="1.5" fill="#3B82F6" opacity="0.4" />
      <circle cx="20" cy="11" r="1.5" fill="#F59E0B" opacity="0.4" />
    </svg>
  );

  return { HandshakeIcon };
};
