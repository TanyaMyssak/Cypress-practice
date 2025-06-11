/// <reference types="cypress" />
import HomePage from "../Page_objects/Pages/HomePage";
import SignInForm from "../Page_objects/Forms/SignInForm";


beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();

});

describe('Sign in tests with POM', () => {
    it('Successful Sign in with POM', () => {
        SignInForm.loginWithCredentials('tanyamyssak+quato1-19@gmail.com', 'Happy2025');
        cy.get('h1').should('have.text', 'Garage');
    });

    it('Sign in without email', () => {
        SignInForm.triggerErrorMessageForField('email');
        SignInForm.enterPassword('password1234235');
        /* SignInForm.logInButton.should('be.disabled'); */
        SignInForm.verifyLoginButtonDisabled;
        SignInForm.verifyErrorMessageForFieldIsVisible('email');
    });

    it('Sign in without password', () => {
        SignInForm.triggerErrorMessageForField('password');
        SignInForm.enterEmail('password1234235tanyamyssak+quato1-19@gmail.com');
        SignInForm.verifyLoginButtonDisabled;
        SignInForm.verifyErrorMessageForFieldIsVisible('password');
    });

    it(' Sign in with invalid email', () => {
        SignInForm.enterEmail('tanyamyssak+quato1-19@g');
        SignInForm.enterPassword('Happy2025');
        SignInForm.verifyIncorrectEmailMessageIsVisible();
        SignInForm.verifyLoginButtonDisabled;
    });

    it(' Sign in invalid credentials', () => {
        SignInForm.loginWithCredentials('tanyamyssak+quato185676-19@gmail.com', 'Happy2025555');
        SignInForm.verifyWrongDataMessageIsVisible;
    });
});
describe.skip('Sign in tests without POM', () => {
    it('Successful Sign in', () => {
        cy.get('#signinEmail').type('tanyamyssak+quato1-19@gmail.com');
        cy.get('#signinPassword').type('Happy2025');
        cy.get('app-signin-modal .btn-primary').should('contain', 'Login').click();
        cy.get('h1').should('have.text', 'Garage');
    });

    it('Sign in without email', () => {
        cy.get('#signinEmail').focus().blur();
        cy.get('#signinPassword').type('Happy2025');
        cy.get('app-signin-modal .btn-primary').should('be.disabled');
        cy.contains('Email required').should('be.visible');
    });

    it('Sign in without password', () => {
        cy.get('#signinEmail').type('tanyamyssak+quato1-19@gmail.com');
        cy.get('#signinPassword').focus().blur();
        cy.get('app-signin-modal .btn-primary').should('be.disabled');
        cy.contains('Password required').should('be.visible');
    });

    it(' Sign in with invalid email', () => {
        cy.get('#signinEmail').type('tanyamyssak+quato1-19@g');
        cy.get('#signinPassword').type('Happy2025');
        cy.get('app-signin-modal .btn-primary').should('be.disabled');
        cy.contains('Email is incorrect').should('be.visible');
    });

    it(' Sign in invalid credentials', () => {
        cy.get('#signinEmail').type('tanyamyssak+quato1-19zzz@gmail.com');
        cy.get('#signinPassword').type('Happy2025zzz');
        cy.get('app-signin-modal .btn-primary').should('contain', 'Login').click();
        cy.contains('Wrong email or password').should('be.visible');
    });
});