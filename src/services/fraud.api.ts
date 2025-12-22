const API_URL = import.meta.env.VITE_API_URL;

export async function getFraudAlerts() {
  const res = await fetch(`${API_URL}/fraud/alerts`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });

  if (!res.ok) throw new Error("Erreur lors de la récupération des alertes");

  return res.json();
}

export async function markAllNotificationsAsRead() {
  await fetch(`${API_URL}/fraud/read-all`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });
}

export async function markNotificationAsRead(id: string) {
  await fetch(`${API_URL}/fraud/read/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
  });
}

export async function markAllNotificationsAsUnread() {
  await fetch(`${API_URL}/fraud/unread-all`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });
}
