import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ChartCard from "../components/ChartCard";
import StatCard from "../components/StatCard";
import DashboardLayout from "../layout/DashboardLayout";
import { getStats } from "../services/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    articles: 0,
    alerts: 0,
    messages: 0,
  });

  useEffect(() => {
    getStats()
      .then((res) =>
        setStats({
          users: res.counters.users,
          articles: res.counters.articles,
          alerts: res.counters.alerts,
          messages: res.counters.messages,
        })
      )
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
          <StatCard
            icon={<PeopleAltIcon sx={{ fontSize: 65 }} />}
            value={stats.users}
            label="Utilisateurs"
          />

          <StatCard
            icon={<WarningAmberIcon sx={{ fontSize: 65, color: "#f44336" }} />}
            value={stats.alerts}
            label="Alertes fraude"
          />

          <StatCard
            icon={<InventoryIcon sx={{ fontSize: 65 }} />}
            value={stats.articles}
            label="Articles publiés"
          />

          <StatCard
            icon={<ChatBubbleIcon sx={{ fontSize: 65 }} />}
            value={stats.messages}
            label="Messages"
          />
        </Box>
        <ChartCard />
      </Box>
    </DashboardLayout>
  );
}
