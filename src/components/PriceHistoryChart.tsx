import { Card, CardContent, Typography } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PriceHistoryItem } from "../types/articles.type";

export default function PriceHistoryChart({
  history,
}: {
  history: PriceHistoryItem[];
}) {
  if (!history || history.length === 0) {
    return (
      <Typography color="text.secondary">
        Aucun historique disponible.
      </Typography>
    );
  }

  const sorted = [...history].sort(
    (a, b) =>
      new Date(a.changed_at).getTime() - new Date(b.changed_at).getTime()
  );

  const formatted = sorted.map((item) => ({
    date: new Date(item.changed_at).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: Number(item.new_price),
  }));

  return (
    <Card sx={{ borderRadius: 3, mt: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Évolution du prix
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#1976d2"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
