export interface User {
  isFraudulent: boolean;
  id: string;
  email: string;
  userName: string;
  firstname: string;
  lastname: string;
  role: "admin" | "user";
  created_at: string;

  stats: {
    totalShops: number;
    totalArticles: number;
    totalNotifications: number;
  };
}
