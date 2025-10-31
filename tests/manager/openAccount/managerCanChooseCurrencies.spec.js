import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

/* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */

test('Assert manager can choose currencies for account', async ({ page }) => {
  const myOpenAccountPage = new OpenAccountPage(page);
  await myOpenAccountPage.open();
  const dollar = 'Dollar';
  const rupee = 'Rupee';
  const pound = 'Pound';

  await myOpenAccountPage.selectCurrencyDollar();
  await myOpenAccountPage.checkInputValue(dollar);

  await myOpenAccountPage.selectCurrencyPound();
  await myOpenAccountPage.checkInputValue(pound);

  await myOpenAccountPage.selectCurrencyRupee();
  await myOpenAccountPage.checkInputValue(rupee);
});
