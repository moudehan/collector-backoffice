import {
  Box,
  Button,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

export type Item = {
  user_id: string;
  isUserAlert: boolean;
  id: string;
  title: string;
  subtitle?: string;
  is_read: boolean;
  article_id: string;
};

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: Item[];
  emptyText: string;
  onItemClick?: (item: Item) => void;
  onMarkAllRead?: () => void;
  onMarkAllUnread?: () => void;
  onViewAll?: () => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
};

export default function DropdownList({
  anchorEl,
  open,
  onClose,
  items,
  emptyText,
  onItemClick,
  onMarkAllRead,
  onMarkAllUnread,
  onViewAll,
  onLoadMore,
  hasMore,
}: Props) {
  const hasUnread = items.some((i) => !i.is_read);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      // PaperProps={{
      //   sx: {
      //     overflow: "visible",
      //     mt: 1.5,
      //     "& .MuiMenuItem-root": {
      //       borderRadius: 1,
      //     },

      //     "&::before": {
      //       content: '""',
      //       display: "block",
      //       position: "absolute",
      //       top: 0,
      //       right: 80,
      //       width: 10,
      //       height: 10,
      //       bgcolor: "background.paper",
      //       transform: "translateY(-50%) rotate(45deg)",
      //       zIndex: 0,
      //     },
      //   },
      // }}
    >
      {items.length > 0 && (
        <MenuItem
          disableRipple
          sx={{
            justifyContent: "space-between",
            display: "flex",
            gap: 1,
            pointerEvents: "none",
          }}
        >
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onViewAll?.();
            }}
            sx={{ pointerEvents: "auto" }}
          >
            Tout voir
          </Button>

          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (hasUnread) onMarkAllRead?.();
              else onMarkAllUnread?.();
            }}
            sx={{ pointerEvents: "auto" }}
          >
            {hasUnread ? "Tout marquer comme lu" : "Tout marquer comme non lus"}
          </Button>
        </MenuItem>
      )}

      {items.length === 0 && (
        <MenuItem>
          <Typography color="text.secondary">{emptyText}</Typography>
        </MenuItem>
      )}

      {items.map((item, index) => (
        <Box key={item.id}>
          <MenuItem
            onClick={() => {
              onItemClick?.(item);
              onClose();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: item.is_read ? "white" : "#e8f0fe",
              "&:hover": {
                backgroundColor: item.is_read ? "#f5f5f5" : "#dbe7fd",
              },
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: item.is_read ? "transparent" : "red",
                flexShrink: 0,
              }}
            />

            <ListItemText
              primary={item.title}
              secondary={
                item.subtitle && (
                  <Box component="span" color="gray">
                    {item.subtitle}
                  </Box>
                )
              }
            />
          </MenuItem>

          {index < items.length - 1 && (
            <Box
              sx={{
                height: "1px",
                bgcolor: "#e0e0e0",
                mx: 1,
              }}
            />
          )}
        </Box>
      ))}

      {hasMore && (
        <MenuItem
          onClick={() => onLoadMore?.()}
          sx={{
            justifyContent: "center",
            color: "#1976d2",
            fontWeight: 600,
          }}
        >
          Voir plus
        </MenuItem>
      )}
    </Menu>
  );
}
