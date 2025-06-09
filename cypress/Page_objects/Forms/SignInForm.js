class SignInForm {
    get emailField() {
        return cy.get('#signinEmail')
    }
    get passwordField() {
        return cy.get('#signinPassword')
    }
    get logInButton() {
        return cy.get('app-signin-modal .btn-primary')
    }
    get wrongDataMessage() {
        return cy.contains('Wrong email or password')
    }
    get incorrectEmailMessage() {
        return cy.contains('Email is incorrect')
    }
    get emptyPasswordMessage() {
        return cy.contains('Password required')
    }
    get emptyEmailMessage() {
        return cy.contains('Email required')
    }
    /* METHODS */
    enterEmail(email) {
        this.emailField.type(email)
    }

    enterPassword(password) {
        this.passwordField.type(password)
    }

    clickLogInButton() {
        this.logInButton.click()
    }
    loginWithCredentials(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLogInButton();
    }
    triggerErrorMessageForField(fieldName) {
        const element = fieldName === 'email' ? this.emailField : this.passwordField;
        element.focus();
        element.blur();
    }
    verifyLoginButtonDisabled() {
        this.logInButton.should('be.disabled')
    }
    verifyErrorMessageForFieldIsVisible(fieldName) {
        const element = fieldName === 'email' ? this.emailField : this.passwordField;
        element.should('be.visible')
    }
    verifyIncorrectEmailMessageIsVisible (){
        this.incorrectEmailMessage.should('be.visible')
    }
    verifyWrongDataMessageIsVisible(){
        this.wrongDataMessage.should('be.visible')
    }



}
export default new SignInForm();
