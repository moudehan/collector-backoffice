import { useEffect } from "react";
import { io } from "socket.io-client";
import type { Article } from "../types/articles.type";

export function useFraudAlerts(onAlert: (alert: Article) => void) {
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("WS connecté !");
    });

    socket.on("new_fraud_alert", (alert) => {
      console.log("⚡ Nouvelle alerte reçue :", alert);
      onAlert(alert);
    });

    return () => {
      socket.disconnect();
    };
  }, [onAlert]);
}
