
import HomePage from "../Page_objects/Pages/HomePage";
import SignInForm from "../Page_objects/Forms/SignInForm";
import GaragePage from "../Page_objects/Pages/GaragePage";
import ExpensesPage from "../Page_objects/Pages/FuelExpensesPage";

const garageCar = {
  brand: 'Audi',
  model: 'TT',
  mileage: '723'
};

const testExpense = {
  date: '2025-06-09',
  mileage: 1240,
  liters: 100,
  cost: 1200
};

const fullName = `${garageCar.brand} ${garageCar.model}`;

describe('Should add Fuel Expenses for the added car', () => {
    beforeEach(() => {
        HomePage.visit();
        HomePage.openSignInForm();
        SignInForm.loginWithCredentials(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
        GaragePage.pageHeader.should('be.visible');
    })


     it('Add [Audi] [TT] car', () => {
            GaragePage.addNewCar('Audi', 'TT', '723');
            GaragePage.verifyLastAddedCar('Audi TT');
    
        });
    // Check if the car exists, if not add it
    it. cy.get('body').then($body => {
      if (!$body.text().includes(fullName)) {
        GaragePage.addNewCar(garageCar.brand, garageCar.model, garageCar.mileage);
        GaragePage.verifyLastAddedCar(fullName);
      }
    });

    // Visit expenses page and verify it's loaded
    ExpensesPage.visit();
    ExpensesPage.verifyExpensesPageLoaded();
  });

  it('should add fuel expense for a car', () => {
    const vehicleName = fullName;

    ExpensesPage.getExpensesCount().then(initialCount => {
      ExpensesPage.addFuelExpense(
        vehicleName,
        testExpense.date,
        testExpense.mileage,
        testExpense.liters,
        testExpense.cost
      );

      ExpensesPage.verifyExpenseExists(testExpense.cost);

      ExpensesPage.getExpensesCount().then(newCount => {
        expect(newCount).to.be.greaterThan(initialCount);
      });

      ExpensesPage.verifyModalClosed();
    });
  });
