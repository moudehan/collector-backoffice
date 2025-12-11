import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AnimatedButton from "../components/Button";
import DataTable from "../components/DataTable";
import DashboardLayout from "../layout/DashboardLayout";

import ModalAddForm from "../components/ModalAddForm";
import ModalDeleteConfirm from "../components/ModalDeleteConfirm";
import ModalEditForm from "../components/ModalEditForm";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/category.api";

import type { Category, CategoryInput } from "../types/categories.type";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Category | null>(null);

  const load = async () => {
    const data = await getCategories();
    setCategories(data);
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
          Catégories
        </Typography>

        <AnimatedButton
          variant="contained"
          sx={{ borderRadius: "30px" }}
          label="+ Ajouter une catégorie"
          onClick={() => setAddOpen(true)}
        />
      </Box>

      <DataTable<Category>
        title="Liste des Catégories"
        data={categories}
        columns={[
          { field: "id", label: "ID" },
          { field: "name", label: "Nom" },
          { field: "description", label: "Description" },

          {
            field: "" as keyof Category,
            label: "Actions",
            render: (_, row) => (
              <Box display="flex" gap={1}>
                <EditIcon
                  sx={{ cursor: "pointer", color: "#1976d2" }}
                  onClick={() => {
                    setSelected(row);
                    setEditOpen(true);
                  }}
                />

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

      <ModalAddForm
        open={addOpen}
        title="Nouvelle catégorie"
        fields={[
          { name: "name", label: "Nom", required: true },
          { name: "description", label: "Description", multiline: true },
        ]}
        initialValues={{
          name: "",
          description: "",
        }}
        onClose={() => setAddOpen(false)}
        onSubmit={async (values) => {
          const payload: CategoryInput = {
            name: values.name,
            description: values.description,
          };

          const newCat = await createCategory(payload);

          setCategories((prev) => [newCat, ...prev]);
          setAddOpen(false);
        }}
      />

      {selected && (
        <ModalEditForm
          open={editOpen}
          title="Modifier la catégorie"
          fields={[
            { name: "name", label: "Nom", required: true },
            { name: "description", label: "Description", multiline: true },
          ]}
          initialValues={{
            name: selected.name,
            description: selected.description ?? "",
          }}
          onClose={() => setEditOpen(false)}
          onSubmit={async (values) => {
            const payload: CategoryInput = {
              name: values.name,
              description: values.description,
            };

            const updated = await updateCategory(selected.id, payload);

            setCategories((prev) =>
              prev.map((c) => (c.id === selected.id ? updated : c))
            );

            setEditOpen(false);
          }}
        />
      )}

      {selected && (
        <ModalDeleteConfirm
          open={deleteOpen}
          label={selected.name}
          error={deleteError}
          onClose={() => {
            setDeleteOpen(false);
            setDeleteError(null);
          }}
          onConfirm={async () => {
            try {
              setDeleteError(null);
              await deleteCategory(selected.id);
              setDeleteOpen(false);
              load();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
              console.log(err);

              setDeleteError(err.message);
            }
          }}
        />
      )}
    </DashboardLayout>
  );
}
