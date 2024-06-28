import { faker } from '@faker-js/faker'

describe('Testa criação de issue via API', () => {
  beforeEach(() =>
    cy.api_deleteProjects()
  )

  it('Successfully', () => {
    const issue = {
      title: `issue-${faker.datatype.uuid()}`,
      description: faker.random.words(3),
      project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
      }
    }

    cy.api_createIssue(issue)
      .then(resp => {
        expect(resp.status).to.equal(201),
        expect(resp.body.title).to.equal(issue.title),
        expect(resp.body.description).to.equal(issue.description)
      })
  })
})