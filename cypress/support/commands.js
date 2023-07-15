import { addUser,deleteUser,editUser } from './userOperations.js';
Cypress.Commands.add('addUser',addUser);
Cypress.Commands.add('deleteUser',deleteUser);
Cypress.Commands.add('editUser',editUser);
