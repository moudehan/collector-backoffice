describe("Admin Login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays admin login page", () => {
    cy.contains("Login Admin").should("be.visible");
    cy.contains("Connectez-vous à votre espace d'administration").should(
      "be.visible"
    );
  });

  it("shows login button", () => {
    cy.contains("Se connecter avec Keycloak")
      .should("be.visible")
      .and("not.be.disabled");
  });

  it("triggers login on click", () => {
    cy.contains("Se connecter avec Keycloak").click();
  });
});
