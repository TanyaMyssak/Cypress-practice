/// <reference types="cypress" />
import HomePage from "../Page_objects/Pages/HomePage";
import SignInForm from "../Page_objects/Forms/SignInForm";
import GaragePage from "../Page_objects/Pages/GaragePage";
import FuelExpensesPage from "../Page_objects/Pages/FuelExpensesPage";

describe('Add Expense Modal', () => {
  const addExpense = FuelExpensesPage;

 beforeEach(() => {
  HomePage.visit();
  HomePage.openSignInForm();
  SignInForm.loginWithCredentials(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
  GaragePage.pageHeader.should('be.visible');
/* Go to Expenses page */
  cy.visit('/panel/expenses'); 
});

  it('should open the add expense modal, fill form and submit', () => {
    addExpense.addExpense('Audi TT', '11.06.2025', '15000', '40', '70');

    // Verify modal closed
    cy.get('app-add-expense-modal').should('not.exist');
  });
});