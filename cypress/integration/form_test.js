describe("test our form inputs", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/")

    })

    it("add texts to inputs and submit forms", () => {
        cy.get('[data-cy=name]').type("cameron").should("have.value", "cameron")
        cy.get('[data-cy=email]').type("kidleo0727@gmail.com").should("have.value", "kidleo0727@gmail.com")
        cy.get('[data-cy=password]').type("stagbettle").should("have.value", "stagbettle")
        cy.get('[type=checkbox]').check().should("be.checked")
        cy.get('[data-cy=submit]').click()
        
        })



})