import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOutletOrdersComponent } from './customer-outlet-orders.component';

describe('CustomerOutletOrdersComponent', () => {
  let component: CustomerOutletOrdersComponent;
  let fixture: ComponentFixture<CustomerOutletOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerOutletOrdersComponent]
    });
    fixture = TestBed.createComponent(CustomerOutletOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
