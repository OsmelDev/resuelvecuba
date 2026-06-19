import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
