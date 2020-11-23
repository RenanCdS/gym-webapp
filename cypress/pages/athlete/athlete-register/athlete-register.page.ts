export const AthleteRegisterPage = {
  fillForm(name, age, email, phone, weight, height, password) {
    this.typeOnField('name', name);
    this.typeOnField('age', age);
    this.typeOnField('email', email);
    this.typeOnField('phone', phone);
    this.typeOnField('weight', weight);
    this.typeOnField('height', height);
    this.typeOnField('password', password);
  },
  typeOnField(fieldName: string, text: string) {
    cy.get(`.personal-data-form [formcontrolname=${fieldName}]`).type(text);
  },
  clickPersonalDataNext() {
    cy.get('.personal-data-next').click();
  },
  getStepLabel(stepTitle: string) {
    return cy.get('.mat-step-label').contains(stepTitle);
  },
  getErrorFeedback(feedback: string) {
    return cy.get('.personal-data-form').contains(feedback).first();
  }
};
