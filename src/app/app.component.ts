import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {StoreItem} from '../models/StoreItem';

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
  shoppingList: StoreItem[];

  onEnteringInput(inputString: string): void {
    // split on ' at ' and space to get the needed variables for shoppingList

    const splitInputUp = inputString.split(' ');
    splitInputUp.shift();
    splitInputUp.splice(-2, 2);
    const getQuantity = inputString.split(' ', 2);
    const splitListForCost = inputString.split(' at ', 2);
    // putting into StoreItem
    const newObject: StoreItem = {
      quantity: Number(getQuantity[0]),
      product: splitInputUp.join(' '),
      cost: Number(splitListForCost[1]),
    };
    console.log(newObject);


    // this.shoppingList.push(inputString)
  }



}
