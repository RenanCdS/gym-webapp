export const CoachPage = {
  typeOnField(fieldName: string, text: string) {
    cy.get(`[formcontrolname=${fieldName}]`).type(text);
  },
  clickCadaster() {
    cy.get('.mat-raised-button')
      .contains('Cadastrar')
      .click();
  },
  getSnackBar() {
    return cy.get('.mat-simple-snackbar').first();
  },
  getInputErrorFeedback() {
    return cy.get('.mat-error').first();
  }
};
