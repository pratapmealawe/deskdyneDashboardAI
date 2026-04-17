import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFirmReportComponent } from './vendor-firm-report.component';

describe('VendorFirmReportComponent', () => {
  let component: VendorFirmReportComponent;
  let fixture: ComponentFixture<VendorFirmReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorFirmReportComponent]
    });
    fixture = TestBed.createComponent(VendorFirmReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
