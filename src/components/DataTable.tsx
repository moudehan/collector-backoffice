import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

interface Column<T> {
  field: keyof T;
  label: string;
  width?: string | number;
  render?: (value: unknown, row: T) => JSX.Element;
}

interface Props<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  rowClickable?: boolean;
  onRowClick?: (row: T) => void;
}

export default function DataTable<T>({
  title,
  data,
  columns,
  rowClickable = false,
  onRowClick,
}: Props<T>) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: 3,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2}>
        {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: columns.map((c) => c.width ?? "1fr").join(" "),
          fontWeight: 600,
          color: "#6b7280",
          borderBottom: "2px solid #f3f4f6",
          pb: 1,
          fontSize: 13,
          textAlign: "left",
        }}
      >
        {columns.map((col) => (
          <Box key={col.field.toString()}>{col.label}</Box>
        ))}
      </Box>

      {data.map((row: T, i) => (
        <Box
          key={i}
          onClick={() => rowClickable && onRowClick?.(row)}
          sx={{
            display: "grid",
            gridTemplateColumns: columns.map((c) => c.width ?? "1fr").join(" "),
            py: 2,
            borderBottom: "1px solid #f3f4f6",
            alignItems: "center",
            cursor: rowClickable ? "pointer" : "default",
            "&:hover": rowClickable ? { backgroundColor: "#f0f7ff" } : {},
          }}
        >
          {columns.map((col) => (
            <Box key={col.field.toString()}>
              {col.render
                ? col.render(row[col.field], row)
                : (row[col.field] as unknown as string | number)}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
