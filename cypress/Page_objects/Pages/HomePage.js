class HomePage {
    get signInButton() {
        return cy.get('.header_signin');
    }
    visit() {
        cy.visit('/')
    }
    /*   url: path,
      auth: {
        username: Cypress.env('AUTH_USERNAME'),
        password: Cypress.env('AUTH_PASSWORD')
      }
    });
  }  */

    openSignInForm() {
        cy.get('button').contains('Sign In').click();
    }
}

export default new HomePage();
