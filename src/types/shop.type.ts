import type { Article } from "./articles.type";

export interface Shop {
  id: string;
  name: string;
  description: string;

  owner: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };

  articles: Article[];

  created_at: string;
  updated_at: string;
}
