describe('Testa a funcionalidade de login', () => {
  it('successfully', () => {
    cy.login()
    cy.get('.qa-user-avatar').should('be.visible')
  })
})