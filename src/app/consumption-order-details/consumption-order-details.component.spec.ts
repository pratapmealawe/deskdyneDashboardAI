import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionOrderDetailsComponent } from './consumption-order-details.component';

describe('ConsumptionOrderDetailsComponent', () => {
  let component: ConsumptionOrderDetailsComponent;
  let fixture: ComponentFixture<ConsumptionOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumptionOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(ConsumptionOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
