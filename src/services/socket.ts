import { useEffect } from "react";
import { io } from "socket.io-client";
import type { FraudAlert } from "../types/fraud.type";

export function useFraudAlerts(onAlert: (alert: FraudAlert) => void) {
  useEffect(() => {
    const socket = io("http://localhost:4000", {
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
