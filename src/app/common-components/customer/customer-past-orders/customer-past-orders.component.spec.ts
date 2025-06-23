import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPastOrdersComponent } from './customer-past-orders.component';

describe('CustomerPastOrdersComponent', () => {
  let component: CustomerPastOrdersComponent;
  let fixture: ComponentFixture<CustomerPastOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPastOrdersComponent]
    });
    fixture = TestBed.createComponent(CustomerPastOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
