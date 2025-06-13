// INSTALLATION:
// npm install --save-dev cypress-plugin-api

import HomePage from "../Page_objects/Pages/HomePage";
import SignInForm from "../Page_objects/Forms/SignInForm";

describe('API Tests using cypress-plugin-api', () => {
  const baseUrl = 'https://qauto.forstudy.space/api';

  beforeEach(() => {
    HomePage.visit('/');
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.contains('Garage').should('be.visible');
  });

  // Test 1: Simple GET request using plugin
  it('Test 1: GET - Get user profile using plugin method', () => {
    cy.api({
      method: 'GET',
      url: `${baseUrl}/users/profile`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
      expect(response.body.data).to.have.property('name');
      cy.log('User profile  using plugin');
    });
  });

  // Test 2: Simple POST request using plugin
  it('Test 2: POST - Create car using plugin method', () => {
    cy.api({
      method: 'POST',
      url: `${baseUrl}/cars`,
      body: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 10000
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.status).to.eq('ok');
      expect(response.body.data).to.have.property('id');
      cy.log(' Car created using plugin');
    });
  });

  // Test 3: Simple GET list using plugin
  it('Test 3: GET - Get cars list using plugin method', () => {
    cy.api({
      method: 'GET',
      url: `${baseUrl}/cars`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
      expect(response.body.data).to.be.an('array');
      cy.log(` Retrieved ${response.body.data.length} cars using plugin`);
    });
  });
});