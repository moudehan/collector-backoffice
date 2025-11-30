export async function loginAdmin(email: string, password: string) {
  const res = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: "http://localhost:4000",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Identifiants incorrects");

  return res.json();
}

export async function logout() {
  const token = localStorage.getItem("token");

  await fetch("http://localhost:4000/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  localStorage.removeItem("TOKEN");
  window.location.href = "/login";
}
