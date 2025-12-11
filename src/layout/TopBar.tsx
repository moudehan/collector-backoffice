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

import { showAlertPopup } from "../components/AlertPopop";
import type { Item as NotifItem } from "../components/DropDownList";
import DropdownList from "../components/DropDownList";

import { useAuth } from "../contexte/UseAuth";
import {
  getFraudAlerts,
  markAllNotificationsAsRead,
  markAllNotificationsAsUnread,
  markNotificationAsRead,
} from "../services/fraud.api";
import { useFraudAlerts } from "../services/socket";
import type { FraudAlert } from "../types/fraud.type";

export default function Topbar() {
  const navigate = useNavigate();
  const [anchorNotif, setAnchorNotif] = useState<null | HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [notifications, setNotifications] = useState<NotifItem[]>([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    (async () => {
      const data: FraudAlert[] = await getFraudAlerts();

      setNotifications(
        data.map((alert) => ({
          id: alert.id.toString(),
          title: `${alert.article.title}`,
          subtitle: `${alert.reason} (${alert.diff_percent}%)`,
          is_read: alert.is_read,
          article_id: alert.article.id,
        }))
      );
    })();
  }, []);

  useFraudAlerts((alert: FraudAlert) => {
    setNotifications((prev) => [
      {
        id: alert.id.toString(),
        title: `Nouvelle anomalie : ${alert.article.title}`,
        subtitle: `${alert.reason} (${alert.diff_percent}%)`,
        is_read: false,
        article_id: alert.article.id,
      },
      ...prev,
    ]);

    showAlertPopup({
      type: "fraud",
      title: alert.article.title,
      message: `${alert.reason} (${alert.diff_percent}%)`,
      severity: "warning",
    });
  });
  if (!user) return;
  if (loading) return null;

  const unreadCount = notifications.filter((n) => !n.is_read).length;

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
          <Typography
            variant="h6"
            fontWeight={700}
            onClick={() => {
              if (user) {
                navigate("/adminDashboard");
              }
            }}
          >
            Collector.Shop Backoffice
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={(e) => {
              setAnchorNotif(e.currentTarget);
            }}
            sx={{ color: "white" }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <DropdownList
            anchorEl={anchorNotif}
            open={Boolean(anchorNotif)}
            onClose={() => setAnchorNotif(null)}
            items={notifications.slice(0, visibleCount)}
            emptyText="Aucune notification"
            onItemClick={async (item) => {
              await markNotificationAsRead(item.id);
              setNotifications((prev) =>
                prev.map((n) =>
                  n.id === item.id ? { ...n, is_read: true } : n
                )
              );
              navigate("/alertfraude");
            }}
            onMarkAllRead={async () => {
              await markAllNotificationsAsRead();
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, is_read: true }))
              );
            }}
            onMarkAllUnread={async () => {
              await markAllNotificationsAsUnread();
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, is_read: false }))
              );
            }}
            onViewAll={() => navigate("/alertfraude")}
            onLoadMore={() => setVisibleCount((prev) => prev + 10)}
            hasMore={visibleCount < notifications.length}
          />

          <Avatar sx={{ ml: 1 }}>
            {user.firstname?.[0]?.toUpperCase() ?? "?"}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
