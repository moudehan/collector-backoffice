export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  price: number | string;
  shipping_cost: number | string;
  status: string;
  category: Category;
  created_at: string;
  updated_at: string;
  seller: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}
