export const MenuPage = {
  clickOnMenu(menuName) {
    cy.get('.mat-menu-trigger').click({ force: true })
      .get('.mat-menu-item')
      .contains(menuName)
      .click({ force: true });
  }
};

