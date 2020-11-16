import { When } from 'cypress-cucumber-preprocessor/steps';
import { MenuPage } from '../../../pages/menu/menu.page';

When('clico no submenu {string}', (menuName) => {
  MenuPage.clickOnMenu(menuName);
});
