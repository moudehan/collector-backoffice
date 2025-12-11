import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import ModalDeleteConfirm from "../../components/ModalDeleteConfirm";
import DashboardLayout from "../../layout/DashboardLayout";
import { deleteUserAdmin, getAllUsersAdmin } from "../../services/user.api";
import type { User } from "../../types/user.type";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const navigate = useNavigate();

  const load = async () => {
    const data = await getAllUsersAdmin();
    setUsers(data);
  };

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  return (
    <DashboardLayout>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Utilisateurs
        </Typography>
      </Box>

      <DataTable<User>
        title="Liste des utilisateurs"
        rowClickable={true}
        onRowClick={(row) => navigate(`/user/${row.id}`)}
        data={users}
        columns={[
          { field: "id", label: "ID" },
          { field: "userName", label: "Username" },
          { field: "email", label: "Email" },
          { field: "role", label: "Rôle" },
          {
            field: "actions" as keyof User,
            label: "Actions",
            render: (_, row) => (
              <Box display="flex" gap={1}>
                <DeleteIcon
                  sx={{ cursor: "pointer", color: "red" }}
                  onClick={() => {
                    setSelected(row);
                    setDeleteOpen(true);
                  }}
                />
              </Box>
            ),
          },
        ]}
      />

      {selected && (
        <ModalDeleteConfirm
          open={deleteOpen}
          label={selected.userName}
          error={deleteError}
          onClose={() => {
            setDeleteOpen(false);
            setDeleteError(null);
          }}
          onConfirm={async () => {
            try {
              setDeleteError(null);
              await deleteUserAdmin(selected.id);
              setDeleteOpen(false);
              load();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
              setDeleteError(err.message);
            }
          }}
        />
      )}
    </DashboardLayout>
  );
}
