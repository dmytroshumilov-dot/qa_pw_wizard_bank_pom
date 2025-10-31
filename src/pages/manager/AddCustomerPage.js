import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.custFirstName = page.getByPlaceholder('First Name');
    this.custLastName = page.getByPlaceholder('Last Name');
    this.custPostCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customberListButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async waitForLoadingPage(){
    await this.page.waitForURL('angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillTheField(field,value){
    await field.fill(value);
  }

  async pressAddCustomerButton(){
    await this.addCustomerButton.click();
  }

  async openCustomerlist(){
    await this.customberListButton.click();
  }

  async reloadPage(){
    await this.page.reload();
  }
}
