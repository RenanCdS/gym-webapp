import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';
import { LoginPage } from '../../../pages/login/login.page';

Given('que eu faço login com o usuário {string}', (email: string) => {
  cy.visit('/login');
  sessionStorage.clear();
  localStorage.clear();
  LoginPage.typeInUserName(email);
  LoginPage.typeInPassword('123');
  LoginPage.clickEnter();
});

Given('que eu clico no botão Entrar', () => {
  cy.visit('/login');
  sessionStorage.clear();
  localStorage.clear();
  LoginPage.clickEnter();
});

Then('devo ver o toast informando {string}', (message) => {
  LoginPage.getSnackBar().should('contain', message);
});

Then('devo ver a página home', () => {
  cy.location('pathname').should('contain', 'home');
});

Then('devo ver a mensagem {string} no campo de e-mail', (errorMessage: string) => {
  LoginPage.getUserNameError().should('contain', errorMessage);
});
