import type { Category, CategoryInput } from "../types/categories.type";
const API_URL = import.meta.env.VITE_API_URL;

const API = `${API_URL}/admin/categories`;

function getToken() {
  return localStorage.getItem("TOKEN");
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error("Erreur chargement catégories");
  return res.json();
}

export async function createCategory(input: CategoryInput): Promise<Category> {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error("Erreur création catégorie");
  return res.json();
}

export async function updateCategory(
  id: string,
  input: CategoryInput
): Promise<Category> {
  const res = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error("Erreur mise à jour catégorie");
  return res.json();
}

export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error("Erreur suppression catégorie");
}
