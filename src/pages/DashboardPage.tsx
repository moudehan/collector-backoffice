import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import DashboardLayout from "../layout/DashboardLayout";
import { getStats } from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { AdminStatsDto } from "../types/admin-stats.type";

type AlertChartPoint = {
  date: string;
  count: number;
};

export default function DashboardPage() {
  const [counters, setCounters] = useState<AdminStatsDto["counters"]>({
    users: 0,
    articles: 0,
    alerts: 0,
    shops: 0,
    messages: 0,
  });
  const [alertsByDay, setAlertsByDay] = useState<AlertChartPoint[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getStats()
      .then((res) => {
        setCounters(res.counters);

        const chartData: AlertChartPoint[] = res.alertsByDay.map(
          (item): AlertChartPoint => {
            const d = new Date(item.date);
            return {
              date: d.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
              }),
              count: item.count,
            };
          }
        );

        setAlertsByDay(chartData);
      })
      .catch(() => console.error("Erreur chargement des statistiques"));
  }, []);

  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Dashboard
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            mb: 4,
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "repeat(4,1fr)",
            },
          }}
        >
          <Box onClick={() => navigate("/users")} sx={{ cursor: "pointer" }}>
            <StatCard
              icon={<PeopleAltIcon sx={{ fontSize: 65 }} />}
              value={counters.users}
              label="Utilisateurs"
            />
          </Box>

          <Box
            onClick={() => navigate("/alertfraude")}
            sx={{ cursor: "pointer" }}
          >
            <StatCard
              icon={
                <WarningAmberIcon sx={{ fontSize: 65, color: "#f44336" }} />
              }
              value={counters.alerts}
              label="Alertes fraude"
            />
          </Box>

          <Box onClick={() => navigate("/articles")} sx={{ cursor: "pointer" }}>
            <StatCard
              icon={<InventoryIcon sx={{ fontSize: 65 }} />}
              value={counters.articles}
              label="Articles publiés"
            />
          </Box>

          <Box onClick={() => navigate("/articles")} sx={{ cursor: "pointer" }}>
            <StatCard
              icon={<StorefrontIcon sx={{ fontSize: 65 }} />}
              value={counters.shops}
              label="Shops"
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Évolution des alertes fraude par jour
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: 320,
              bgcolor: "background.paper",
              p: 2,
              borderRadius: 2,
            }}
          >
            {alertsByDay.length === 0 ? (
              <Typography variant="body2">
                Aucune alerte enregistrée pour le moment.
              </Typography>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={alertsByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#f44336"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
