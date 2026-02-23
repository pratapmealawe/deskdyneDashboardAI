import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSubscriptionPackageCardComponent } from './order-subscription-package-card.component';

describe('OrderSubscriptionPackageCardComponent', () => {
  let component: OrderSubscriptionPackageCardComponent;
  let fixture: ComponentFixture<OrderSubscriptionPackageCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSubscriptionPackageCardComponent]
    });
    fixture = TestBed.createComponent(OrderSubscriptionPackageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
