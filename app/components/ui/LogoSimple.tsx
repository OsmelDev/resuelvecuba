interface LogoSimpleProps {
  variant?: "full" | "icon" | "simple";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  showIcon?: boolean;
  className?: string;
}

const sizes = {
  sm: { emoji: "text-2xl", container: "w-10 h-10", text: "text-lg" },
  md: { emoji: "text-4xl", container: "w-14 h-14", text: "text-2xl" },
  lg: { emoji: "text-6xl", container: "w-20 h-20", text: "text-4xl" },
};

export default function LogoSimple({
  variant = "full",
  size = "md",
  showText = true,
  showIcon = true,
  className = "",
}: LogoSimpleProps) {
  const currentSize = sizes[size];

  // Versión solo icono

  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <span className={currentSize.emoji}>🤝</span>
        {showText && (
          <span className={`font-bold text-gray-800 ${currentSize.text}`}>
            Resuelve<span className="text-blue-600">Cuba</span>
          </span>
        )}
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {showIcon && (
          <div
            className={`${currentSize.container} bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center shadow-md`}
          >
            <span className={currentSize.emoji}>🤝</span>
          </div>
        )}
        {showText && (
          <span className={`font-bold text-gray-800 ${currentSize.text}`}>
            Resuelve<span className="text-blue-600">Cuba</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Círculo con emoji de apretón de manos */}
      <div
        className={`${currentSize.container} bg-gradient-to-br from-blue-500 to-blur-200 rounded-full flex items-center justify-center shadow-md`}
      >
        <span className={currentSize.emoji}>🤝</span>
      </div>

      {/* Texto */}
      <div>
        <div className={`font-bold ${currentSize.text} leading-tight`}>
          <span className="text-gray-800">Resuelve</span>
          <span className="text-blue-600">Cuba</span>
        </div>
        <p className="-mt-1 text-xs text-gray-500">Tu red de profesionales</p>
      </div>
    </div>
  );
}
