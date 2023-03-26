describe('ingredient modal', function() {
  beforeEach(function() {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', {fixture: "ingredients"})
    cy.fixture('ingredient').then(function (ingredientData) {
      this.ingredientData = ingredientData
    })
    cy.getByTestId('ingredient-container').first().as('ingredient')
    cy.get('@ingredient').click()
    cy.getByTestId('modal').as('modal')
    cy.get('@modal').should('exist')
  })
  it('should have the right ingredient data', function() {
    cy.url().should('include', `/ingredients/${this.ingredientData._id}`)
    cy.get('@modal').find('img').should('have.attr', 'src', this.ingredientData.image_large)
    cy.get('@modal').find('h3').contains(this.ingredientData.name)
    cy.getByTestId('ingredient__protein').contains(this.ingredientData.proteins)
    cy.getByTestId('ingredient__fat').contains(this.ingredientData.fat)
    cy.getByTestId('ingredient__carb').contains(this.ingredientData.carbohydrates)
    cy.getByTestId('ingredient__cal').contains(this.ingredientData.calories)
  })
  context('close modal', function() {
    this.afterEach(() => {
      cy.url().should('eq', 'http://localhost:3000/#/')
      cy.get('@modal').should('not.exist')
    })
    it('should close the modal on close btn', function() {
      cy.url().should('include', `/ingredients/${this.ingredientData._id}`)
      cy.getByTestId('modal-close-btn').click()
    })
    it('should close on overlay', function() {
      cy.url().should('include', `/ingredients/${this.ingredientData._id}`)
      cy.getByTestId('modal__overlay').click('topLeft')
    })
    it('should close on esc button', function() {
      cy.url().should('include', `/ingredients/${this.ingredientData._id}`)
      cy.get('body').type('{esc}')
    })
  })
})