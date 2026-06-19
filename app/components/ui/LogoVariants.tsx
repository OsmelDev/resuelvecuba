import React from 'react';
import Logo from './Logo';

export function LogoHeader() {
  return <Logo variant="simple" size="md" />;
}

export function LogoFooter() {
  return (
    <div className="text-center">
      <Logo variant="full" size="lg" showText={true} />
      <p className="text-xs text-gray-400 mt-2">© 2024 ResuelveCuba. Todos los derechos reservados.</p>
    </div>
  );
}

export function LogoIconOnly() {
  return <Logo variant="icon" size="lg" />;
}

export function LogoLoading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-pulse">
        <Logo variant="full" size="lg" />
      </div>
      <p className="text-gray-500 mt-4 animate-pulse">Cargando...</p>
    </div>
  );
}