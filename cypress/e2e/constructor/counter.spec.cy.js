describe('ingredient counter', function() {
  before(function() {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', {fixture: "ingredients"})
    cy.getByTestId('ingredient-container').last().as('ingredient')
    cy.getByTestId('constructor').as('constructor')
  })
  it('should change counter when el is added or deleted', function() {
    cy.get('@ingredient').trigger("dragstart").trigger("dragleave")
    cy.get('@constructor').trigger("drop")
    cy.get('@ingredient').find('.counter').as('counter')
    cy.get('@counter').should('have.text', '1')
    
    cy.get('@ingredient').trigger("dragstart").trigger("dragleave")
    cy.get('@constructor').trigger("drop")
    cy.get('@counter').should('have.text', '2')

    cy.get('.constructor-element__action').first().click()
    cy.get('@counter').should('have.text', '1')

    cy.get('.constructor-element__action').click()
    cy.get('@counter').should('not.exist')
    cy.contains('Оформить заказ').should('not.exist')
  })
})