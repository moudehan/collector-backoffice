import { Box, LinearProgress, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import type { JSX } from "react";

interface Column<T> {
  field: keyof T;
  label: string;
  width?: number;
  render?: (value: unknown, row: T) => JSX.Element;
}

interface Props<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  rowClickable?: boolean;
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <Box sx={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </Box>
    </GridOverlay>
  );
}

export default function DataTable<T>({
  title,
  data,
  columns,
  rowClickable = false,
  onRowClick,
  loading = false,
}: Props<T>) {
  const sortedColumns = [
    ...columns.filter((c) => c.label.toLowerCase() === "actions"),
    ...columns.filter((c) => c.label.toLowerCase() !== "actions"),
  ];

  const muiColumns: GridColDef[] = sortedColumns.map((col) => {
    const isActions = col.label.toLowerCase() === "actions";

    return {
      field: col.field as string,
      headerName: col.label,
      sortable: true,

      flex: isActions ? 0 : 1,
      width: isActions ? col.width ?? 130 : undefined,

      disableColumnMenu: true,
      resizable: false,

      renderCell: col.render
        ? (params) => (
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {col.render!(params.value, params.row)}
            </Box>
          )
        : undefined,
    };
  });

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: 3,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h5" fontWeight={800} mb={3}>
        {title}
      </Typography>

      <Box
        sx={{
          height: 520,
          width: "100%",
          overflowX: "auto",
        }}
      >
        <DataGrid
          rows={data}
          columns={muiColumns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          loading={loading}
          slots={{ loadingOverlay: CustomLoadingOverlay }}
          disableColumnResize
          disableRowSelectionOnClick
          onRowClick={(params) => rowClickable && onRowClick?.(params.row as T)}
          slotProps={{
            pagination: { labelRowsPerPage: "Lignes par page" },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "16px",
              fontWeight: 900,
              backgroundColor: "#f5f6f8",
              color: "#333",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "15px",
              color: "#222",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#ecf3ff",
            },
          }}
        />
      </Box>
    </Box>
  );
}
