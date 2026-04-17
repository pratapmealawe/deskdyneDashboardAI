import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDailyReportComponent } from './vendor-daily-report.component';

describe('VendorDailyReportComponent', () => {
  let component: VendorDailyReportComponent;
  let fixture: ComponentFixture<VendorDailyReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorDailyReportComponent]
    });
    fixture = TestBed.createComponent(VendorDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
