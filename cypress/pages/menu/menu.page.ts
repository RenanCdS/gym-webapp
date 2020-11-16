export const MenuPage = {
  clickOnMenu(menuName) {
    cy.get('.mat-menu-trigger').click()
      .get('.mat-menu-item')
      .contains(menuName)
      .click();
  }
}
