import GaragePage from "../Page_objects/Pages/GaragePage";
import HomePage from "../Page_objects/Pages/HomePage";
import SignInForm from "../Page_objects/Forms/SignInForm";

describe('Adding new cars', () => {
    beforeEach(() => {
        HomePage.visit('/');
        HomePage.openSignInForm();
        SignInForm.loginWithCredentials(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
        GaragePage.pageHeader.should('be.visible');
    })



    it('Add [Audi] [TT] car', () => {
        GaragePage.addNewCar('Audi', 'TT', '723');
        GaragePage.verifyLastAddedCar('Audi TT');

    });
    it('Add [Audi] [R8] car', () => {
        GaragePage.addNewCar('Audi', 'R8', '823');
        GaragePage.verifyLastAddedCar('Audi R8');

    });
    it('Add [Audi] [Q7] car', () => {
        GaragePage.addNewCar('Audi', 'Q7', '985');
        GaragePage.verifyLastAddedCar('Audi Q7'); /* 504 Gateway Timeout */

    });
    it('Add [Audi] [A6] car', () => {
        GaragePage.addNewCar('Audi', 'A6', '1923');
        GaragePage.verifyLastAddedCar('Audi A6'); /* Data truncated for column 'userId' at row 1 */

    });

    it('Add [Audi] [A8] car', () => {
        GaragePage.addNewCar('Audi', 'A8', '123');
        GaragePage.verifyLastAddedCar('Audi A8');

    });


    it('Add [Audi] [TT] car', () => {
        GaragePage.addNewCar('Audi', 'TT', '723');
        GaragePage.verifyLastAddedCar('Audi TT');

    });
    it('Add [BMW] [3] car', () => {
        GaragePage.addNewCar('BMW', '3', '3845');
        GaragePage.verifyLastAddedCar('BMW 3');

    });
    it('Add [BMW] [5] car', () => {
        GaragePage.addNewCar('BMW', '5', '5345');
        GaragePage.verifyLastAddedCar('BMW 5');
    });

    it('Add [BMW] [X5] car', () => {
        GaragePage.addNewCar('BMW', 'X5', '345');
        GaragePage.verifyLastAddedCar('BMW X5');

    });
    it('Add [BMW] [X6] car', () => {
        GaragePage.addNewCar('BMW', 'X6', '6345');
        GaragePage.verifyLastAddedCar('BMW X6');
    });


    it('Add [BMW] [Z3] car', () => {
        GaragePage.addNewCar('BMW', 'Z3', '8345');
        GaragePage.verifyLastAddedCar('BMW Z3');
    });

    it('Add [Ford] [Fiesta] car', () => {
        GaragePage.addNewCar('Ford', 'Fiesta', '1567');
        GaragePage.verifyLastAddedCar('Ford Fiesta');

    });
    it('Add [Ford] [Focus] car', () => {
        GaragePage.addNewCar('Ford', 'Focus', '4567');
        GaragePage.verifyLastAddedCar('Ford Focus');

    });
    it('Add [Ford] [Fusion] car', () => {
        GaragePage.addNewCar('Ford', 'Fusion', '13567');
        GaragePage.verifyLastAddedCar('Ford Fusion');
    });
    it('Add [Ford] [Mondeo] car', () => {
        GaragePage.addNewCar('Ford', 'Mondeo', '13567');
        GaragePage.verifyLastAddedCar('Ford Mondeo');
    });
    it('Add [Ford] [Sierra] car', () => {
        GaragePage.addNewCar('Ford', 'Sierra', '63567');
        GaragePage.verifyLastAddedCar('Ford Sierra');
    });

    it('Add [Porsche] [911] car', () => {
        GaragePage.addNewCar('Porsche', '911', '789');
        GaragePage.verifyLastAddedCar('Porsche 911'); /* adds Ford Focus instead
 */
    });
    it('Add [Porsche] [Cayenne] car', () => {
        GaragePage.addNewCar('Porsche', 'Cayenne', '2789');
        GaragePage.verifyLastAddedCar('Porsche Cayenne');

    });
    it('Add [Porsche] [Panamera] car', () => {
        GaragePage.addNewCar('Porsche', 'Panamera', '5819');
        GaragePage.verifyLastAddedCar('Porsche Panamera');

    });
    it('Add [Fiat] [Polio] car', () => {
        GaragePage.addNewCar('Fiat', 'Palio', '003');
        GaragePage.verifyLastAddedCar('Fiat Palio');

    });
    it('Add [Fiat] [Docato] car', () => {
        GaragePage.addNewCar('Fiat', 'Ducato', '1003');
        GaragePage.verifyLastAddedCar('Fiat Ducato');

    });

    it('Add [Fiat] [Panda] car', () => {
        GaragePage.addNewCar('Fiat', 'Panda', '5207');
        GaragePage.verifyLastAddedCar('Fiat Panda');

    });
    it('Add [Fiat] [Punto] car', () => {
        GaragePage.addNewCar('Fiat', 'Punto', '1703');
        GaragePage.verifyLastAddedCar('Fiat Punto');

    });
    it('Add [Fiat] [Scudo] car', () => {
        GaragePage.addNewCar('Fiat', 'Scudo', '15003');
        GaragePage.verifyLastAddedCar('Fiat Scudo');

    });
});


