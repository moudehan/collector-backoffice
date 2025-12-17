import type { User } from "../types/user.type";

export const API_URL = "http://localhost:4000";

export async function getAllUsersAdmin(): Promise<User[]> {
  const token = localStorage.getItem("TOKEN");

  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Impossible de charger les utilisateurs");
  }

  return res.json();
}

export async function getUserById(id: string): Promise<User> {
  const token = localStorage.getItem("TOKEN");

  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Utilisateur introuvable");
  }

  return res.json();
}

export async function deleteUserAdmin(id: string): Promise<void> {
  const token = localStorage.getItem("TOKEN");

  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Suppression impossible");
  }
}

export async function getMe() {
  const token = localStorage.getItem("TOKEN");

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Impossible de récupérer le profil");
  }

  return data;
}
