/// <reference types="cypress" />
import * as jose from "jose";
import "@testing-library/cypress/add-commands";
import { formatISO, fromUnixTime } from "date-fns";

Cypress.Commands.add(
  "login",
  ({
    authToken = true,
    refreshToken = true,
    expiredAuthToken = false,
    expiredRefreshToken = false,
    view = "Login",
  } = {}) => {
    cy.readFile("../.certs/private.key", "utf-8")
      .then(async (key) => {
        const privateKey = await jose.importPKCS8(key, "RS256");

        return {
          refreshToken: await new jose.SignJWT({})
            .setProtectedHeader({ alg: "RS256" })
            .setIssuedAt()
            .setIssuer("localhost")
            .setSubject("refreshToken")
            .setExpirationTime(expiredRefreshToken ? 1 : "1h")
            .sign(privateKey),
          authToken: await new jose.SignJWT({})
            .setProtectedHeader({ alg: "RS256" })
            .setIssuedAt()
            .setIssuer("localhost")
            .setSubject("graphql")
            .setExpirationTime(expiredAuthToken ? 1 : "1h")
            .sign(privateKey),
        };
      })
      .then((tokens) => {
        if (refreshToken) {
          cy.setCookie("auth_refresh", tokens.refreshToken, {
            secure: true,
            sameSite: "strict",
          });
        }

        if (authToken) {
          cy.setCookie("auth", tokens.authToken, {
            secure: true,
            sameSite: "strict",
          });
        }

        const store = {
          app: {
            navigation: { view },
            authTokenExpirationDate: formatISO(
              fromUnixTime(jose.decodeJwt(tokens.authToken).exp)
            ),
            refreshTokenExpirationDate: formatISO(
              fromUnixTime(jose.decodeJwt(tokens.refreshToken).exp)
            ),
          },
        };

        cy.log("Set LocalStorage STATE", JSON.stringify(store));
        localStorage.setItem("STATE", JSON.stringify(store));
      });
  }
);

declare global {
  namespace Cypress {
    interface Chainable {
      login(options?: {
        refreshToken?: boolean;
        authToken?: boolean;
        expiredRefreshToken?: boolean;
        expiredAuthToken?: boolean;
        view?: "Login" | "Lists";
      }): Chainable<Element>;
    }
  }
}

export {};
