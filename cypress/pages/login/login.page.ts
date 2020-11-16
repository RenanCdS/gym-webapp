const typeInField = (htmlSelector: string, text: string) => {
  cy.get(htmlSelector).type(text);
};

export const LoginPage = {
  typeInUserName(email: string) {
    typeInField('[formcontrolname=username]', email);
  },
  typeInPassword(password: string) {
    typeInField('[formcontrolname=password]', password);
  },
  clickEnter() {
    cy.get('#enter').click();
  },
  getUserNameError() {
    return cy.get('.mat-error').first();
  },
  getSnackBar() {
    return cy.get('.mat-simple-snackbar').first();
  }

};
