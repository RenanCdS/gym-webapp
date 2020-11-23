import { should } from 'chai';
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { AthleteRegisterPage } from '../../../../pages/athlete/athlete-register/athlete-register.page';

When('preencho os campos com os seguintes dados:', (table) => {
  const data = table.rawTable[1];
  AthleteRegisterPage.fillForm(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
});

When('clico no botão próximo', () => {
  AthleteRegisterPage.clickPersonalDataNext();
});

Then('devo ver o step de {string}', (stepTitle: string) => {
  AthleteRegisterPage.getStepLabel(stepTitle).should('be.visible');
});

Then('devo ver feedbacks de {string}', (feedback: string) => {
  AthleteRegisterPage.getErrorFeedback(feedback).should('be.visible');
});
