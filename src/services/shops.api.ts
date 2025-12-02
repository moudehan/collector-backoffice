import type { Shop } from "../types/shop.type";

const API = "http://localhost:4000/shops/admin/all";

export async function getShops(): Promise<Shop[]> {
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des boutiques");
  }

  return res.json();
}
