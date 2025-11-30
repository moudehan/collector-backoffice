import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  value: string | number;
  label: string;
}

export default function StatCard({ icon, value, label }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        borderRadius: 3,
        boxShadow: "0px 4px 16px rgba(15,23,42,0.05)",
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          bgcolor: "#f9731611",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#f97316",
          fontSize: 48,
        }}
      >
        {icon}
      </Box>

      <Typography fontSize={34} fontWeight={700}>
        {value}
      </Typography>
      <Typography color="text.secondary">{label}</Typography>
    </Paper>
  );
}
