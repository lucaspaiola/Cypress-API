Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
  ) => {
    const login = () => {
      cy.visit('/users/sign_in')

      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false }) // password nao vaze no log de comandos
      cy.get("[data-qa-selector='sign_in_button']").click()
    }

    login()
  })

Cypress.Commands.add('logout', () => {
  const logout = () => {
    cy.get('.qa-user-avatar').click()
    cy.get("[data-qa-selector='sign_out_link']").click()
  }

  logout()
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})
  