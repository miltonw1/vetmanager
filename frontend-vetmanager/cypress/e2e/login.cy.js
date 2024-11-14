describe('template spec', () => {
  it('should redirect to clients page', () => {
    cy.visit('/')
    cy.get('[data-cy="user-name-field"]').type('milton.wery@gmail.com');
    cy.get('[data-cy="password-field"]').type('asd123');
    cy.get('[data-cy="login-button"]').click();
    cy.get('[data-cy="page-title"]').contains('Clientes')
  })
})