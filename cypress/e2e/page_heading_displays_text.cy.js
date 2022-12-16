/// <reference types="cypress" />
describe('intentional start page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  //  it('displays default text', () => {
  //    cy.get('header h1').should('have.text', 'Hello World');
  //  });
});
