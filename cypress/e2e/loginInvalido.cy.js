describe("Login inválido", () => {

    it("muestra error con credenciales incorrectas", () => {

        cy.visit("/login");

        cy.get('[data-cy="login-email"]').find("input").type("fake@test.com");

        cy.get('[data-cy="login-password"]').find("input").type("123456");

        cy.get('[data-cy="login-submit"]').click();

        cy.url('include','login');


    })

})