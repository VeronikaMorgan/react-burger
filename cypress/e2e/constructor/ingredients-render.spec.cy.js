
describe('get ingredients test', function () {
  before(function() {
    cy.visit('/')
    cy.intercept('GET', 'api/ingredients', {fixture: "ingredients"})
    cy.fixture('ingredient').then(function (ingredientData) {
    this.ingredientData = ingredientData
    })
  })
  it('should render ingredients correctly', function () {
    cy.getByTestId('ingredient-container').first().as('firstIngr')
    cy.get('@firstIngr').find('img').should('have.attr', 'src', this.ingredientData.image)
    cy.get('@firstIngr').find('p').first().contains(this.ingredientData.price)
    cy.get('@firstIngr').find('p').last().contains(this.ingredientData.name)
  })
})