import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import AnimatedButton from "../components/Button";
import { loginAdmin } from "../services/authapi";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    console.log("Handle login called");
    try {
      setError("");
      const data = await loginAdmin(email, password);
      localStorage.setItem("TOKEN", data.access_token);
      navigate("/admin");
    } catch {
      setError("Email ou mot de passe incorrect");
    }
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

        <TextField
          label="Email"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          sx={{ mb: 1 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="red" fontSize={14} mb={1}>
            {error}
          </Typography>
        )}

        <AnimatedButton
          label="Se connecter"
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
