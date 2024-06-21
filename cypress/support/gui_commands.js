Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  // funcao que realiza o login via GUI
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  // analisa se tem uma sessao valida
  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 5000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true, // compartilha a sessao entre as specs
    validate
  }

  if (cacheSession) {
    // se ja tem uma sessao criada, apenas restora. Se nao, cria via GUI pela chamada de login
    cy.session(user, login, options) 
  } else {
    login() // chama a funcao para o realizar via GUI o login, necessario para o teste do proprio login
  }
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
  