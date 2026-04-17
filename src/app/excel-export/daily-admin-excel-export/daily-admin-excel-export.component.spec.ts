import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletExcelExportComponent } from './daily-admin-excel-export.component';

describe('OutletExcelExportComponent', () => {
  let component: OutletExcelExportComponent;
  let fixture: ComponentFixture<OutletExcelExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletExcelExportComponent]
    });
    fixture = TestBed.createComponent(OutletExcelExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
