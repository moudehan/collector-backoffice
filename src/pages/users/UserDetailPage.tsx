import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Security";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import { deleteUserAdmin, getUserById } from "../../services/user.api";
import type { User } from "../../types/user.type";

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const stateUser = location.state as User | undefined;
  const [user, setUser] = useState<User | null>(stateUser ?? null);
  const [loading, setLoading] = useState(!stateUser);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (stateUser || !id) return;

    (async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, stateUser]);

  const handleDeleteUser = async () => {
    if (!id) return;

    if (
      !confirm("Voulez-vous VRAIMENT supprimer cet utilisateur frauduleux ?")
    ) {
      return;
    }

    try {
      setDeleting(true);
      await deleteUserAdmin(id);
      alert("Utilisateur supprimé avec succès.");
      navigate("/users");
    } finally {
      setDeleting(false);
    }
  };

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

      {user.isFraudulent && (
        <Alert
          severity="error"
          icon={<WarningAmberIcon fontSize="large" />}
          sx={{
            mb: 3,
            p: 2,
            fontSize: 16,
            borderRadius: 2,
            border: "1px solid red",
            backgroundColor: "#ffe5e5",
          }}
        >
          Cet utilisateur a été détecté comme{" "}
          <strong>potentiellement frauduleux</strong>.
          <br />
          Plusieurs anomalies de prix ont été relevées.
        </Alert>
      )}

      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          mb: 4,
          backgroundColor: user.isFraudulent ? "#fff8d6" : "white",
          border: user.isFraudulent ? "2px solid #f4c430" : "none",
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: user.isFraudulent ? "red" : "#0047FF",
                fontSize: 42,
                fontWeight: 900,
                border: user.isFraudulent ? "4px solid yellow" : "none",
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
                  sx={{ color: user.role === "ADMIN" ? "red" : "green" }}
                />
                <Typography
                  component="span"
                  ml={1}
                  fontWeight={700}
                  color={user.role === "ADMIN" ? "error.main" : "success.main"}
                >
                  {user.role.toUpperCase()}
                </Typography>
              </Box>
            </Box>

            {user.isFraudulent && (
              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<DeleteForeverIcon />}
                onClick={handleDeleteUser}
                disabled={deleting}
                sx={{
                  height: "fit-content",
                  fontWeight: 700,
                  px: 3,
                }}
              >
                {deleting ? "Suppression..." : "Supprimer l’utilisateur"}
              </Button>
            )}
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
            <Card
              sx={{
                border: user.isFraudulent ? "2px solid #f4c430" : "none",
                p: 3,
                textAlign: "center",
                boxShadow: 0,
              }}
            >
              <StoreIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography fontWeight={800}>{user.stats.totalShops}</Typography>
              <Typography color="gray">Boutiques</Typography>
            </Card>

            <Card
              sx={{
                p: 3,
                textAlign: "center",
                border: user.isFraudulent ? "2px solid #f4c430" : "none",
                boxShadow: 0,
              }}
            >
              <ShoppingBagIcon color="success" sx={{ fontSize: 40 }} />
              <Typography fontWeight={800}>
                {user.stats.totalArticles}
              </Typography>
              <Typography color="gray">Articles</Typography>
            </Card>

            <Card
              sx={{
                p: 3,
                textAlign: "center",
                border: user.isFraudulent ? "2px solid #f4c430" : "none",
                boxShadow: 0,
              }}
            >
              {" "}
              <NotificationsIcon color="warning" sx={{ fontSize: 40 }} />
              <Typography fontWeight={800}>
                {user.stats.totalNotifications}
              </Typography>
              <Typography color="gray">Notifications</Typography>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
