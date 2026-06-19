import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

let socket: Socket | null = null;
let isConnecting = false;

export const getSocket = () => {
  if (socket && socket.connected) {
    return socket;
  }

  if (!socket && !isConnecting) {
    isConnecting = true;
    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      // auth: {
      //   token: authToken, // Enviar token en auth
      // },
      // Alternativa: enviar en headers
      extraHeaders: {
        Authorization: `Bearer ${document.cookie}`,
      },
    });

    socket.on("connect", () => {
      console.log("🔌 Socket conectado:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Socket desconectado");
    });
  }
  // if (!socket && typeof window !== "undefined") {
  //   // const authToken = document.cookie
  //   //   .split("; ")
  //   //   .find((row) => row.startsWith("authtoken="))
  //   //   ?.split("=")[1];
  //   // console.log(authToken);

  //   // if (!authToken) {
  //   //   console.error("No hay token disponible");
  //   //   return;
  //   // }

  //   socket = io(SOCKET_URL, {
  //     transports: ["websocket", "polling"],
  //     withCredentials: true,
  //     // auth: {
  //     //   token: authToken, // Enviar token en auth
  //     // },
  //     // Alternativa: enviar en headers
  //     extraHeaders: {
  //       Authorization: `Bearer ${document.cookie}`,
  //     },
  //   });

  //   socket.on("connect", () => {
  //     console.log("🔌 Socket conectado:", socket?.id);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("🔌 Socket desconectado");
  //   });
  // }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    isConnecting = false;
  }
};
