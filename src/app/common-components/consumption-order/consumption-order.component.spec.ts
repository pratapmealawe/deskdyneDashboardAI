import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionOrderComponent } from './consumption-order.component';

describe('ConsumptionOrderComponent', () => {
  let component: ConsumptionOrderComponent;
  let fixture: ComponentFixture<ConsumptionOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumptionOrderComponent]
    });
    fixture = TestBed.createComponent(ConsumptionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
