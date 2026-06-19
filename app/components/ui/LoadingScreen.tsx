import LogoSimple from "./LogoSimple";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-bounce">
        <LogoSimple variant="full" size="md" />
      </div>
      <p className="mt-4 text-gray-500 animate-pulse">Cargando...</p>
    </div>
  );
}
