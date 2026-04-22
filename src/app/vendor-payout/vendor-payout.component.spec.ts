import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPayoutComponent } from './vendor-payout.component';

describe('VendorPayoutComponent', () => {
  let component: VendorPayoutComponent;
  let fixture: ComponentFixture<VendorPayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorPayoutComponent]
    });
    fixture = TestBed.createComponent(VendorPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
