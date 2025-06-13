import HomePage from "../Page_objects/Pages/HomePage";
import SignInForm from "../Page_objects/Forms/SignInForm";

describe('API Tests for qauto.forstudy.space', () => {
  const baseUrl = 'https://qauto.forstudy.space/api';

  let userId;
  let carId;
  let expenseId;

  beforeEach(() => {
    HomePage.visit('/');
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.contains('Garage').should('be.visible'); 
  });

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    return { 'Content-Type': 'application/json' };
  };

  // Test 1: GET - Retrieve user profile
  it('Test 1: GET - Should retrieve user profile successfully', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/profile`,
      headers: getAuthHeaders()
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('status', 'ok');
      expect(response.body.data).to.have.property('userId');
      expect(response.body.data).to.have.property('name');
      expect(response.body.data).to.have.property('lastName');
      cy.log('User profile retrieved successfully');
    });
  });

  // Test 2: POST - Create a new car
  it('Test 2: POST - Should create a new car successfully', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/cars`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        carBrandId: 1, // Audi
        carModelId: 1, // TT
        mileage: 15000
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('status', 'ok');
      expect(response.body.data).to.have.property('id');
      expect(response.body.data).to.have.property('carBrandId', 1);
      expect(response.body.data).to.have.property('carModelId', 1);
      expect(response.body.data).to.have.property('mileage', 15000);
      
      carId = response.body.data.id;
      cy.log(`Car created with ID: ${carId}`);
    });
  });

  // Test 3: GET cars list
  it('Test 3: GET - Should retrieve cars list successfully', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/cars`,
      headers: getAuthHeaders()
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('status', 'ok');
      expect(response.body.data).to.be.an('array');
      
      if (response.body.data.length > 0) {
        expect(response.body.data[0]).to.have.property('id');
        expect(response.body.data[0]).to.have.property('carBrandId');
        expect(response.body.data[0]).to.have.property('carModelId');
      }
      cy.log(`Retrieved ${response.body.data.length} cars`);
    });
  });

  // Test 4: POST - Create fuel expense
  it('Test 4: POST - Should create fuel expense successfully', () => {
    // First ensure we have a car to add expense to
    cy.request({
      method: 'GET',
      url: `${baseUrl}/cars`,
      headers: getAuthHeaders()
    }).then((carsResponse) => {
      const testCarId = carsResponse.body.data.length > 0 ? carsResponse.body.data[0].id : carId;
      
      cy.request({
        method: 'POST',
        url: `${baseUrl}/expenses`,
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: {
          carId: testCarId,
          reportedAt: new Date().toISOString(),
          mileage: 16000,
          liters: 50,
          totalCost: 1500
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('status', 'ok');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('carId', testCarId);
        expect(response.body.data).to.have.property('mileage', 16000);
        expect(response.body.data).to.have.property('liters', 50);
        expect(response.body.data).to.have.property('totalCost', 1500);
        
        expenseId = response.body.data.id;
        cy.log(`Fuel expense created with ID: ${expenseId}`);
      });
    });
  });

  // Test 5: PUT - Update car information
  it('Test 5: PUT - Should update car information successfully', () => {
    // Update existing car 
    cy.request({
      method: 'GET',
      url: `${baseUrl}/cars`,
      headers: getAuthHeaders()
    }).then((carsResponse) => {
      if (carsResponse.body.data.length > 0) {
        const testCarId = carsResponse.body.data[0].id;
        
        cy.request({
          method: 'PUT',
          url: `${baseUrl}/cars/${testCarId}`,
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json'
          },
          body: {
            mileage: 20000
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('status', 'ok');
          expect(response.body.data).to.have.property('id', testCarId);
          expect(response.body.data).to.have.property('mileage', 20000);
          cy.log(`Car ${testCarId} updated successfully`);
        });
      } else {
        cy.log('No cars available to update');
      }
    });
  });

  // Test 6: DELETE - Delete fuel expense
  it('Test 6: DELETE - Should delete fuel expense successfully', () => {
   
    cy.request({
      method: 'GET',
      url: `${baseUrl}/expenses`,
      headers: getAuthHeaders()
    }).then((expensesResponse) => {
      if (expensesResponse.body.data.length > 0) {
        const testExpenseId = expensesResponse.body.data[0].id;
        
        cy.request({
          method: 'DELETE',
          url: `${baseUrl}/expenses/${testExpenseId}`,
          headers: getAuthHeaders()
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('status', 'ok');
          cy.log(`Expense ${testExpenseId} deleted successfully`);
          
          // Verify deletion by trying to get the deleted expense
          cy.request({
            method: 'GET',
            url: `${baseUrl}/expenses/${testExpenseId}`,
            headers: {
        'Content-Type': 'application/json'
      },
            failOnStatusCode: false
          }).then((getResponse) => {
            expect(getResponse.status).to.eq(404);
            cy.log('Confirmed expense was deleted');
          });
        });
      } else {
        cy.log('No expenses available to delete');
      }
    });
  });

  // Test 7: GET car brands 
  it('Test 7: GET - Should retrieve car brands successfully', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/cars/brands`,
      headers: getAuthHeaders()
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('status', 'ok');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);
      
         cy.log(`Retrieved ${response.body.data.length} car brands`);
    });
  });

  after(() => {
    // Delete created test data
    cy.request({
      method: 'GET',
      url: `${baseUrl}/cars`,
      headers: getAuthHeaders(),
      failOnStatusCode: false
    }).then((carsResponse) => {
      if (carsResponse.status === 200 && carsResponse.body.data.length > 0) {
        carsResponse.body.data.forEach(car => {
          cy.request({
            method: 'DELETE',
            url: `${baseUrl}/cars/${car.id}`,
            headers: getAuthHeaders(),
            failOnStatusCode: false
          });
        });
      }
    });
  });
});