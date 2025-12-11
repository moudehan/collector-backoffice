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
        data.map((alert) => {
          const isUserAlert = alert.reason
            .toLowerCase()
            .includes("l'utilisateur");

          return {
            id: alert.id.toString(),
            title: isUserAlert
              ? "Utilisateur potentiellement frauduleux"
              : `${alert.article.title}`,
            subtitle: `${alert.reason} (${alert.diff_percent}%)`,
            is_read: alert.is_read,
            article_id: alert.article.id,
            user_id: alert.user_id ?? null,
            isUserAlert,
          };
        })
      );
    })();
  }, []);

  useFraudAlerts((alert: FraudAlert) => {
    const isUserAlert = alert.reason.toLowerCase().includes("l'utilisateur");

    setNotifications((prev) => [
      {
        id: alert.id.toString(),
        title: isUserAlert
          ? "Utilisateur potentiellement frauduleux"
          : `Nouvelle anomalie : ${alert.article.title}`,
        subtitle: `${alert.reason} (${alert.diff_percent}%)`,
        is_read: false,
        article_id: alert.article.id,
        user_id: alert.user_id ?? null,
        isUserAlert,
      },
      ...prev,
    ]);

    showAlertPopup({
      type: "fraud",
      title: isUserAlert ? "Utilisateur suspect" : alert.article.title,
      message: `${alert.reason} (${alert.diff_percent}%)`,
      severity: isUserAlert ? "error" : "warning",
    });
  });

  if (!user) return null;
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
            onClick={() => navigate("/adminDashboard")}
            sx={{ cursor: "pointer" }}
          >
            Collector.Shop Backoffice
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={(e) => setAnchorNotif(e.currentTarget)}
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
              if (item.isUserAlert && item.user_id) {
                return navigate(`/user/${item.user_id}`);
              }

              navigate(`/articles/${item.article_id}`);
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
