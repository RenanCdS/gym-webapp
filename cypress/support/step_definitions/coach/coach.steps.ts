import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { CoachPage } from '../../../pages/coach/coach.page';

Given('que eu preencho todos os campos do formulário de treinador corretamente', () => {
  CoachPage.typeOnField('name', 'Renan');
  CoachPage.typeOnField('age', '20');
  CoachPage.typeOnField('email', 'renan.santos@outlook.com');
  CoachPage.typeOnField('phone', '123456789');
  CoachPage.typeOnField('address', 'Rua XYZ');
  CoachPage.typeOnField('weight', '89.5');
  CoachPage.typeOnField('height', '1.86');
  CoachPage.typeOnField('password', '123');
});

Given('que clico no botão Cadastrar', () => {
  CoachPage.clickCadaster();
});

Then('devo ver um toast com a mensagem {string}', (message) => {
  CoachPage.getSnackBar().should('contain', message);
});

Then('devo ver a mensagem {string} nos campos não preenchidos', (message) => {
  CoachPage.getInputErrorFeedback().should('contain', message);
});
