import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorWalletDashboardComponent } from './vendor-wallet-dashboard.component';

describe('VendorWalletDashboardComponent', () => {
  let component: VendorWalletDashboardComponent;
  let fixture: ComponentFixture<VendorWalletDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorWalletDashboardComponent]
    });
    fixture = TestBed.createComponent(VendorWalletDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
