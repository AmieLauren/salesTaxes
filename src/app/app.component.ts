import { Component } from '@angular/core';
import {StoreItem} from '../models/StoreItem';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'salesTaxes';
  // the entered input
  testerString: string;
  // to hold the shopping list items
  shoppingList: StoreItem[] = [];
  checkoutList: StoreItem[] = [];
  receipt: string[] = [];
  salesTaxes: number;
  cartTotal: number;

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
    console.log('new product', newProduct);
    this.shoppingList.push(newProduct);
    console.log('the shopping list', this.shoppingList);
  }
  checkoutButton(shoppingList: StoreItem[]): void {
    // groups items by product
    const uniqueItems = _.uniq(shoppingList.map(s => s.product));
    console.log('unique items', uniqueItems);
    // gets all unique products to sort by
    for (const name of uniqueItems) {
      const items = shoppingList.filter(x => x.product === name);
      console.log('sorted shopping list', items);
      this.calculateUniqueProduct(items);
    }
    for (const product of this.checkoutList) {
      this.salesTaxes += product.salesTax;
      this.cartTotal += product.cost;
      if (product.quantity === 1) {
        this.receipt.push(`${product.product}: ${product.cost}`);
      }
      if (product.quantity > 1) {
        this.receipt.push(`${product.product}: ${product.cost} (${product.quantity} @ ${product.originalCost})`);
      }
    }
    console.log('sales tax:', this.salesTaxes, 'total amount', this.cartTotal);
    this.receipt.push(`Sales Taxes: ${this.salesTaxes} `);
    this.receipt.push(`Total: ${this.cartTotal}`);
    console.log('THE FINAL RECEIPT', this.receipt);
    // takes the shopping list and calculates the tax based on the product type
  }
  calculateUniqueProduct(productList: StoreItem[]): void {
    // adds unique product info totals and adds to checkoutList
    let productCount = 0;
    let productCost = 0;
    let originalCost = 0;
    let salesTax = 0;
    let product;
    for (const item of productList) {
      productCost += item.cost;
      originalCost = item.cost;
      // salesTax += salesTax;
      productCount += item.quantity;
      product = item.product;
      // if import tax applies (5%)
      if (product.includes('Imported')){
        salesTax += (productCost * 0.05);
        productCost = productCost + (productCost * 0.05);
      }
      // if sales tax applies, add to total (10%)
      if (!(product.includes('Book') || product.includes('Chocolate') || product.includes('pills') )){
        salesTax += (productCost * 0.1);
        productCost = productCost + (productCost * 0.1);
      }
    }
    // console.log('checkout list', this.checkoutList);
    this.checkoutList.push(
      {
        quantity: Number(productCount),
        product: product.toString(),
        cost: Number(productCost),
        originalCost: Number(originalCost)
      }
    );
    console.log('The checkoutList', this.checkoutList);

  }



}
