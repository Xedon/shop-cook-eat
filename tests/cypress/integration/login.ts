/// <reference types="cypress" />

it("Login works", () => {
  cy.login({ view: "Lists" });
  cy.visit("/");
  cy.findByText("Add Shopping List");
});

it("TokenRefresh works", () => {
  cy.login({ expiredAuthToken: true });
  cy.visit("/");
  cy.findByText("Add Shopping List");
});

it("Google reauth works", () => {
  cy.login({ expiredAuthToken: true, expiredRefreshToken: true });
  cy.visit("/");
  cy.findByText("Login/Registration");
});
