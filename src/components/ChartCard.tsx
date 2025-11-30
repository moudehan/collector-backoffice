import { Paper, Box, Typography } from "@mui/material";

export default function ChartCard() {
  return (
    <Paper
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
        boxShadow: "0px 4px 16px rgba(15,23,42,0.05)",
      }}
    >
      <Typography variant="h6" mb={2} fontWeight={600}>
        Extra Area Chart
      </Typography>
      <Box
        sx={{
          height: 260,
          borderRadius: 2,
          bgcolor: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          fontSize: 14,
        }}
      >
        Zone graphique (à connecter plus tard)
      </Box>
    </Paper>
  );
}
