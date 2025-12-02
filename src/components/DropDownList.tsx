import { Box, ListItemText, Menu, MenuItem, Typography } from "@mui/material";

type Item = {
  id: string;
  title: string;
  subtitle?: string;
};

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: Item[];
  emptyText: string;
  onItemClick?: (item: Item) => void;
};

export default function DropdownList({
  anchorEl,
  open,
  onClose,
  items,
  emptyText,
  onItemClick,
}: Props) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {items.length === 0 && (
        <MenuItem>
          <Typography color="text.secondary">{emptyText}</Typography>
        </MenuItem>
      )}

      {items.map((item) => (
        <MenuItem
          key={item.id}
          onClick={() => {
            onClose();
            onItemClick?.(item);
          }}
        >
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
      ))}
    </Menu>
  );
}
