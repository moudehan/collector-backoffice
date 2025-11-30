import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

export interface DropdownItem {
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
  icon?: ReactNode;
  onClick?: (id: string) => void;
}

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  items: DropdownItem[];
  emptyText?: string;
}

export default function DropdownList({
  anchorEl,
  open,
  onClose,
  items,
  emptyText = "Aucun élément",
}: Props) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          borderRadius: 2,
          p: 1,
          mt: 1,
        },
      }}
    >
      {items.length === 0 && (
        <Typography p={2} textAlign="center" color="text.secondary">
          {emptyText}
        </Typography>
      )}

      {items.map((item) => (
        <MenuItem key={item.id} onClick={() => item.onClick?.(item.id)}>
          {item.avatar && (
            <ListItemAvatar>
              <Avatar src={item.avatar} />
            </ListItemAvatar>
          )}
          {item.icon && <Box sx={{ mr: 1 }}>{item.icon}</Box>}

          <ListItemText
            primary={item.title}
            secondary={item.subtitle}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </MenuItem>
      ))}
    </Menu>
  );
}
