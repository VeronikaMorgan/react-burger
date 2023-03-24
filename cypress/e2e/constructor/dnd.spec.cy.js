describe('constructor dnd', () => {
  before(function() {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', {fixture: "ingredients"})
    cy.fixture('ingredient').then(function (ingredientData) {
      this.ingredientData = ingredientData
    })
  })
  it('should drag and drop ingredient to constructor', function() {
    cy.getByTestId('ingredient-container').first().as('ingredient')
    cy.getByTestId('constructor').as('constructor')
    cy.get('@ingredient').trigger("dragstart").trigger("dragleave")
    cy.get('@constructor')
    .trigger("dragenter")
    .trigger("dragover")
    .trigger("drop")
    .trigger("dragend")

    cy.contains('Оформить заказ')
    cy.get('@constructor').find('.constructor-element').as('constructor-el')
    cy.get('@constructor-el').find('.constructor-element__text').should('contain.text', this.ingredientData.name)
    cy.get('@constructor-el').find('.constructor-element__image').should('have.attr', 'src', this.ingredientData.image)
    cy.get('@constructor-el').find('.constructor-element__price').first().should('have.text', this.ingredientData.price)

    cy.get('@ingredient').find('.counter').should('have.text', '2')
  })
})