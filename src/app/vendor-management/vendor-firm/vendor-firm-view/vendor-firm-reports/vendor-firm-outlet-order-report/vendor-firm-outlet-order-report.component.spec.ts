import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFirmOutletOrderReportComponent } from './vendor-firm-outlet-order-report.component';

describe('VendorFirmOutletOrderReportComponent', () => {
  let component: VendorFirmOutletOrderReportComponent;
  let fixture: ComponentFixture<VendorFirmOutletOrderReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorFirmOutletOrderReportComponent]
    });
    fixture = TestBed.createComponent(VendorFirmOutletOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
