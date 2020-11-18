export const MyTrainingPage = {
  getExercisesQuantity() {
    let countSlide = 0;
    return cy.get('.swiper-slide').each(() => {
      countSlide++;
    }).then(() => countSlide);
  },
  finalizeExercises() {
    cy.get('.swiper-slide').each(() => {
      this.clickOnDoneButton();
    });
  },
  clickOnDoneButton() {
    cy.get('#done .mat-button-wrapper')
      .contains('Feito')
      .click({ force: true });
  },
  clickOnFinalizeTrainingButton() {
    cy.get('#finalize-training .mat-button-wrapper')
      .contains('Finalizar treino')
      .click({ force: true });
  },
  clickOnModalButton(buttonName: string) {
    cy.get('.confirmation-modal__actions .mat-button-wrapper')
      .contains(buttonName)
      .click({ force: true });
  },
  getFinalizedTrainingModal() {
    return cy.get('.successfully-message-container')
      .contains('Treino finalizado!');
  }
};
