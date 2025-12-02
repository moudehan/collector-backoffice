import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { getFraudAlerts } from "../services/fraud.api";

import type { FraudAlert } from "../types/fraud.type";

export default function FraudAlertsPage() {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getFraudAlerts();
      setAlerts(data);
    })();
  }, []);

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case "high":
        return { color: "error", label: "🚨 Forte anomalie" };
      case "medium":
        return { color: "warning", label: "⚠️ Anomalie moyenne" };
      default:
        return { color: "info", label: "ℹ️ Légère anomalie" };
    }
  };

  return (
    <DashboardLayout>
      <Box p={2}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          🔔 Alertes de Fraude
        </Typography>

        <Stack spacing={2}>
          {alerts.map((alert) => {
            const sev = getSeverityColor(alert.severity);

            return (
              <Card
                key={alert.id}
                sx={{
                  cursor: "pointer",
                  borderLeft: `6px solid ${
                    sev.color === "error"
                      ? "#d32f2f"
                      : sev.color === "warning"
                      ? "#ed6c02"
                      : "#0288d1"
                  }`,
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
                  transition: "0.2s",
                  "&:hover": { transform: "scale(1.01)" },
                }}
                onClick={() => {
                  window.location.href = `/articles/${alert.article.id}`;
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="h6" fontWeight={700}>
                      {alert.article.title}
                    </Typography>
                  </Box>

                  <Typography color="text.secondary" mb={1}>
                    {alert.reason}
                  </Typography>

                  <Typography fontSize={14}>
                    💰 Prix médian : <b>{alert.average_price}€</b>
                  </Typography>

                  <Typography fontSize={14}>
                    🔺 Dernier prix : <b>{alert.last_price_recorded}€</b>
                  </Typography>

                  <Typography fontSize={14} mb={1}>
                    📊 Écart : <b>{alert.diff_percent}%</b>
                  </Typography>

                  <Typography fontSize={12} color="gray">
                    ⏱ {new Date(alert.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </DashboardLayout>
  );
}
