import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFirmAdminDailyOrderReportComponent } from './vendor-firm-admin-daily-order-report.component';

describe('VendorFirmAdminDailyOrderReportComponent', () => {
  let component: VendorFirmAdminDailyOrderReportComponent;
  let fixture: ComponentFixture<VendorFirmAdminDailyOrderReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorFirmAdminDailyOrderReportComponent]
    });
    fixture = TestBed.createComponent(VendorFirmAdminDailyOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
