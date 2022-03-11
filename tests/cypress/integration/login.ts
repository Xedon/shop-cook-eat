/// <reference types="cypress" />

it("Login works", () => {
  cy.login({ view: "Lists" });
  cy.visit("https://localhost:3000");
  cy.findByText("Add Shopping List");
});

it("TokenRefresh works", () => {
  cy.login({ expiredAuthToken: true });
  cy.visit("https://localhost:3000");
  cy.findByText("Add Shopping List");
});

it("Google reauth works", () => {
  cy.login({ expiredAuthToken: true, expiredRefreshToken: true });
  cy.visit("https://localhost:3000");
  cy.findByText("Login/Registration");
});
