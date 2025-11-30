import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MailIcon from "@mui/icons-material/Mail";
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

export default function Topbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#0f172a",
        color: "white",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            edge="start"
            sx={{ color: "white", display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700}>
            Admin
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={3} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <HelpOutlineIcon />
          </IconButton>
          <Avatar
            alt="John David"
            src="https://i.pravatar.cc/100?img=3"
            sx={{ ml: 1 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
