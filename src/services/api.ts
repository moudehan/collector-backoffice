const API_URL = import.meta.env.VITE_API_URL;

export async function getStats() {
  const token = localStorage.getItem("TOKEN");
  if (!token) throw new Error("Non authentifié");

  const res = await fetch(`${API_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Impossible de récupérer les statistiques");

  return res.json();
}
