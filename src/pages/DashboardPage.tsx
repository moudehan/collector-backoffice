import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ChartCard from "../components/ChartCard";
import DataTable from "../components/DataTable";
import StatCard from "../components/StatCard";
import DashboardLayout from "../layout/DashboardLayout";
import { getStats } from "../services/api";

type UserRow = {
  id: string;
  firstname: string;
  email: string;
  avatar: string;
  role: "ADMIN" | "USER";
};

const users: UserRow[] = [
  {
    id: "1",
    firstname: "Mouhamed",
    email: "mouhamed@gmail.com",
    avatar: "https://i.pravatar.cc/100?img=12",
    role: "ADMIN",
  },
  {
    id: "2",
    firstname: "Sarah",
    email: "sarah@yahoo.com",
    avatar: "https://i.pravatar.cc/100?img=4",
    role: "USER",
  },
  {
    id: "3",
    firstname: "Karim",
    email: "karim@hotmail.com",
    avatar: "https://i.pravatar.cc/100?img=20",
    role: "USER",
  },
];

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
        <DataTable
          title="👤 Utilisateurs"
          data={users}
          columns={[
            { label: "Nom", field: "firstname", width: "2fr" },
            { label: "Email", field: "email" },
            {
              label: "Avatar",
              field: "avatar",
              // render: (v, row) => <Avatar src={v} alt={row.firstname} />,
            },
            {
              label: "Role",
              field: "role",
              render: (role) => (
                <Chip
                  label={role?.toString()}
                  color={role === "ADMIN" ? "error" : "primary"}
                />
              ),
            },
            {
              label: "Actions",
              field: "id",
              render: (_, row) => (
                <Box display="flex" gap={1}>
                  <DeleteIcon
                    sx={{ color: "red", cursor: "pointer" }}
                    onClick={() => alert("Supprimer → " + row.id)}
                  />
                  <EditIcon
                    sx={{ color: "#1976d2", cursor: "pointer" }}
                    onClick={() => alert("Modifier → " + row.id)}
                  />
                  <VisibilityIcon
                    sx={{ cursor: "pointer", color: "#333" }}
                    onClick={() => alert("Voir → " + row.id)}
                  />
                </Box>
              ),
            },
          ]}
        />
      </Box>
      <ChartCard />
    </DashboardLayout>
  );
}
