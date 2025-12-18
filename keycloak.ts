import Keycloak from "keycloak-js";

const isE2E = import.meta.env.VITE_E2E === "true";

const keycloak = isE2E
  ? {
      authenticated: false,
      login: () => Promise.resolve(),
      logout: () => Promise.resolve(),
      init: () => Promise.resolve(true),
    }
  : new Keycloak({
      url: "http://localhost:8081",
      realm: "collector",
      clientId: "collector-frontend",
    });

export default keycloak;
