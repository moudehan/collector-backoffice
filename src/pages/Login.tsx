import { Box, Paper, Typography } from "@mui/material";
import keycloakAdmin from "../../keycloak";
import AnimatedButton from "../components/Button";

export default function Login() {
  async function handleLogin() {
    await keycloakAdmin.login({
      redirectUri: window.location.origin + "/adminDashboard",
      prompt: "login",
    });
  }

  return (
    <Box
      sx={{
        bgcolor: "#0D1B2A",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          bgcolor: "#fff",
        }}
      >
        <Typography fontSize={32} fontWeight={800} mb={3} color="#0D1B2A">
          Login Admin
        </Typography>

        <Typography mb={3} color="gray">
          Connectez-vous à votre espace d'administration
        </Typography>

        <AnimatedButton
          label="Se connecter avec Keycloak"
          width="100%"
          height={50}
          onClick={handleLogin}
          sx={{
            fontWeight: 700,
            fontSize: 17,
            borderRadius: "10px",
            mt: 2,
          }}
        />
      </Paper>
    </Box>
  );
}
