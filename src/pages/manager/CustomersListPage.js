import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.getByRole('row').last();
    this.lastRowFirstName = this.lastRow.getByRole('cell').nth(0);
    this.lastRowLastName = this.lastRow.getByRole('cell').nth(1);
    this.lastRowPostCode = this.lastRow.getByRole('cell').nth(2);
    this.lastRowAccounts = this.lastRow.getByRole('cell').nth(3);
    this.lastRowDeleteButton = this.lastRow.getByRole('button').last();
    this.searchField = page.getByPlaceholder('Search Customer');
    this.firstRow = page.getByRole('row').nth(1);
    this.firstRowFirstName = this.firstRow.getByRole('cell').nth(0);
  }

  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForLoadingPage(){
    await this.page.waitForURL('angularJs-protractor/BankingProject/#/manager/list');
  }

  async reloadPage(){
    await this.page.reload();
  }

  async checkFirstNameInLastRow(value){
    await expect(this.lastRowFirstName).toContainText(value);
  }

  async checkLastNameInLastRow(value){
    await expect(this.lastRowLastName).toContainText(value);
  }

  async checkPostCodeInLastRow(value){
    await expect(this.lastRowPostCode).toContainText(value);
  }

  async checkAccountsInLastRow(value){
    await expect(this.lastRowAccounts).toContainText(value);
  }

  async checkAccountExistsInLastRow(){
    await expect(this.lastRowAccounts).not.toBeEmpty();
  }

  async deleteLastAddedCustomer(){
    await this.lastRowDeleteButton.click();
  }

  async checkDeletedCustomer(firstName){
    await expect(this.lastRowFirstName).not.toContainText(firstName);
  }
  
  async searchBy(value){
    await this.searchField.fill(value);
  }

  async assertThereIsOnlyOneRow(){
    const firstRowText = await this.firstRowFirstName.textContent();
    const lastRowText = await this.lastRowFirstName.textContent();
    expect(firstRowText).toBe(lastRowText);
  }
}
