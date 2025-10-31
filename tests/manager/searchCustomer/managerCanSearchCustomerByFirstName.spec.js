import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;
/* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

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

test('Assert manager can search customer by First Name', async ({ page }) => {
  const myCustomersListPage = new CustomersListPage(page);
  await myCustomersListPage.open();
  await myCustomersListPage.searchBy(firstName);
  await myCustomersListPage.checkFirstNameInLastRow(firstName);
  await myCustomersListPage.assertThereIsOnlyOneRow();
  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
