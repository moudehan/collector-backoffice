const API = "http://localhost:4000/fraud/alerts";

export async function getFraudAlerts() {
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  });

  if (!res.ok) throw new Error("Erreur lors de la récupération des alertes");

  return res.json();
}
