import React from "react";

const LoadingComponent = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
