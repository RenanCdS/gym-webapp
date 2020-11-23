import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { ExerciseTrainingRegisterPage } from '../../../../pages/athlete/athlete-register/exercise-training-register.page';

When('que eu preencho os dados do treino {string} com as informações:', (trainingType, table) => {
  const tableData = table.rawTable[1];
  ExerciseTrainingRegisterPage.selectExerciseFromTraining(trainingType, tableData[0]);
  ExerciseTrainingRegisterPage.typeOnField('weight', tableData[1], trainingType);
  ExerciseTrainingRegisterPage.typeOnField('quantity', tableData[2], trainingType);
  ExerciseTrainingRegisterPage.typeOnField('repetions', tableData[3], trainingType);
  ExerciseTrainingRegisterPage.typeOnField('series', tableData[4], trainingType);
});

When('clico no botão +1 do treino {string}', (trainingType) => {
  ExerciseTrainingRegisterPage.clickPlusOneButtonFromTraining(trainingType);
});

Then('devo ver os campos do treino {string} resetados', (trainingType) => {
  ExerciseTrainingRegisterPage.getFieldFromTraining(trainingType, 'weight')
    .should('be.empty');
});
