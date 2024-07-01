import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Testa funcionalidade de atribuir label a uma issue', options, () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    }
  }

  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }

  // cria a label via API antes dos cenarios de teste
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(issue)
      .then(resp => {
        cy.api_createLabel(resp.body.project_id, label)
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
      })
  })

  it('successfully', () => {
    cy.gui_setLabelOnIssue(label)

    cy.get('.qa-labels-block').should('contain', label.name)
    cy.get('.qa-labels-block span')
      .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
  })
})