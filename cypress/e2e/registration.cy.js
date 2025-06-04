/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://qauto.forstudy.space', {
        auth: {
            username: 'guest',
            password: 'welcome2qauto',
        },
    });

    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('.modal-content').should('be.visible');
});

/* First name */
describe('Signup Modal - Name Field Validation', () => {
    it('Finds Sign up modal title', () => {
        cy.get('.modal-title').should('contain', 'Registration');
    });

    it('Shows "Name required" when field is empty and red frame', () => {
        cy.get('#signupName').focus().blur();
        cy.get('#signupName')
            .parent()
            .find('.invalid-feedback')
            .should('contain', 'Name required');
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    });

    it.skip('Should trim spaces from the name field', () => {
        const trimmedName = 'Tanya';
        const untrimmedName = '   Tanya   ';
        cy.get('#signupName').type(untrimmedName);
        cy.get('#signupName').blur();
        cy.get('#signupName').should('have.value', trimmedName);
    });

    const invalidNames = [
        { value: 'Sasha2', message: 'Name is invalid' },
        { value: 'Александр', message: 'Name is invalid' },
        { value: 'Anna-Maria', message: 'Name is invalid' },
        { value: 'Anna Maria', message: 'Name is invalid' },
        { value: '&%¤"', message: 'Name is invalid' },
    ];

    invalidNames.forEach(({ value, message }) => {
        it(`Shows validation for "${value}" with message: "${message}"`, () => {
            cy.get('#signupName').clear().type(value).blur();
            cy.get('#signupName')
                .siblings('.invalid-feedback')
                .should('contain', message);
            cy.get('#signupName')
                .should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    const invalidNamesLength = [
        { value: 'A', message: 'Name has to be from 2 to 20 characters long' },
        { value: 'AnnaMariaGarciaElenaE', message: 'Name has to be from 2 to 20 characters long' },
    ];

    invalidNamesLength.forEach(({ value, message }) => {
        it(`Shows validation for length issue with "${value}"`, () => {
            cy.get('#signupName').clear().type(value).blur();
            cy.get('#signupName')
                .siblings('.invalid-feedback')
                .should('contain', message);
            cy.get('#signupName')
                .should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    const validNames = [
        'Ed',
        'Ana',
        'AnnaMariaGarciaElena',
        'AnnaMariaGarciaHele',
        'AnnaMarie',

    ];
    validNames.forEach((name) => {
        it(`Should accept valid name: "${name}"`, () => {
            cy.get('#signupName').clear().type(name).blur();
            cy.get('#signupName')
                .siblings('.invalid-feedback')
                .should('not.exist');
            cy.get('#signupName')
                .should('have.css', 'border-color')
                .and('not.eq', 'rgb(220, 53, 69)');
        });
    });

});
/* Last name */
describe('Signup Modal - Last Name Field Validation', () => {
    it('Finds Sign up modal title', () => {
        cy.get('.modal-title').should('contain', 'Registration');
    });

    it('Shows "Last name required" and red border when field is empty', () => {
        cy.get('#signupLastName').focus().blur();
        cy.get('#signupLastName')
            .parent()
            .find('.invalid-feedback')
            .should('contain', 'Last name required');
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    const invalidLastNames = [
        { value: '1Smith', message: 'Last name is invalid' },
        { value: 'Коваленко', message: 'Last name is invalid' },
        { value: '%¤#', message: 'Last name is invalid' },
        { value: '1234', message: 'Last name is invalid' },
        { value: '1', message: 'Last name is invalid' },
    ];

    invalidLastNames.forEach(({ value, message }) => {
        it(`Shows validation for "${value}" with message: ${message} and red border`, () => {
            cy.get('#signupLastName').clear().type(value).blur();
            cy.get('#signupLastName')
                .siblings('.invalid-feedback')
                .should('contain', message);
            cy.get('#signupLastName')
                .should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    const invalidLastNameLength = [
        { value: 'A', message: 'Last name has to be from 2 to 20 characters long' },
        { value: 'ThisIsVeryVeryLooongLastName', message: 'Last name has to be from 2 to 20 characters long' },
    ];

    invalidLastNameLength.forEach(({ value, message }) => {
        it(`Shows validation for "${value}" with message: ${message} and red border`, () => {
            cy.get('#signupLastName').clear().type(value).blur();
            cy.get('#signupLastName')
                .siblings('.invalid-feedback')
                .should('contain', message);
            cy.get('#signupLastName')
                .should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });
    it.skip('Should trim spaces in the Last name field', () => {
        const trimmedLastName = 'Lopez';
        const untrimmedLastName = '   Lopez   ';
        cy.get('#signupLastName').type(untrimmedLastName);
        cy.get('#signupLastName').blur();
        cy.get('#signupLastName').should('have.value', trimmedLastName);
    });
    const validLastNames = [
        'Smith',
        'Bro',
        'TwentyCharactersLast',
        'Nineteenletterslong',
        'Lo',
    ];

    validLastNames.forEach((lastName) => {
        it(`Should accept valid last name: "${lastName}"`, () => {
            cy.get('#signupLastName').clear().type(lastName).blur();
            cy.get('#signupLastName')
                .siblings('.invalid-feedback')
                .should('not.exist');
            cy.get('#signupLastName')
                .should('have.css', 'border-color')
                .and('not.eq', 'rgb(220, 53, 69)');
        });
    });
});

/* Email field validation */
describe('Signup Modal -  email Field Validation', () => {
    it('Finds Sign up modal title', () => {
        cy.get('.modal-title').should('contain', 'Registration');
    });
    it('Shows "Email required" when field is empty and red frame', () => {
        cy.get('#signupEmail').focus().blur();
        cy.get('#signupEmail')
            .parent()
            .find('.invalid-feedback')
            .should('contain', 'Email required');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    });
    it('shows "Email is invalid" for incorrect email formats and red frame', () => {
        const invalidEmails = ['emailaddress', 'test@', 'test@com', '@com.ua']

        invalidEmails.forEach((email) => {
            cy.get('#signupEmail').clear().type(email).blur()
            cy.get('#signupEmail')
                .siblings('.invalid-feedback')
                .should('contain', 'Email is incorrect')
        })
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    })
    const validEmails = [
        'user@example.com',
        'user.name@example.co.uk',
        'user_name+tag@example.io',
        'user-name@example.org',
        'user123@example123.com',
    ];

    validEmails.forEach((email) => {
        it(`Should accept valid email: "${email}"`, () => {
            cy.get('#signupEmail').clear().type(email).blur();
            cy.get('#signupEmail')
                .siblings('.invalid-feedback')
                .should('not.exist');
            cy.get('#signupEmail')
                .should('have.css', 'border-color')
                .and('not.eq', 'rgb(220, 53, 69)');
        });
    });
});
/* Password */
describe('Signup Modal - Password Fields Validation', () => {
    it('Finds Sign up modal title', () => {
        cy.get('.modal-title').should('contain', 'Registration');
    });

    it('shows "Password required" when password is empty and red frame', () => {
        cy.get('#signupPassword').focus().blur();
        cy.get('#signupPassword')
            .siblings('.invalid-feedback')
            .should('contain', 'Password required');

        cy.get('#signupPassword')
            .should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    const invalidPassword = [
        'short1A',
        'abcdefgh',
        'ABCDEFGH',
        '1212345678',
        'abcdefgh1',
        'ABCDEFGH1',
        'Abcdefgh',
        'ThisIsVeryVeryLooongLastPassword123',
    ];

    const errorMessage = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

    invalidPassword.forEach((value) => {
        it(`Shows validation for "${value}" and red frame`, () => {
            cy.get('#signupPassword').clear().type(value).blur();

            cy.get('#signupPassword')
                .siblings('.invalid-feedback')
                .should('contain', errorMessage);

            cy.get('#signupPassword')
                .should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    it('shows "Re-enter password required" when empty and red frame', () => {
        cy.get('#signupRepeatPassword').focus().blur();
        cy.get('#signupRepeatPassword')
            .siblings('.invalid-feedback')
            .should('contain', 'Re-enter password required');
        cy.get('#signupRepeatPassword')
            .should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    const invalidRepeatPassword = [
        'short1A',
        'abcdefgh',
        'ABCDEFGH',
        '1212345678',
        'abcdefgh1',
        'ABCDEFGH1',
        'Abcdefgh',
        'ThisIsVeryVeryLooongLastPassword123',
    ];

    const errorMessage2 = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

    invalidPassword.forEach((value) => {
        it(`Shows validation for repeat Password"${value}" and red frame`, () => {
            cy.get('#signupRepeatPassword').clear().type(value).blur();

            cy.get('#signupRepeatPassword')
                .siblings('.invalid-feedback')
                .should('contain', errorMessage2);

            cy.get('#signupRepeatPassword')
                .should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('shows "Passwords do not match" error and red frame if passwords do not match', () => {
            cy.get('#signupPassword').clear().type('Happy2025');
            cy.get('#signupRepeatPassword').clear().type('Happy2024').blur();
            cy.get('#signupRepeatPassword')
                .siblings('.invalid-feedback')
                .should('contain', 'Passwords do not match');
            cy.get('#signupRepeatPassword')
                .should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });
});
/* Register button */
describe('Signup Modal - Register Button validation', () => {
    const registerBtn = '.modal-footer button.btn.btn-primary';
    const newEmail = `tanyamyssak+qaut${Math.floor(Math.random() * 1000000)}@gmail.com`;

    it('Register button is disabled with empty fields', () => {
        cy.get('#signupName').clear().blur();
        cy.get('#signupLastName').clear().blur();
        cy.get('#signupEmail').clear().blur();
        cy.get('#signupPassword').clear().blur();
        cy.get('#signupRepeatPassword').clear().blur();

        cy.get(registerBtn).should('be.disabled');
    });

    it('Register button is disabled with invalid name', () => {
        cy.get('#signupName').clear().type('1Sasha');
        cy.get('#signupLastName').clear().type('Kovalenko');
        cy.get('#signupEmail').clear().type('tanya@example.com');
        cy.get('#signupPassword').clear().type('Happy2025');
        cy.get('#signupRepeatPassword').clear().type('Happy2025');

        cy.get(registerBtn).should('be.disabled');
    });

    it('Register button is disabled with invalid email', () => {
        cy.get('#signupName').clear().type('Tanya');
        cy.get('#signupLastName').clear().type('Kovalenko');
        cy.get('#signupEmail').clear().type('tanya@wrong');
        cy.get('#signupPassword').clear().type('Happy2025');
        cy.get('#signupRepeatPassword').clear().type('Happy2025');

        cy.get(registerBtn).should('be.disabled');
    });

    it('Register button is disabled with invalid password', () => {
        cy.get('#signupName').clear().type('Tanya');
        cy.get('#signupLastName').clear().type('Kovalenko');
        cy.get('#signupEmail').clear().type('tanya@example.com');
        cy.get('#signupPassword').clear().type('abc');
        cy.get('#signupRepeatPassword').clear().type('abc');

        cy.get(registerBtn).should('be.disabled');
    });

    it('Register button is disabled with mismatched passwords', () => {
        cy.get('#signupName').clear().type('Tanya');
        cy.get('#signupLastName').clear().type('Kovalenko');
        cy.get('#signupEmail').clear().type('tanya@example.com');
        cy.get('#signupPassword').clear().type('Happy2025');
        cy.get('#signupRepeatPassword').clear().type('Wrong2025'); // mismatch

        cy.get(registerBtn).should('be.disabled');
    });

    it('Register button is enabled only with all valid fields', () => {
        const newEmail = `tanyamyssak+qaut${Math.floor(Math.random() * 1000000)}@gmail.com`;
        cy.log(newEmail);

        cy.get('#signupName').clear().type('Tanya');
        cy.get('#signupLastName').clear().type('Mysak');
        cy.get('#signupEmail').clear().type(newEmail);
        cy.get('#signupPassword').clear().type('Happy2025');
        cy.get('#signupRepeatPassword').clear().type('Happy2025');

        cy.get(registerBtn)
            .should('not.be.disabled')
            .click();
        cy.contains('Garage').should('be.visible');
    });
});
