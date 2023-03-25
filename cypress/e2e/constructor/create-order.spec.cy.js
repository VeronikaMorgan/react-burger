describe('create a new order', function() {
  before(() => {
    cy.visit('/')
    cy.intercept('GET', 'api/ingredients', {fixture: "ingredients"})
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" })
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    cy.setCookie('access', 'test-accessToken')
    cy.setCookie('refresh', 'test-refreshToken')

    cy.getByTestId('ingredient-container').last().as('main')
    cy.getByTestId('ingredient-container').first().as('bun')
    cy.getByTestId('constructor').as('constructor')

    cy.get('@bun').trigger("dragstart").trigger("dragleave")
    cy.get('@constructor').trigger("drop")
    cy.get('@main').trigger("dragstart").trigger("dragleave")
    cy.get('@constructor').trigger("drop")
  })

  it('should handle order modal', function() {
    cy.get('button').contains('Оформить заказ').click()

    cy.getByTestId('modal').should('exist')
    cy.getByTestId('order-number').should('have.text', '505')

    cy.getByTestId('modal-close-btn').click()
    cy.contains('Оформить заказ').should('not.exist')
  })
})