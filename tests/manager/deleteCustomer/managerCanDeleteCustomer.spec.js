import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

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
  await myAddCustomerPage.openCustomerlist();
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {
  const myCustomersListPage = new CustomersListPage(page);
  await myCustomersListPage.waitForLoadingPage();
  await page.waitForTimeout(1000);
  await myCustomersListPage.checkFirstNameInLastRow(firstName);
  await myCustomersListPage.checkLastNameInLastRow(lastName);
  await myCustomersListPage.checkPostCodeInLastRow(postCode);
  await myCustomersListPage.checkAccountsInLastRow('');

  await myCustomersListPage.deleteLastAddedCustomer();
  await myCustomersListPage.checkDeletedCustomer(firstName);
  await myCustomersListPage.reloadPage();
  await myCustomersListPage.checkDeletedCustomer(firstName);
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
