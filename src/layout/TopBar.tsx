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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DropdownList from "../components/DropDownList";
import { getFraudAlerts } from "../services/fraud.api";
import { useFraudAlerts } from "../services/socket";
import type { Article } from "../types/articles.type";

export default function Topbar() {
  const navigate = useNavigate();
  const [anchorNotif, setAnchorNotif] = useState<null | HTMLElement>(null);

  const [notifications, setNotifications] = useState<
    { id: string; title: string; subtitle: string }[]
  >([]);
  useEffect(() => {
    (async () => {
      const data = await getFraudAlerts();
      setNotifications(
        data.map((a: Article) => ({
          id: a.id,
          title: `${a.title}`,
          subtitle: a.title,
        }))
      );
    })();
  }, []);

  useFraudAlerts((alert) => {
    setNotifications((prev) => [
      {
        id: alert.id,
        title: `⚡ ${alert.title}`,
        subtitle: alert.title,
      },
      ...prev,
    ]);
  });

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
            onItemClick={() => navigate("/fraud-alerts")}
          />

          <Avatar src="https://i.pravatar.cc/100?img=3" sx={{ ml: 1 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
