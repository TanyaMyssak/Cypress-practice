import HomePage from "../Page_objects/Pages/HomePage";
import SignInForm from "../Page_objects/Forms/SignInForm";

describe('Profile Name Intercepting Test', () => {
  const baseUrl = 'https://qauto.forstudy.space/api';

  beforeEach(() => {
    // Intercept the profile API call and modify the response
    cy.intercept('GET', `${baseUrl}/users/profile`, (req) => {
     
      req.continue((res) => {
        // Modify the response to show  "Polar" name and  "Bear" lastName
        if (res.body && res.body.data) {
          res.body.data.name = 'Polar';
          res.body.data.lastName = 'Bear';
        }
        res.send(res.body);
      });
    }).as('getProfile');

    // Visit homepage and login
    HomePage.visit('/');
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.contains('Garage').should('be.visible');
  });

  it('Should display "Polar Bear" as name on Profile page through API interception', () => {
    // Navigate to Profile page triggers the intercepted API call
    cy.get('a[routerlink="profile"]').click();

    // Wait for the intercepted API call
    cy.wait('@getProfile').then((interception) => {
    
      expect(interception.response.body.data.name).to.equal('Polar');
      expect(interception.response.body.data.lastName).to.equal('Bear');
       cy.contains('Polar Bear').should('be.visible'); // Verify UI shows the intercepted name
    cy.get('.profile_name').should('contain', 'Polar Bear'); // Verify the specific profile name element shows intercepted name
    cy.get('.profile_name').should('not.contain', 'Tania Myssak');  // Verify the name is NOT the original name
 
       });
    });
 });