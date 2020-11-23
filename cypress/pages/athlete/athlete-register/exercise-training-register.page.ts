export const ExerciseTrainingRegisterPage = {
  selectExerciseFromTraining(trainingType, value) {
    cy.get(`[formGroupName=training${trainingType}] [formcontrolname=exerciseId]`)
      .click().get('.mat-option').contains(value).click();
  },
  typeOnField(name, value, trainingType) {
    cy.get(`[formGroupName=training${trainingType}] [formcontrolname=${name}]`)
      .type(value);
  },
  clickPlusOneButtonFromTraining(trainingType) {
    cy.get(`.training-type-${trainingType}`)
      .click();
  },
  getFieldFromTraining(trainingType, fieldName) {
    return cy.get(`[formGroupName=training${trainingType}] [formcontrolname=${fieldName}]`);
  }
};
