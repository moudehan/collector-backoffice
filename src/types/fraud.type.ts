export interface FraudAlert {
  id: string;
  article: {
    id: string;
    title: string;
  };
  severity: "low" | "medium" | "high";
  reason: string;
  average_price: number;
  last_price_recorded: number;
  diff_percent: number;
  is_read: boolean;
  created_at: string;
  user_id: string;
}
