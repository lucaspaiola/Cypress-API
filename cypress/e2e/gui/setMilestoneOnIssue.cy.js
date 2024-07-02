import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Testando funcionalidade de setar um milestone a uma issue', () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    }
  }

  const milestone = {
    title: `milestone-${faker.random.word()}`
  }

  // cria a milestone via API antes dos cenarios de teste
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(issue)
      .then(resp => {
        cy.api_createIssue(resp.body.project_id, milestone)
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
      })
  })

  it('successfully', () => {
    cy.gui_setMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})