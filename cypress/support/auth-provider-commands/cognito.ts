import {
  CREATE_ACCOUNT_LINK,
  SIGN_IN_BUTTON,
  SIGN_IN_LINK,
  SIGN_OUT_BUTTON,
  WELCOME_MESSAGE,
} from '../../constants';

const loginToCognito = (username: string, password: string) => {
  cy.visit('/');

  cy.contains(SIGN_IN_LINK);
  cy.contains(CREATE_ACCOUNT_LINK);

  cy.get('input[name="username"]:visible').type(username);
  cy.get('input[name="password"]:visible').type(password, {
    // use log: false to prevent your password from showing in the Command Log
    log: false,
  });
  cy.get('button').contains(SIGN_IN_BUTTON).should('be.visible').click();

  // give a few seconds for sign in to complete
  cy.wait(2000);

  // verify we have made it passed the login screen
  cy.contains(SIGN_OUT_BUTTON).should('be.visible');
};

// Custom Cypress command
Cypress.Commands.add('loginByCognito', (username, password) => {
  cy.session(
    `cognito-${username}`,
    () => {
      return loginToCognito(username, password);
    },
    {
      validate() {
        cy.visit('/');

        // revalidate our session to make sure we are logged in
        cy.contains(WELCOME_MESSAGE).should('be.visible');
      },
    }
  );
});
