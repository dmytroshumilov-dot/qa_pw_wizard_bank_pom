import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.userList = page.locator('#userSelect');
    this.currencyList = page.locator('#currency');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrencyDollar(){
    await this.currencyList.selectOption('Dollar');
  }

  async selectCurrencyRupee(){
    await this.currencyList.selectOption('Rupee');
  }

  async selectCurrencyPound(){
    await this.currencyList.selectOption('Pound');
  }

  async checkInputValue(value){
    await expect(this.currencyList).toContainText(value);
  }

  async chooseCreatedUser(firstName,lastName){
    await this.userList.selectOption(`${firstName} ${lastName}`);
  }

  async clickProcessButton(){
    await this.processButton.click();
  }

  async reloadPage(){
    await this.page.reload();
  }

}
