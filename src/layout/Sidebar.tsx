import AppsIcon from "@mui/icons-material/Apps";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import UserIcon from "@mui/icons-material/People";
import TableChartIcon from "@mui/icons-material/TableChart";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexte/UseAuth";

const menuItems = [
  { icon: <DashboardIcon />, label: "Dashboard", route: "/adminDashboard" },
  { icon: <UserIcon />, label: "Utilisateurs", route: "/users" },
  { icon: <AppsIcon />, label: "Catégories", route: "/categories" },
  { icon: <TableChartIcon />, label: "Articles", route: "/articles" },
  { icon: <AppsIcon />, label: "Fraudes", route: "/alertfraude" },
  { icon: <LogoutIcon />, label: "Déconnexion" },
];

export default function Sidebar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "#111827",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar>{user.firstname?.[0]?.toUpperCase() ?? "?"}</Avatar>
        <Box>
          <Typography fontWeight={600}>
            {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="body2" color="#10B981">
            ● En ligne
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <Box sx={{ px: 3, py: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ textTransform: "uppercase", fontSize: 11, color: "#9ca3af" }}
        >
          Général
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => {
              if (item.label === "Déconnexion") {
                handleLogout();
              } else {
                navigate(item.route || "");
              }
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
