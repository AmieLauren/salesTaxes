import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {StoreItem} from '../models/StoreItem';
import {MatCardModule} from '@angular/material/card';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should calculate correct sales tax', () => {
    const salePrice = 12;
    const expectedTax = 1.2;
    const expectedImportedTax = 0.6;
    const actualCalculatedSalesTax = component.calculateSalesTax(salePrice, component.salesTax);
    const actualCalculatedImportTax = component.calculateSalesTax(salePrice, component.importTax);
    expect(expectedTax).toEqual(actualCalculatedSalesTax);
    expect(expectedImportedTax).toEqual(actualCalculatedImportTax);
  });

  it('should calculate correct sales tax', () => {
    const products: StoreItem[] = [
      {
        quantity: 1,
        product: 'cat',
        cost: 12.00
      },
      {
        quantity: 1,
        product: 'cat',
        cost: 12.00
      }
    ];
    component.calculateUniqueProduct(products);
    expect(component.checkoutList.length).toEqual(1);
    expect(component.checkoutList[0].product).toEqual('cat');
    expect(component.checkoutList[0].originalCost).toEqual(12.00);
    expect(component.checkoutList[0].cost).toEqual(26.40);
  });
});
