describe('Login E2E', () => {

    it('Probar inicio sesión con usuario válido', () => {

        cy.visit('/login');
        cy.get('[data-cy="login-email"]').find('input').type('alan.brito@gmail.com');
        cy.get('[data-cy="login-password"]').find('input').type('asdfasdf');
        cy.get('[data-cy="login-submit"]').click();
        cy.url().should('not.include','login');

    })
})