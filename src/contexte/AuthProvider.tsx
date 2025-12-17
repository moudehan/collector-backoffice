import { useEffect, useState, type ReactNode } from "react";
import keycloakAdmin from "../../keycloak";
import type { User } from "../types/user.type";
import { AuthContext } from "./auth.contexte";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  function buildUserFromToken() {
    const parsed = keycloakAdmin.tokenParsed as
      | (Record<string, unknown> & {
          email?: string;
          preferred_username?: string;
          name?: string;
          sub?: string;
          realm_access?: { roles?: string[] };
        })
      | undefined;

    if (!parsed) {
      setUser(null);
      return;
    }

    const roles = parsed.realm_access?.roles ?? [];

    const mapped: Partial<User> = {
      id: parsed.sub ?? "",
      email: parsed.email ?? "",
      userName:
        parsed.preferred_username ?? parsed.name ?? parsed.email ?? "admin",
      role: (roles.includes("ADMIN") ? "ADMIN" : "USER") as User["role"],
    };

    setUser(mapped as User);
  }

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);

      try {
        const authenticated = await keycloakAdmin.init({
          onLoad: "check-sso",
          checkLoginIframe: false,
        });

        if (!isMounted) return;

        if (authenticated && keycloakAdmin.token) {
          localStorage.setItem("TOKEN", keycloakAdmin.token);
          buildUserFromToken();
        } else {
          localStorage.removeItem("TOKEN");
          setUser(null);
        }
      } catch (err) {
        console.error("Erreur init Keycloak ADMIN", err);
        localStorage.removeItem("TOKEN");
        setUser(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  async function logout() {
    setIsLoggingOut(true);

    try {
      setUser(null);
      localStorage.removeItem("TOKEN");

      await keycloakAdmin.logout({
        redirectUri: window.location.origin + "/",
      });
    } catch (err) {
      console.error("Erreur logout Keycloak admin", err);
      window.location.replace("/");
    } finally {
      setIsLoggingOut(false);
    }
  }

  async function refreshUser() {
    if (keycloakAdmin.authenticated && keycloakAdmin.token) {
      localStorage.setItem("TOKEN", keycloakAdmin.token);
      buildUserFromToken();
    } else {
      setUser(null);
      localStorage.removeItem("TOKEN");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, logout, refreshUser, isLoggingOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
