import React from "react";
import LogoSimple from "../ui/LogoSimple";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A5F] py-8">
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <LogoSimple variant="icon" showText={true} size="sm" />
          </div>
          <p className="text-sm text-blue-200">
            © 2024 ResuelveCuba. Tu red de profesionales en Cuba.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
