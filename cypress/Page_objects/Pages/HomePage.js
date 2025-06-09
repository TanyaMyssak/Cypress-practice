class HomePage {
  visit(path = '/') {
    cy.visit({
      url: path,
      auth: {
        username: Cypress.env('AUTH_USERNAME'),
        password: Cypress.env('AUTH_PASSWORD')
      }
    });
  }

  openSignInForm() {
    cy.get('button').contains('Sign In').click(); // or whatever your UI uses
  }
}

export default new HomePage();
