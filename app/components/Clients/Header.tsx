import React, { FC } from "react";
import LogoSimple from "../ui/LogoSimple";
import { User } from "@/app/types/dataTypes";

interface HeaderProps {
  user: User;
}

const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-[#1E3A5F] to-[#3B82F6] rounded-2xl p-6 mb-8 text-white">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold">¡Hola, {user.nombre}! 👋</h1>
          <p className="text-blue-100">Bienvenido a tu panel de control</p>
        </div>
        <LogoSimple variant="simple" size="sm" showText={false} />
      </div>
    </div>
  );
};

export default Header;
