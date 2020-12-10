# SalesTaxes

Brief Explanation of Design Decisions:<br/>
I wanted to design a simple application that would hit the required marks as well as provide a clean interface for the user to test it out. <br/>
  User Input: <br/>
For user input I went on to assume that though the example inputs all put in one product name at a time, the application should be flexible and able to take more than that as well. This played a role in how the input was parsed and then later stored.  I also went with the assumption that the input should always follow the format ‘QUANTITY PRODUCTNAME at COST’ . This played a role in initial input for throwing errors if it wasn’t properly entered as well as how the data is handled in the first steps of parsing. 
The function ‘onEnteringInput()’ checks to make sure that the received string matches the format and if not, an error is displayed for the user.<br/>

Tax: <br/>
Since the products were split into different categories with different types of taxes, and since there was no pre-defined list, I made an assumption that the only products that would be inputted for testing would be the same ones in the examples for calculating each product’s tax. 

Shopping Cart Functionality:<br/>
I implemented a card to display the ‘shopping cart’ that the user can input the products into. I decided to go with two methods of input- both the classic enter key as well as a button ‘Add to Cart’- since those are two very common methods and some people may prefer one over the other.  The concept would be for the user to input one product at a time until they have the Shopping Cart displaying everything they would like.   Checking Out: 
Once the user has their Cart full with what they want, they can click ‘Checkout’; This will calculate and display their Receipt for the Shopping Cart. I decided to make another design decision here by having the ‘checkoutButton() ‘ function go and clear the variable used previously and re-calculate the totals again with the updated Shopping Cart so that users can add last minute things to their list without having to clear everything out and restart. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


