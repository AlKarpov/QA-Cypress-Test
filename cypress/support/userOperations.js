import { faker } from '@faker-js/faker';

const nameInput = '.form-control[placeholder="Name"]';
const phoneInput = '.form-control[placeholder="Phone"]';
const emailInput = '.form-control[placeholder="Email"]';
const addButton = '.btn-primary';
const deleteButton = 'button[name=delete]';
const editButton = 'button[name=edit]';
const updateButton = 'button[name=update]';

export function generateUser() {
    return {
        name:faker.internet.userName(),
        phone:faker.phone.number('403#######'),
        email:faker.internet.email(),
        }   
};

export function addUser(user) {
    cy.get(nameInput).type(user.name)
    .get(phoneInput).type(user.phone)
    .get(emailInput).type(user.email)
    .get(addButton).click()
    .get('tr td:nth-child(1)').last().should('have.text', user.name)
    .get('tr td:nth-child(2)').last().should('have.text', user.phone)
    .get('tr td:nth-child(3)').last().should('have.text', user.email)
};
export function deleteUser(index) {
    cy.get(`tr`).eq(index+1).invoke('text').then((text)=>{
        const rowToDelete = text;
        cy.get('tr td').then(($el)=> {
          if($el.length>=index) {
            cy.get(`tr td ${deleteButton}`).eq(index).should('be.visible').click()
              .get('tr').each(($el)=> {
                cy.wrap($el).should('not.equal',rowToDelete)
            })
      
          } else {cy.log(`Element with index ${index} doesn't exists`)}
        })
    })
  };
  export function editUser(index,user) {
    cy.get('tr td').then(($el)=> {
        if($el.length>=index) {
            cy.get(`tr td ${editButton}`).eq(index).click()
              .get(`tr td ${updateButton}`).as('updateButton').should('exist').and('be.visible')
              user.name? cy.get(`tr td input[type=text]`).eq(0).clear().type(user.name) : ''
              user.phone? cy.get(`tr td input[type=text]`).eq(1).clear().type(user.phone)  : ''
              user.email? cy.get(`tr td input[type=text]`).eq(2).clear().type(user.email)   : ''
              cy.get(updateButton).click()
              user.name ? cy.get('tr td:nth-child(1)').eq(index).should('have.text', user.name)
                            .get('tr td:nth-child(2)').eq(index).should('be.empty')
                            .get('tr td:nth-child(3)').eq(index).should('be.empty') : 
                          cy.get('tr td:nth-child(2)').eq(index).should('have.text', user.phone)
                            .get('tr td:nth-child(3)').eq(index).should('have.text', user.email)
        } else {cy.log(`Element with index ${index} doesn't exists`)}
    })
  };
  