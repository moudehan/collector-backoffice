import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import DataTable from "../../components/DataTable";
import DashboardLayout from "../../layout/DashboardLayout";

import { approveArticle } from "../../services/articles.api";
import { getShops } from "../../services/shops.api";

import { useNavigate } from "react-router-dom";
import type { Article } from "../../types/articles.type";
import type { Shop } from "../../types/shop.type";

export default function ArticlesPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const shopsData = await getShops();
      setShops(shopsData);
    })();
  }, []);

  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop);
    setArticles(shop.articles || []);
  };

  const handleApprove = async (articleId: string) => {
    await approveArticle(articleId);

    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, status: "approved" } : a))
    );
  };

  return (
    <DashboardLayout>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Boutiques
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap">
        {shops.map((shop) => {
          const isSelected = selectedShop?.id === shop.id;

          return (
            <Card
              key={shop.id}
              onClick={() => handleSelectShop(shop)}
              sx={{
                width: 280,
                cursor: "pointer",
                borderRadius: "14px",
                padding: 1,
                boxShadow: isSelected
                  ? "0px 4px 18px rgba(25, 118, 210, 0.4)"
                  : "0px 2px 10px rgba(0,0,0,0.1)",
                border: isSelected ? "2px solid #1976d2" : "1px solid #e0e0e0",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0px 4px 18px rgba(0,0,0,0.15)",
                  border: "1px solid #1976d2",
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <StorefrontIcon color="primary" />
                  <Typography variant="h6" fontWeight={700}>
                    {shop.name}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  {shop.description}
                </Typography>

                <Chip
                  label={`${shop.articles?.length ?? 0} article(s)`}
                  color="primary"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      <Box mt={4}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Articles de la boutique : {selectedShop ? selectedShop.name : ""}
        </Typography>

        <DataTable<Article>
          title="Liste des articles"
          data={articles}
          columns={[
            { field: "id", label: "ID", width: "400px" },
            { field: "title", label: "Titre", width: "200px" },
            { field: "description", label: "Description", width: "280px" },
            { field: "price", label: "Prix (€)", width: "120px" },
            {
              field: "category" as keyof Article,
              label: "Catégorie",
              width: "150px",
              render: (_, row) => <span>{row.category?.name ?? "—"}</span>,
            },
            {
              field: "status",
              label: "Statut",
              width: "150px",
              render: (_, row) => (
                <Chip
                  label={row.status}
                  sx={{
                    background:
                      row.status === "pending" ? "#FFF3CD" : "#D4EDDA",
                    color: row.status === "pending" ? "#856404" : "#155724",
                    fontWeight: 600,
                    borderRadius: "6px",
                  }}
                />
              ),
            },
            {
              field: "" as keyof Article,
              label: "Actions",
              width: "120px",
              render: (_, row) =>
                row.status === "pending" ? (
                  <IconButton
                    color="success"
                    onClick={() => handleApprove(row.id)}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                ) : (
                  <span style={{ opacity: 0.4 }}>—</span>
                ),
            },
          ]}
          rowClickable={true}
          onRowClick={(row) => navigate(`/articles/${row.id}`)}
        />
      </Box>
    </DashboardLayout>
  );
}
