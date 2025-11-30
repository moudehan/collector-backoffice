import { Box } from "@mui/material";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <Box sx={{ p: 3, overflowY: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
