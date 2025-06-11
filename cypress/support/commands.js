Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://qauto.forstudy.space', {
        auth: {
            username: 'guest',
            password: 'welcome2qauto',
        },
    });

    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('.modal-content').should('be.visible');

    cy.contains('Log in').click();

    cy.get('#loginEmail').clear().type(email);
    cy.get('#loginPassword').clear().type(password);

    cy.get('button.btn.btn-primary').contains('Login').click();

    cy.contains('Garage').should('be.visible');
});