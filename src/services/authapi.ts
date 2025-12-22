const API_URL = import.meta.env.VITE_API_URL;

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
