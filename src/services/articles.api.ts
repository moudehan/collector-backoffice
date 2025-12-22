import type { Article } from "../types/articles.type";
const API_URL = import.meta.env.VITE_API_URL;

export async function getArticles(): Promise<Article[]> {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });
  return res.json();
}

export async function approveArticle(id: string) {
  const res = await fetch(`${API_URL}/articles/${id}/approve`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });

  return res.json();
}

export async function getArticleById(id: string) {
  const res = await fetch(`${API_URL}/articles/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });

  if (!res.ok) throw new Error("Erreur lors de la récupération de l'article");

  return res.json();
}

export async function deleteArticle(id: string) {
  const res = await fetch(`${API_URL}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Erreur lors de la suppression de l'article : ${error}`);
  }

  return res.json();
}
