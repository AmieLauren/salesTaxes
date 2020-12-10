import { Component } from '@angular/core';
import {StoreItem} from '../models/StoreItem';
import * as _ from 'lodash';

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

  onEnteringInput(inputString: string): void {
    // split on ' at ' and space to get the needed variables for shoppingList
    const splitInputUp = inputString.split(' ');
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
  checkoutButton(shoppingList: StoreItem[]): void {
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
        this.receipt.push(`${product.product}: ${product.cost.toFixed(2)} (${product.quantity} @ ${product.originalCost})`);
      }
    }
    this.receipt.push(`Sales Taxes: ${this.salesTaxes.toFixed(2)} `);
    this.receipt.push(`Total: ${this.cartTotal.toFixed(2)}`);
  }
  calculateUniqueProduct(productList: StoreItem[]): void {
    // adds unique product info totals and adds to checkoutList
    let productCount = 0;
    let productCost = 0;
    let originalCost = 0;
    let salesTax = 0;
    let productTax = 0;
    let product;
    for (const item of productList) {
      productCost += item.cost;
      originalCost = item.cost;
      salesTax += salesTax;
      productCount += item.quantity;
      product = item.product;
      // if import tax applies (5%)
      if (product.includes('Imported')){
        productTax = this.calculateSalesTax(productCost, 0.05);
        salesTax += productTax;
        productCost = productCost + productTax;
      }
      // if sales tax applies, add to total (10%)
      if (!(product.includes('Book') || product.includes('Chocolate') || product.includes('pills') )){
        productTax = this.calculateSalesTax(productCost, 0.1);
        salesTax += productTax;
        productCost = productCost + productTax;
      }
    }
    this.checkoutList.push(
      {
        quantity: Number(productCount),
        product: product.toString(),
        cost: Number(productCost),
        originalCost: Number(originalCost),
        salesTax: Number(salesTax)
      }
    );
  }
  calculateSalesTax(productCost: number, taxPercent: number): number {
    // Rounds tax up to nearest 5 cents
    const productTaxTotal = productCost * taxPercent;
    return Math.round(productTaxTotal * 20) / 20;
  }

  clearAllButton(): void{
    this.inputString = '';
    this.shoppingList = [];
    this.checkoutList = [];
    this.receipt = [];
    this.salesTaxes = 0;
    this.cartTotal = 0;
  }



}
