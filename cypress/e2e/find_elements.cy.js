/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://qauto.forstudy.space', {
        auth: {
            username: 'guest',
            password: 'welcome2qauto',
        },
    })
})

describe('Navigation menu elements', () => {
    it('should find Home link', () => {
        cy.get('nav').contains('Home').should('have.attr', 'href', '/')
    })

    it('should find About button', () => {
        cy.get('nav').contains('About').should('have.attr', 'appscrollto', 'aboutSection')
    })

    it('should find Contacts button', () => {
        cy.get('nav').contains('Contacts').should('have.attr', 'appscrollto', 'contactsSection')
    })
})

describe('Social media links', () => {
    it('should find 5 links', () => {
        cy.get('.contacts_socials a').should('have.length', 5)

        cy.get('.contacts_socials a[href="https://www.facebook.com/Hillel.IT.School"]').should("exist")
        cy.get('.contacts_socials a[href="https://t.me/ithillel_kyiv"]').should("exist")
        cy.get('.contacts_socials a[href*="youtube.com/user/HillelITSchool"]').should("exist")
        cy.get('.contacts_socials a[href="https://www.instagram.com/hillel_itschool/"]').should("exist")
        cy.get('.contacts_socials a[href="https://www.linkedin.com/school/ithillel/"]').should("exist")
    })

    it('should open social links in a new tab', () => {
        cy.get('.contacts_socials a').each(($el) => {
            cy.wrap($el).should('have.attr', 'target', '_blank')
        })
    })
})

describe('Find video', () => {
    it('should find the YouTube iframe', () => {
        cy.get('iframe[src*="youtube.com/embed"]').should('exist')
    })
})
describe('Login buttons', () => {
    it('should find Guest log in button', () => {
        cy.get('button.header-link.-guest')
            .should('exist')
            .and('contain', 'Guest log in')
    })

    it('should find Sign In button', () => {
        cy.get('button.btn.btn-outline-white.header_signin')
            .should('exist')
            .and('contain', 'Sign In')
    })
})
describe('Contact links', () => {
    it('should find the site link', () => {
        cy.get('a.contacts_link.display-4')
            .should('have.attr', 'href', 'https://ithillel.ua')
            .and('contain', 'ithillel.ua')
    })

    it('should find the email link', () => {
        cy.get('a.contacts_link.h4')
            .should('have.attr', 'href', 'mailto:developer@ithillel.ua')
            .and('contain', 'support@ithillel.ua')
    })
})
