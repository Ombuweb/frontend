import '../support/auth-provider-commands/cognito';
import { SIGN_OUT_BUTTON, WELCOME_MESSAGE, SIGN_IN_LINK } from '../constants';
describe('Cognito Authentication', function () {
  beforeEach(function () {
    // Sign in before each test
    cy.loginByCognito(
      Cypress.env('cognito_username'),
      Cypress.env('cognito_password')
    );
  });

  describe('Welcome Screen', function () {
    it('displays the welcome message after login', function () {
      cy.contains(WELCOME_MESSAGE).should('be.visible');
    });

    it('shows the sign out button after login', function () {
      cy.contains(SIGN_OUT_BUTTON).should('be.visible');
    });
  });

  describe('Sign Out', function () {
    it('allows the user to sign out', function () {
      cy.contains(SIGN_OUT_BUTTON).click();
      cy.contains(SIGN_IN_LINK).should('be.visible');
    });
  });

  describe('Sign In Again', function () {
    it('allows the user to sign in again after signing out', function () {
      cy.loginByCognito(
        Cypress.env('cognito_username'),
        Cypress.env('cognito_password')
      );
      cy.contains(WELCOME_MESSAGE).should('be.visible');
    });
  });
});
