describe('Rutas protegidas', () => {
    it('Probar que se redirige al login si no hay sesión abierta', () => {
        cy.visit('/usuarios');
        cy.url().should('include','login');
    })
})