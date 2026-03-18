describe('Registro', () => {

    it("Permitir registro usuario", () => {
        const email = `test${Date.now()}@test.com`;
        cy.visit('/register');
        cy.get('[data-cy="register-email"] input').type(email);
        cy.get('[data-cy="register-password"] input').type(123456);
        cy.get('[data-cy="register-submit"]').click()
    })
})