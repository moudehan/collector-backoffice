import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import DataTable from "../../components/DataTable";
import DashboardLayout from "../../layout/DashboardLayout";

import { getShops } from "../../services/shops.api";

import { useNavigate } from "react-router-dom";
import type { Article } from "../../types/articles.type";
import type { Shop } from "../../types/shop.type";

export default function ArticlesPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const shopsPerPage = 18;

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

  const startIndex = (page - 1) * shopsPerPage;
  const paginatedShops = shops.slice(startIndex, startIndex + shopsPerPage);
  const totalPages = Math.ceil(shops.length / shopsPerPage);

  return (
    <DashboardLayout>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Boutiques
      </Typography>

      <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
        {paginatedShops.map((shop) => {
          const isSelected = selectedShop?.id === shop.id;

          return (
            <Card
              key={shop.id}
              onClick={() => handleSelectShop(shop)}
              sx={{
                height: 190,
                cursor: "pointer",
                borderRadius: "14px",
                padding: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      <Box mt={4}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Articles de la boutique : {selectedShop ? selectedShop.name : ""}
        </Typography>

        <DataTable<Article>
          title="Liste des articles"
          data={articles}
          columns={[
            { field: "id", label: "ID" },
            { field: "title", label: "Titre" },
            { field: "description", label: "Description" },
            { field: "price", label: "Prix (€)" },
            {
              field: "category" as keyof Article,
              label: "Catégorie",
              render: (_, row) => <span>{row.category?.name ?? "—"}</span>,
            },
            {
              field: "status",
              label: "Statut",
              render: (_, row) => {
                const s = String(row.status ?? "").toUpperCase();

                const label =
                  s === "PENDING"
                    ? "En attente"
                    : s === "REJECTED"
                    ? "Rejeté"
                    : "Approuvé";

                const bg =
                  s === "PENDING"
                    ? "#FFF3CD"
                    : s === "REJECTED"
                    ? "#F8D7DA"
                    : "#D4EDDA";

                const color =
                  s === "PENDING"
                    ? "#856404"
                    : s === "REJECTED"
                    ? "#721C24"
                    : "#155724";

                return (
                  <Chip
                    label={label}
                    sx={{
                      background: bg,
                      color,
                      fontWeight: 600,
                      borderRadius: "6px",
                    }}
                  />
                );
              },
            },
          ]}
          rowClickable={true}
          onRowClick={(row) => navigate(`/articles/${row.id}`)}
        />
      </Box>
    </DashboardLayout>
  );
}
