import AppsIcon from "@mui/icons-material/Apps";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import TableChartIcon from "@mui/icons-material/TableChart";
import WidgetsIcon from "@mui/icons-material/Widgets";
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
import { logout } from "../services/authapi";

const menuItems = [
  { icon: <DashboardIcon />, label: "Dashboard" },
  { icon: <WidgetsIcon />, label: "Widgets" },
  { icon: <TableChartIcon />, label: "Tables" },
  { icon: <AppsIcon />, label: "Apps" },
  { icon: <MapIcon />, label: "Map" },
  { icon: <ContactMailIcon />, label: "Contact" },
  { icon: <SettingsIcon />, label: "Settings" },
  { icon: <LogoutIcon />, label: "Deconnexion" },
];

export default function Sidebar() {
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
        <Avatar src="https://i.pravatar.cc/100?img=3" />
        <Box>
          <Typography fontWeight={600}>John David</Typography>
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
            onClick={() =>
              item.label === "Deconnexion" ? handleLogout() : null
            }
            sx={{
              color: "#e5e7eb",
              "&.Mui-selected, &:hover": {
                bgcolor: "rgba(59,130,246,0.15)",
              },
            }}
            selected={item.label === "Dashboard"}
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
