import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
/* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
*/

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const myAddCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await myAddCustomerPage.open();
  await myAddCustomerPage.fillTheField(myAddCustomerPage.custFirstName, firstName);
  await myAddCustomerPage.fillTheField(myAddCustomerPage.custLastName, lastName);
  await myAddCustomerPage.fillTheField(myAddCustomerPage.custPostCode, postCode);
  await myAddCustomerPage.pressAddCustomerButton();
  await myAddCustomerPage.reloadPage();
  await myAddCustomerPage.waitForLoadingPage();

});

/* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
test('Assert manager can add new customer', async ({ page }) => {
  const myOpenAccountPage = new OpenAccountPage(page);
  await myOpenAccountPage.open();
  const dollar = 'Dollar';
  await myOpenAccountPage.chooseCreatedUser(firstName, lastName);
  await myOpenAccountPage.selectCurrencyDollar();
  await myOpenAccountPage.clickProcessButton();
  await myOpenAccountPage.reloadPage();

  const myCustomersListPage = new CustomersListPage(page);
  await myCustomersListPage.open();
  await myCustomersListPage.checkAccountExistsInLastRow();
});
