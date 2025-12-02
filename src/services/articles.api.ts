import type { Article } from "../types/articles.type";

const API = "http://localhost:4000/articles";

export async function getArticles(): Promise<Article[]> {
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });
  return res.json();
}

export async function approveArticle(id: string) {
  const res = await fetch(`http://localhost:4000/articles/${id}/approve`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });

  return res.json();
}
