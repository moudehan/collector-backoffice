import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Box,
  Card,
  CardContent,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { getFraudAlerts } from "../services/fraud.api";
import { useFraudAlerts } from "../services/socket";
import type { FraudAlert } from "../types/fraud.type";

export default function FraudAlertsPage() {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    (async () => {
      const data = await getFraudAlerts();
      setAlerts(data);
    })();
  }, []);

  useFraudAlerts((newAlert: FraudAlert) => {
    setAlerts((prev) => [newAlert, ...prev]);
  });

  const getSeverityColor = (sev: string) => {
    switch (sev.toLowerCase()) {
      case "high":
        return { color: "#d32f2f", label: "Anomalie sévère" };
      case "medium":
        return { color: "#ed6c02", label: "Anomalie moyenne" };
      default:
        return { color: "#0288d1", label: "Faible anomalie" };
    }
  };

  const totalPages = Math.ceil(alerts.length / ITEMS_PER_PAGE);
  const paginatedAlerts = alerts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <DashboardLayout>
      <Box p={2}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Alertes de Fraude
        </Typography>

        <Stack spacing={2}>
          {paginatedAlerts.map((alert) => {
            const severity = getSeverityColor(alert.severity);
            const isUserAlert = alert.reason
              .toLowerCase()
              .includes("l'utilisateur");

            return (
              <Card
                key={alert.id}
                sx={{
                  cursor: "pointer",
                  borderLeft: `6px solid ${severity.color}`,
                  backgroundColor: isUserAlert ? "#fff7d6" : "white",
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
                  transition: "0.2s",
                  "&:hover": { transform: "scale(1.01)" },
                }}
                onClick={() => {
                  if (isUserAlert && alert.user_id) {
                    window.location.href = `/user/${alert.user_id}`;
                  } else {
                    window.location.href = `/articles/${alert.article.id}`;
                  }
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {isUserAlert ? (
                        <PersonIcon sx={{ color: "#d32f2f" }} />
                      ) : (
                        <ShoppingBagIcon sx={{ color: severity.color }} />
                      )}

                      <Typography variant="h6" fontWeight={700}>
                        {isUserAlert
                          ? "Alerte Utilisateur"
                          : alert.article.title}
                      </Typography>
                    </Stack>

                    <Typography sx={{ color: severity.color, fontWeight: 700 }}>
                      {severity.label}
                    </Typography>
                  </Box>

                  <Typography color="text.secondary" mb={1}>
                    {alert.reason}
                  </Typography>

                  {!isUserAlert && (
                    <>
                      <Typography fontSize={14}>
                        Prix médian : <b>{alert.average_price}€</b>
                      </Typography>

                      <Typography fontSize={14}>
                        Dernier prix : <b>{alert.last_price_recorded}€</b>
                      </Typography>

                      <Typography fontSize={14} mb={1}>
                        Écart : <b>{alert.diff_percent}%</b>
                      </Typography>
                    </>
                  )}

                  <Typography fontSize={12} color="gray" mt={1}>
                    {new Date(alert.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="large"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
