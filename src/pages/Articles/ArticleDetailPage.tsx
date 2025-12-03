import PendingIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ModalDeleteConfirm from "../../components/ModalDeleteConfirm";
import PriceHistoryChart from "../../components/PriceHistoryChart";
import DashboardLayout from "../../layout/DashboardLayout";

import { deleteArticle, getArticleById } from "../../services/articles.api";
import type { Article } from "../../types/articles.type";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getArticleById(id!);
      setArticle(data);
    })();
  }, [id]);

  if (!article) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            gap: 2,
          }}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography color="text.secondary">
            Chargement de l’article...
          </Typography>
        </Box>
      </DashboardLayout>
    );
  }

  const alertCount = article.fraud_alerts?.length ?? 0;

  const handleConfirmDelete = async () => {
    await deleteArticle(article.id);
    setOpenDeleteModal(false);
    navigate("/articles");
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Détail de l’article
      </Typography>

      <Card sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={3}>
            <Box
              sx={{
                width: 240,
                height: 240,
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "#f1f1f1",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <img
                alt={article.title}
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
            </Box>

            <Box flex={1}>
              <Typography variant="h4" fontWeight={800}>
                {article.title}
              </Typography>

              <Typography color="text.secondary" mt={1}>
                {article.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocalOfferIcon color="primary" />
                  <Typography fontWeight={600}>Prix :</Typography>
                  <Typography>{article.price} €</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocalShippingIcon color="info" />
                  <Typography fontWeight={600}>Frais de livraison :</Typography>
                  <Typography>{article.shipping_cost} €</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <CategoryIcon color="secondary" />
                  <Typography fontWeight={600}>Catégorie :</Typography>
                  <Typography>{article.category.name}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  {article.status === "pending" ? (
                    <PendingIcon sx={{ color: "#DAA520" }} />
                  ) : (
                    <CheckCircleIcon color="success" />
                  )}

                  <Typography fontWeight={600}>Statut :</Typography>
                  <Typography
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor:
                        article.status === "pending"
                          ? "warning.light"
                          : "success.light",
                      color:
                        article.status === "pending"
                          ? "warning.dark"
                          : "success.dark",
                      fontWeight: 700,
                    }}
                  >
                    {article.status === "pending" ? "En attente" : "Approuvé"}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <FavoriteIcon color="error" />
                  <Typography fontWeight={600}>Likes :</Typography>
                  <Typography>{article.likesCount}</Typography>
                </Stack>
              </Box>
            </Box>
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" fontWeight={700} mb={2}>
            Informations boutique & vendeur
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 3,
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Boutique
              </Typography>
              <Typography fontSize={15} fontWeight={600}>
                {article.shop.name}
              </Typography>
              <Typography color="text.secondary">
                {article.shop.description}
              </Typography>

              <Box mt={2}>
                <Typography fontWeight={600} mb={0.5}>
                  👤 Propriétaire :
                </Typography>
                <Typography>Email : {article.shop.owner.email}</Typography>
                <Typography>
                  Création :{" "}
                  {new Date(article.shop.owner.created_at).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Vendeur
              </Typography>
              <Typography>Email : {article.seller.email}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" fontWeight={700} mb={2}>
            Alertes de fraude (total : {alertCount})
          </Typography>

          {alertCount > 0 ? (
            <Stack spacing={1}>
              {article.fraud_alerts.slice(0, 5).map((a) => (
                <Alert key={a.id} severity="warning">
                  {a.reason}
                </Alert>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">
              Aucune alerte enregistrée.
            </Typography>
          )}

          {alertCount >= 5 && (
            <Box mt={3}>
              <Alert severity="error" sx={{ fontSize: 15, mb: 2 }}>
                Cet article a atteint <b>{alertCount}</b> alertes de fraude. Il
                est probablement frauduleux.
              </Alert>

              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={() => setOpenDeleteModal(true)}
              >
                Supprimer l’article
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" fontWeight={700} mb={2}>
            Historique des prix
          </Typography>

          <PriceHistoryChart history={article.price_history} />
        </CardContent>
      </Card>

      <ModalDeleteConfirm
        open={openDeleteModal}
        label={article.title}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  );
}
