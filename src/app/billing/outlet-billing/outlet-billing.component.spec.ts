import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletBillingComponent } from './outlet-billing.component';

describe('OutletBillingComponent', () => {
  let component: OutletBillingComponent;
  let fixture: ComponentFixture<OutletBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletBillingComponent]
    });
    fixture = TestBed.createComponent(OutletBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
