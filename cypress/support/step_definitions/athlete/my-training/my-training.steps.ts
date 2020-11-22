import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { FinalizedTrainingPage } from '../../../../pages/athlete/my-training/finalized-training.page';
import { MyTrainingPage } from '../../../../pages/athlete/my-training/my-training.page';

When('finalizo todos os exercícios', () => {
  MyTrainingPage.finalizeExercises();
});

When('clico no botão Finalizar treino', () => {
  MyTrainingPage.clickOnFinalizeTrainingButton();
});

When('clico no botão {string} da modal', (buttonName: string) => {
  MyTrainingPage.clickOnModalButton('Sim');
});

When('clico no botão feito', () => {
  MyTrainingPage.clickOnDoneButton();
});

Then('o sistema exibe o próximo exercício', () => {
  MyTrainingPage.getExercisesQuantity().then(quantity => {
    assert.equal(quantity, 1);
  });
});

Then('devo ver a página de treino finalizado com sucesso', () => {
  FinalizedTrainingPage.getMainTitle().should('contain', 'Treino diário finalizado :)');
});

Then('o sistema exibe a modal de treino concluído', () => {
  MyTrainingPage.getFinalizedTrainingModal().should('be.visible');
});
