import { useEffect } from "react";
import { io } from "socket.io-client";
import type { FraudAlert } from "../types/fraud.type";

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export function useFraudAlerts(onAlert: (alert: FraudAlert) => void) {
  useEffect(() => {
    const socket = io(VITE_SOCKET_URL, {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("TOKEN"),
      },
    });

    socket.on("connect", () => {
      console.log("WS connecté !");
    });

    socket.on("new_fraud_alert", (alert: FraudAlert) => {
      console.log("⚡ Nouvelle alerte reçue :", alert);
      onAlert(alert);
    });

    return () => {
      socket.disconnect();
    };
  }, [onAlert]);
}
