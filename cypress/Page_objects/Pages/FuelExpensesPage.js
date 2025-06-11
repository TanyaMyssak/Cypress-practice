// cypress/pages/FuelExpensePage.js

class FuelExpensesPage {
  get addExpenseButton() {
    return cy.get('button.btn.btn-primary').contains('Add an expense');
  }

  get expenseModal() {
    return cy.get('app-add-expense-modal');
  }

  get vehicleDropdown() {
    return cy.get('#addExpenseCar');
  }

  get reportDateField() {
    return cy.get('#addExpenseDate');
  }

  get mileageField() {
    return cy.get('#addExpenseMileage');
  }

  get litersField() {
    return cy.get('#addExpenseLiters');
  }

  get totalCostField() {
    return cy.get('#addExpenseTotalCost');
  }

  get submitButton() {
    return cy.get('.modal-footer .btn-primary');
  }

  get cancelButton() {
    return cy.get('.modal-footer .btn-secondary');
  }

  openModal() {
    this.addExpenseButton.click();
    this.expenseModal.should('be.visible');
  }

  selectVehicle(vehicleName) {
    this.vehicleDropdown.select(vehicleName);
  }

  enterReportDate(dateStr) {
    this.reportDateField.clear().type(dateStr);
  }

  enterMileage(mileage) {
    this.mileageField.clear().type(mileage);
  }

  enterLiters(liters) {
    this.litersField.clear().type(liters);
  }

  enterTotalCost(cost) {
    this.totalCostField.clear().type(cost);
  }

  submit() {
    this.submitButton.should('not.be.disabled').click();
  }

  cancel() {
    this.cancelButton.click();
  }

  addExpense(vehicle, date, mileage, liters, cost) {
    this.openModal();
    this.selectVehicle(vehicle);
    this.enterReportDate(date);
    this.enterMileage(mileage);
    this.enterLiters(liters);
    this.enterTotalCost(cost);
    this.submit();
  }
}

export default new FuelExpensesPage();