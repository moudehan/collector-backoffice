import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DropdownList from "../components/DropDownList";

export default function Topbar() {
  const [anchorNotif, setAnchorNotif] = useState<null | HTMLElement>(null);
  const [anchorMail, setAnchorMail] = useState<null | HTMLElement>(null);

  const notifications = [
    { id: "1", title: "Nouvelle alerte fraude", subtitle: "Article #2045" },
    {
      id: "2",
      title: "Utilisateur signalé",
      subtitle: "Karim · 3 signalements",
    },
    {
      id: "2",
      title: "Utilisateur signalé",
      subtitle: "Karim · 3 signalements",
    },
    {
      id: "2",
      title: "Utilisateur signalé",
      subtitle: "Karim · 3 signalements",
    },
  ];

  const mails = [
    {
      id: "1",
      title: "Message de Sarah",
      subtitle: "Besoin d'informations...",
    },
    { id: "2", title: "Nouveau contact", subtitle: "Demande commerciale" },
    { id: "3", title: "Support client", subtitle: "Réclamation ouverte" },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "#0f172a", color: "white" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ color: "white", display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700}>
            Collector.Shop Backoffice
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={(e) => setAnchorNotif(e.currentTarget)}
            sx={{ color: "white" }}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <DropdownList
            anchorEl={anchorNotif}
            open={Boolean(anchorNotif)}
            onClose={() => setAnchorNotif(null)}
            items={notifications}
            emptyText="Aucune notification"
          />

          <IconButton
            onClick={(e) => setAnchorMail(e.currentTarget)}
            sx={{ color: "white" }}
          >
            <Badge badgeContent={mails.length} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          <DropdownList
            anchorEl={anchorMail}
            open={Boolean(anchorMail)}
            onClose={() => setAnchorMail(null)}
            items={mails}
            emptyText="Aucun message"
          />

          <IconButton sx={{ color: "white" }}>
            <HelpOutlineIcon />
          </IconButton>

          <Avatar src="https://i.pravatar.cc/100?img=3" sx={{ ml: 1 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
