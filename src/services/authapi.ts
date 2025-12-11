import { API_URL } from "./user.api";

export async function loginAdmin(email: string, password: string) {
  const res = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: "http://localhost:4000",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Identifiants incorrects");
  }

  return data;
}

export async function logoutApi() {
  const token = localStorage.getItem("TOKEN");

  try {
    if (token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (err) {
    console.error("Erreur logout API", err);
  } finally {
    localStorage.removeItem("TOKEN");
  }
}
