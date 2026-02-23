import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSubscriptionCardComponent } from './order-subscription-card.component';

describe('OrderSubscriptionCardComponent', () => {
  let component: OrderSubscriptionCardComponent;
  let fixture: ComponentFixture<OrderSubscriptionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSubscriptionCardComponent]
    });
    fixture = TestBed.createComponent(OrderSubscriptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
