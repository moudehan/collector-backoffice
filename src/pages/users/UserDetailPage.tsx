import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Security";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";

import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import { getUserById } from "../../services/user.api";
import type { User } from "../../types/user.type";

export default function UserDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  const stateUser = location.state as User | undefined;

  const [user, setUser] = useState<User | null>(stateUser ?? null);
  const [loading, setLoading] = useState(!stateUser);

  useEffect(() => {
    if (stateUser) return;

    if (!id) return;

    (async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, stateUser]);

  if (loading || !user) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            gap: 2,
          }}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography color="text.secondary">
            Chargement de l’utilisateur...
          </Typography>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Détail de l’utilisateur
      </Typography>

      <Card sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: "#0047FF",
                fontSize: 42,
                fontWeight: 900,
              }}
            >
              {user.firstname[0].toUpperCase()}
            </Avatar>

            <Box flex={1}>
              <Typography variant="h4" fontWeight={800}>
                {user.userName}
              </Typography>

              <Typography color="text.secondary" mt={1}>
                {user.email}
              </Typography>

              <Box mt={1}>
                <ShieldIcon
                  sx={{ color: user.role === "admin" ? "red" : "green" }}
                />
                <Typography
                  component="span"
                  ml={1}
                  fontWeight={700}
                  color={user.role === "admin" ? "error.main" : "success.main"}
                >
                  {user.role.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" fontWeight={700} mb={2}>
            Informations personnelles
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonIcon color="primary" />
              <Typography fontWeight={600}>Nom :</Typography>
              <Typography>{user.lastname}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <PersonIcon color="primary" />
              <Typography fontWeight={600}>Prénom :</Typography>
              <Typography>{user.firstname}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography fontWeight={600}>Créé le :</Typography>
              <Typography>
                {new Date(user.created_at).toLocaleString()}
              </Typography>
            </Stack>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" fontWeight={700} mb={2}>
            Activité du compte
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            <Card sx={{ p: 3, textAlign: "center" }}>
              <StoreIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography fontWeight={800}>{user.stats.totalShops}</Typography>
              <Typography color="gray">Boutiques</Typography>
            </Card>

            <Card sx={{ p: 3, textAlign: "center" }}>
              <ShoppingBagIcon color="success" sx={{ fontSize: 40 }} />
              <Typography fontWeight={800}>
                {user.stats.totalArticles}
              </Typography>
              <Typography color="gray">Articles</Typography>
            </Card>

            <Card sx={{ p: 3, textAlign: "center" }}>
              <NotificationsIcon color="warning" sx={{ fontSize: 40 }} />
              <Typography fontWeight={800}>
                {user.stats.totalNotifications}
              </Typography>
              <Typography color="gray">Notifications</Typography>
            </Card>
          </Box>

          {user.stats.totalNotifications >= 3 && (
            <Box mt={4}>
              <Alert severity="warning" sx={{ fontSize: 15 }}>
                Cet utilisateur a un comportement suspect.
                <br />
                Surveillance recommandée.
              </Alert>
            </Box>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
