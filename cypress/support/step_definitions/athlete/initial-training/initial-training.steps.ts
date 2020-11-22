import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { InitialTrainingPage } from '../../../../pages/athlete/initial-training/initial-training.page';

When('clico no treino {string}', (trainingType: string) => {
  InitialTrainingPage.clickTraining(trainingType);
});

Then('devo ser redirecionado para a tela de treino', () => {
  cy.location('pathname').should('contain', '/atleta/treino');
});
