import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOrderReportComponent } from './bulk-order-report.component';

describe('BulkOrderReportComponent', () => {
  let component: BulkOrderReportComponent;
  let fixture: ComponentFixture<BulkOrderReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkOrderReportComponent]
    });
    fixture = TestBed.createComponent(BulkOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
