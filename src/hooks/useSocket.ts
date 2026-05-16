import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../store/useAuthStore";

export function useSocket(projectId?: string) {
  const socketRef = useRef<Socket | null>(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;

    const socket = io({
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected");
      if (projectId) {
        socket.emit("join:project", projectId);
      }
    });

    return () => {
      if (projectId) {
        socket.emit("leave:project", projectId);
      }
      socket.disconnect();
    };
  }, [token, projectId]);

  return socketRef.current;
}
