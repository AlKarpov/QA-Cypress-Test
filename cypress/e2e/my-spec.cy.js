import {generateUser} from '../support/userOperations'

describe('Test Contact App', () => {

  beforeEach(() => {
    cy.visit('./contact_app.html')
  })

  it('Test if the application loads correctly', () => {
    cy.get('h1.text-center').should('have.text', 'Contact List App');
    cy.get('table tbody tr').should('have.length', 1)
  })

  it('First user add', () => {
    cy.addUser(generateUser())
    .get('tr').should('have.lengthOf',2)
  })

  it('Add several users', () => {
    cy.addUser(generateUser())
      .addUser(generateUser())
    .get('tr').should('have.lengthOf',3)
  })

  it('Delete last one user', () => {
    cy.addUser(generateUser())
      .deleteUser(0)
      .get('tr').should('have.lengthOf',1)
  })

  it('Delete one of users', () => {
    cy.addUser(generateUser())
      .addUser(generateUser())
      .addUser(generateUser())
      .deleteUser(1)
      .get('tr').should('have.lengthOf',3)
  })

  it('Update users phone/email', () => {
    const user = generateUser()
    user.name = '';
    cy.addUser(generateUser())
      .addUser(generateUser())
      .editUser(1,user)
  })

  //Hope, this test was written for a feature, not for a bug. In other case...emm...sigh
  it('Update users name/phone/email', () => {
    cy.addUser(generateUser())
      .addUser(generateUser())
      .editUser(1,generateUser())
  })

  it('Mobile viewport:First user add', () => {
    cy.viewport('iphone-x')
    cy.addUser(generateUser())
      .get('tr').should('have.lengthOf',2)
  })
  it('Mobile viewport:Delete last one user', () => {
    cy.viewport('iphone-x')
    cy.addUser(generateUser())
      .deleteUser(0)
      .get('tr').should('have.lengthOf',1)
  })
  it('Update users phone/email', () => {
    cy.viewport('iphone-x')
    const user = generateUser()
    user.name = '';
    cy.addUser(generateUser())
      .addUser(generateUser())
      .editUser(1,user)
  })
});
