import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPastMealOrdersComponent } from './customer-past-meal-orders.component';

describe('CustomerPastMealOrdersComponent', () => {
  let component: CustomerPastMealOrdersComponent;
  let fixture: ComponentFixture<CustomerPastMealOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPastMealOrdersComponent]
    });
    fixture = TestBed.createComponent(CustomerPastMealOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
