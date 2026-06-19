// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/app/store/authStore";
// import { useEffect, useState } from "react";
// import { useNotificacionStore } from "@/app/store/notificacionStore";
// import Notificaciones from "../ui/Notificaciones";
// import { useMobile } from "@/app/hooks/use-mobile";
// import { Edit, LogIn, MenuSquareIcon } from "lucide-react";
// import LogoSimple from "../ui/LogoSimple";

// export default function Navbar() {
//   const router = useRouter();
//   const { user, logout, isAuthenticated, isLoading } = useAuthStore();
//   const { conectarSocket } = useNotificacionStore();
//   const { isMobile } = useMobile();
//   const [showMenu, setShowMenu] = useState(false);

//   const handleLogout = async () => {
//     const ok = await logout();
//     if (ok) {
//       router.push("/");
//       router.refresh();
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated && user?._id) {
//       conectarSocket(user._id);
//     }
//   }, [isAuthenticated, user?._id, conectarSocket]);

//   return (
//     <nav className="sticky top-0 z-10 bg-white shadow-md">
//       <div className="container flex items-center justify-between px-2 py-2 mx-auto">
//         <Link
//           href="/"
//           className="text-xl font-bold text-blue-600 transition hover:text-blue-700"
//         >
//           <LogoSimple variant="icon" size="sm" showText={true} />
//         </Link>
//         {isMobile ? (
//           !isLoading && isAuthenticated && user ? (
//             <div className="flex items-center gap-2">
//               <span className="p-1 text-sm font-bold text-center text-gray-700 bg-blue-300 rounded-full w-7">
//                 {user.nombre.slice(0, 1)}
//               </span>
//               <MenuSquareIcon
//                 className="text-blue-600 transition hover:text-blue-700 "
//                 onClick={() => setShowMenu(!showMenu)}
//               />
//               <Notificaciones />

//               <div
//                 className={`absolute -z-10 flex flex-col left-0 w-full p-2 top-12   ${showMenu ? "max-h-52 translate-y-0 shadow-md" : " max-h-0 overflow-hidden -translate-y-5"} transition-all duration-300 bg-white/40 backdrop-blur-lg`}
//               >
//                 <div className="flex flex-col h-full gap-3 overflow-hidden">
//                   {user.role === "admin" && (
//                     <div className="flex flex-col items-center gap-1 font-semibold text-center ">
//                       <Link
//                         href="/admin/dashboard"
//                         className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
//                       >
//                         Dashboard
//                       </Link>
//                       <Link
//                         href="/admin/proveedores"
//                         className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
//                       >
//                         Proveedores
//                       </Link>
//                       <Link
//                         href="/admin/moderacion"
//                         className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
//                       >
//                         Moderacion
//                       </Link>
//                     </div>
//                   )}
//                   {user.role === "cliente" && (
//                     <div className="flex flex-col items-center gap-1 font-semibold text-center ">
//                       <Link
//                         href="/cliente/dashboard"
//                         className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
//                       >
//                         Mi Panel
//                       </Link>
//                       <Link
//                         href="/cliente/buscar"
//                         className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
//                       >
//                         Buscar Servicios
//                       </Link>

//                       <Link
//                         href="/cliente/mis-citas"
//                         className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
//                       >
//                         Mis Citas
//                       </Link>
//                     </div>
//                   )}
//                   {user.role === "proveedor" && user.activo && (
//                     <div className="flex flex-col items-center gap-1 font-semibold text-center ">
//                       <Link
//                         href="/proveedor/dashboard"
//                         className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
//                       >
//                         Dashboard
//                       </Link>
//                       <Link
//                         href="/proveedor/mis-servicios"
//                         className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
//                       >
//                         Mis Servicios
//                       </Link>
//                       <Link
//                         href="/proveedor/mis-citas"
//                         className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
//                       >
//                         Citas
//                       </Link>
//                     </div>
//                   )}
//                   {user.role === "proveedor" && !user.activo && (
//                     <div className="flex flex-col items-center gap-1 font-semibold text-center ">
//                       <Link
//                         href="/proveedor/espera-activacion"
//                         className="text-sm text-yellow-600 transition hover:text-yellow-800"
//                       >
//                         Espera Activación
//                       </Link>
//                       <Link
//                         href="/proveedor/dashboard"
//                         className="text-sm text-blue-600 transition hover:text-blue-800"
//                       >
//                         Dashboard
//                       </Link>
//                       <Link
//                         href="/proveedor/mis-servicios"
//                         className="text-sm text-blue-600 transition hover:text-blue-800"
//                       >
//                         {user.tipo_oferta === "servicio"
//                           ? "Mis Servicios"
//                           : "Mis Productos"}
//                       </Link>
//                     </div>
//                   )}

//                   <button
//                     onClick={handleLogout}
//                     className="px-3 py-1 text-sm text-black transition rounded-lg hover:text-white bg-blue-500/60 hover:bg-blue-600"
//                   >
//                     Salir
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link
//                 href="/login"
//                 className="text-blue-600 transition hover:text-blue-800"
//               >
//                 <LogIn size={14} aria-description="Login" />
//               </Link>
//               <Link
//                 href="/register"
//                 className="px-4 py-1 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
//               >
//                 <Edit size={14} aria-description="Register" />
//               </Link>
//             </div>
//           )
//         ) : (
//           <div className="flex items-center gap-4">
//             {!isLoading && isAuthenticated && user ? (
//               <>
//                 {user.role === "admin" && (
//                   <>
//                     <Link
//                       href="/admin/dashboard"
//                       className="text-sm text-purple-600 transition hover:text-purple-800"
//                     >
//                       Dashboard
//                     </Link>
//                     <Link
//                       href="/admin/proveedores"
//                       className="text-sm text-purple-600 transition hover:text-purple-800"
//                     >
//                       Proveedores
//                     </Link>
//                     <Link
//                       href="/admin/moderacion"
//                       className="text-sm text-purple-600 transition hover:text-purple-800"
//                     >
//                       Moderacion
//                     </Link>
//                   </>
//                 )}
//                 {user.role === "cliente" && (
//                   <>
//                     <Link
//                       href="/cliente/dashboard"
//                       className="text-sm text-blue-600 transition hover:text-blue-800"
//                     >
//                       Mi Panel
//                     </Link>
//                     <Link
//                       href="/cliente/buscar"
//                       className="text-sm text-blue-600 transition hover:text-blue-800"
//                     >
//                       Buscar Servicios
//                     </Link>

//                     <Link
//                       href="/cliente/mis-citas"
//                       className="text-sm text-blue-600 transition hover:text-blue-800"
//                     >
//                       Mis Citas
//                     </Link>
//                   </>
//                 )}
//                 {user.role === "proveedor" && user.activo && (
//                   <>
//                     <Link
//                       href="/proveedor/dashboard"
//                       className="text-sm text-blue-600 transition hover:text-blue-800"
//                     >
//                       Dashboard
//                     </Link>
//                     <Link
//                       href="/proveedor/mis-servicios"
//                       className="text-sm text-blue-600 transition hover:text-blue-800"
//                     >
//                       Mis Servicios
//                     </Link>
//                     <Link
//                       href="/proveedor/mis-citas"
//                       className="text-sm text-blue-600 transition hover:text-blue-800"
//                     >
//                       Citas
//                     </Link>
//                   </>
//                 )}
//                 {user.role === "proveedor" && !user.activo && (
//                   <>
//                     <Link
//                       href="/proveedor/espera-activacion"
//                       className="text-sm text-yellow-600 transition hover:text-yellow-800"
//                     >
//                       Espera Activación
//                     </Link>
//                     <Link
//                       href="/proveedor/dashboard"
//                       className="text-sm text-blue-600 transition hover:text-blue-800"
//                     >
//                       Dashboard
//                     </Link>
//                     <Link
//                       href="/proveedor/mis-servicios"
//                       className="text-sm text-blue-600 transition hover:text-blue-800"
//                     >
//                       {user.tipo_oferta === "servicio"
//                         ? "Mis Servicios"
//                         : "Mis Productos"}
//                     </Link>
//                   </>
//                 )}
//                 <span className="text-sm text-gray-700">{user.nombre}</span>
//                 <Notificaciones />
//                 <button
//                   onClick={handleLogout}
//                   className="px-3 py-1 text-sm text-white transition bg-red-500 rounded-lg hover:bg-red-600"
//                 >
//                   Salir
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/login"
//                   className="text-blue-600 transition hover:text-blue-800"
//                 >
//                   Iniciar Sesión
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="px-4 py-1 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
//                 >
//                   Registrarse
//                 </Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import Notificaciones from "@/app/components/ui/Notificaciones";
import LogoSimple from "../ui/LogoSimple";
import { useMobile } from "@/app/hooks/use-mobile";
import { Edit, LogIn, MenuSquareIcon } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading } = useAuthStore();
  const { isMobile } = useMobile();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 py-1 mx-auto">
        <Link href="/" className="transition hover:opacity-80">
          {isMobile ? (
            <LogoSimple variant="icon" size="sm" showText={false} />
          ) : (
            <LogoSimple variant="icon" size="sm" showText={true} />
          )}
        </Link>

        {isMobile ? (
          !isLoading && isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <span className="p-1 text-sm font-bold text-center text-gray-700 bg-blue-300 rounded-full w-7">
                {user.nombre.slice(0, 1)}
              </span>
              <MenuSquareIcon
                className="text-blue-600 transition hover:text-blue-700 "
                onClick={() => setShowMenu(!showMenu)}
              />
              <Notificaciones user={user} />

              <div
                className={`absolute -z-10 flex flex-col left-0 w-full p-2 top-12   ${showMenu ? "max-h-52 translate-y-0 shadow-md" : " max-h-0 overflow-hidden -translate-y-5"} transition-all duration-300 bg-white/40 backdrop-blur-lg`}
              >
                <div className="flex flex-col h-full gap-3 overflow-hidden">
                  {user.role === "admin" && (
                    <div className="flex flex-col items-center gap-1 font-semibold text-center ">
                      <Link
                        href="/admin/dashboard"
                        className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/admin/proveedores"
                        className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
                      >
                        Proveedores
                      </Link>
                      <Link
                        href="/admin/moderacion"
                        className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
                      >
                        Moderacion
                      </Link>
                    </div>
                  )}
                  {user.role === "cliente" && (
                    <div className="flex flex-col items-center gap-1 font-semibold text-center ">
                      <Link
                        href="/cliente/dashboard"
                        className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
                      >
                        Mi Panel
                      </Link>
                      <Link
                        href="/cliente/buscar"
                        className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
                      >
                        Buscar Servicios
                      </Link>

                      <Link
                        href="/cliente/mis-citas"
                        className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
                      >
                        Mis Citas
                      </Link>
                    </div>
                  )}
                  {user.role === "proveedor" && user.activo && (
                    <div className="flex flex-col items-center gap-1 font-semibold text-center ">
                      <Link
                        href="/proveedor/dashboard"
                        className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/proveedor/mis-servicios"
                        className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
                      >
                        Mis Servicios
                      </Link>
                      <Link
                        href="/proveedor/mis-citas"
                        className="w-full p-2 text-sm text-blue-700 transition rounded-md hover:text-purple-800"
                      >
                        Citas
                      </Link>
                    </div>
                  )}
                  {user.role === "proveedor" && !user.activo && (
                    <div className="flex flex-col items-center gap-1 font-semibold text-center ">
                      <Link
                        href="/proveedor/espera-activacion"
                        className="text-sm text-yellow-600 transition hover:text-yellow-800"
                      >
                        Espera Activación
                      </Link>
                      <Link
                        href="/proveedor/dashboard"
                        className="text-sm text-blue-600 transition hover:text-blue-800"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/proveedor/mis-servicios"
                        className="text-sm text-blue-600 transition hover:text-blue-800"
                      >
                        {user.tipo_oferta === "servicio"
                          ? "Mis Servicios"
                          : "Mis Productos"}
                      </Link>
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm text-black transition rounded-lg hover:text-white bg-blue-500/60 hover:bg-blue-600"
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-blue-600 transition hover:text-blue-800"
              >
                <LogIn size={14} aria-description="Login" />
              </Link>
              <Link
                href="/register"
                className="px-4 py-1 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Edit size={14} aria-description="Register" />
              </Link>
            </div>
          )
        ) : (
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                {user.role === "admin" && (
                  <>
                    <Link
                      href="/admin/dashboard"
                      className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/proveedores"
                      className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                    >
                      Proveedores
                    </Link>
                  </>
                )}
                {user.role === "cliente" && (
                  <>
                    <Link
                      href="/cliente/dashboard"
                      className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                    >
                      Panel
                    </Link>
                    <Link
                      href="/cliente/proveedores"
                      className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                    >
                      Proveedores
                    </Link>
                    <Link
                      href="/cliente/buscar"
                      className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                    >
                      Servicios
                    </Link>
                    <Link
                      href="/cliente/mis-citas"
                      className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                    >
                      Mis Citas
                    </Link>
                  </>
                )}
                {user.role === "proveedor" && (
                  <>
                    {user.activo ? (
                      <>
                        <Link
                          href="/proveedor/dashboard"
                          className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/proveedor/mis-servicios"
                          className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                        >
                          {user.tipo_oferta === "servicios"
                            ? "Mis Servicios"
                            : "Mis Productos"}
                        </Link>
                        <Link
                          href="/proveedor/mis-citas"
                          className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                        >
                          Citas
                        </Link>
                      </>
                    ) : (
                      <Link
                        href="/proveedor/espera-activacion"
                        className="font-medium text-yellow-600 transition hover:text-yellow-700"
                      >
                        Espera Activación
                      </Link>
                    )}
                  </>
                )}

                <Notificaciones user={user} />

                <span className="text-sm text-gray-600">
                  Hola, {user.nombre}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#1E3A5F] hover:text-[#3B82F6] transition font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-[#3B82F6] hover:bg-[#F59E0B] text-white px-4 py-1 rounded-lg transition"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
