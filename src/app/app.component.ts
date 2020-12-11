import { Component } from '@angular/core';
import {StoreItem} from '../models/StoreItem';
import * as _ from 'lodash';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  inputString: string;
  shoppingList: StoreItem[] = [];
  checkoutList: StoreItem[] = [];
  receipt: string[] = [];
  salesTaxes = 0;
  cartTotal = 0;
  salesTax = .10;
  importTax = .05;

  onEnteringInput(inputString: string): void {
    // split on ' at ' and space to get the needed variables for shoppingList
    const splitInputUp = inputString.split(' ');
    if ( inputString.includes(' at ') && isNumeric(splitInputUp[0])) {
      splitInputUp.shift();
      splitInputUp.splice(-2, 2);
      const getQuantity = inputString.split(' ', 2);
      const splitListForCost = inputString.split(' at ', 2);
      // putting into StoreItem
      const newProduct: StoreItem = {
        quantity: Number(getQuantity[0]),
        product: splitInputUp.join(' '),
        cost: Number(splitListForCost[1]),
      };
      this.shoppingList.push(newProduct);
    }
    else {
      this.openErrorAlert();
    }
  }
  checkoutButton(shoppingList: StoreItem[]): void {
    // clearing values so that you can click checkout multiple times and just add from cart rather than clearing everything
    this.receipt = [];
    this.checkoutList = [];
    this.salesTaxes = 0;
    this.cartTotal = 0;
    // groups items by product
    const uniqueItems = _.uniq(shoppingList.map(s => s.product));
    // gets all unique products to sort by
    for (const name of uniqueItems) {
      const items = shoppingList.filter(x => x.product === name);
      this.calculateUniqueProduct(items);
    }
    // loops and pushed final cart details to receipt that will be displayed
    for (const product of this.checkoutList) {
      this.salesTaxes += product.salesTax;
      this.cartTotal += product.cost;
      if (product.quantity === 1) {
        this.receipt.push(`${product.product}: ${product.cost.toFixed(2)}`);
      }
      if (product.quantity > 1) {
        this.receipt.push(`${product.product}: ${product.cost.toFixed(2)} (${product.quantity} @ ${product.originalCost.toFixed(2)})`);
      }
    }
    this.receipt.push(`Sales Taxes: ${this.salesTaxes.toFixed(2)} `);
    this.receipt.push(`Total: ${this.cartTotal.toFixed(2)}`);
  }
  calculateUniqueProduct(productList: StoreItem[]): void {
    // adds unique product info totals and adds to checkoutList
    let totalProductCount = 0;
    let totalProductCost = 0;
    let totalProductTax = 0;
    let totalProductImportTax = 0;
    const productName = productList[0].product;
    const originalCost = productList[0].cost;
    let itemCost = 0;
    let totalTax = 0;
    for (const item of productList) {
      itemCost = item.cost;
      totalProductTax = 0;
      totalProductImportTax = 0;
      if (productName.toLowerCase().includes('imported')){
        totalProductImportTax = this.calculateSalesTax(itemCost, this.importTax);
      }
      // if sales tax applies, add to total (10%)
      if (!(productName.toLowerCase().includes('book') || productName.toLowerCase().includes('chocolate') ||
        productName.toLowerCase().includes('pills') || productName.toLowerCase().includes('chocolates'))){
        totalProductTax = this.calculateSalesTax(itemCost, this.salesTax);
      }
      totalProductCount += item.quantity;
      totalTax += totalProductImportTax + totalProductTax;
      totalProductCost += itemCost + totalProductImportTax + totalProductTax;
    }
    this.checkoutList.push(
      {
        quantity: Number(totalProductCount),
        product: productName,
        cost: Number(totalProductCost),
        originalCost: Number(originalCost + totalProductImportTax),
        salesTax: Number(totalTax)
      }
    );
  }
  calculateSalesTax(productCost: number, taxPercent: number): number {
    // Rounds tax up to nearest 5 cents
    const productTaxTotal = productCost * taxPercent;
    return Number((Math.ceil(productTaxTotal * 20 - 0.05) / 20).toFixed(2));
  }

  clearAllButton(): void{
    this.inputString = '';
    this.shoppingList = [];
    this.checkoutList = [];
    this.receipt = [];
    this.salesTaxes = 0;
    this.cartTotal = 0;
  }

  openErrorAlert(): void {
    alert('Not valid input; Correct format is: AMOUNT PRODUCTNAME at COST');
  }
}
