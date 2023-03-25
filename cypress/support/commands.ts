/// <reference types="cypress" />

// Cypress.Commands.add('write', (identifier, data) => {
//   cy.get(identifier).type(data)
// })
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
 Cypress.Commands.add('getByTestId', (selector) => {
    return cy.get(`[data-testid="${selector}"]`)
 })

declare namespace Cypress {
    interface Chainable {
      getByTestId(identifier: string, data: string): Chainable<any>
    }
  }