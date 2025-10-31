import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', {name: 'Add Customer'});
    this.openAccountButton = page.getByRole('button', {name: 'Open Account'});
    this.customersButton = page.getByRole('button', {name: 'Customers'});
    
  }

  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/manager');
  }

  async waitForLoadingPage(){
    await this.page.waitForURL('angularJs-protractor/BankingProject/#/manager');
  }

  async ButtonIsVisible(button){
    await expect(button).toBeVisible();
  }
}