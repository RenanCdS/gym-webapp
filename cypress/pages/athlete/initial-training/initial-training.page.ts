export const InitialTrainingPage = {
  clickTraining(trainingType: string) {
    cy.get('.training-type__button .mat-button-wrapper')
      .contains(trainingType)
      .click({ force: true });
  }
};
