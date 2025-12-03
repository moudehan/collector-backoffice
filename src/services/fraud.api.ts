const API = "http://localhost:4000/fraud/alerts";

export async function getFraudAlerts() {
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });

  if (!res.ok) throw new Error("Erreur lors de la récupération des alertes");

  return res.json();
}

export async function markAllNotificationsAsRead() {
  await fetch("http://localhost:4000/fraud/read-all", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });
}

export async function markNotificationAsRead(id: string) {
  await fetch(`http://localhost:4000/fraud/read/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
  });
}

export async function markAllNotificationsAsUnread() {
  await fetch("http://localhost:4000/fraud/unread-all", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });
}
