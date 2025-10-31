import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';


  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */

test('Assert manager can Login', async ({ page }) => {
  const myBankHomePage = new BankHomePage(page);
  await myBankHomePage.open()
  
  await myBankHomePage.clickManagerLoginButton();

  const myBankManagerMainPage = new BankManagerMainPage(page);
  await myBankManagerMainPage.waitForLoadingPage();
  
  await myBankManagerMainPage.ButtonIsVisible(myBankManagerMainPage.addCustomerButton);
  await myBankManagerMainPage.ButtonIsVisible(myBankManagerMainPage.openAccountButton);
  await myBankManagerMainPage.ButtonIsVisible(myBankManagerMainPage.customersButton);
  
});
