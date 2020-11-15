import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';

When('deve ver a página home', () => {
  cy.visit('/');
});
