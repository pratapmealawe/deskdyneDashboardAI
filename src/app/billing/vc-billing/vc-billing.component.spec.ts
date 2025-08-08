import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcBillingComponent } from './vc-billing.component';

describe('VcBillingComponent', () => {
  let component: VcBillingComponent;
  let fixture: ComponentFixture<VcBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VcBillingComponent]
    });
    fixture = TestBed.createComponent(VcBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
