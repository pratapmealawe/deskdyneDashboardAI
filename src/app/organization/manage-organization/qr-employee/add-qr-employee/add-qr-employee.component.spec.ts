import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrEmployeeDialogComponent } from './qr-employee-dialog.component';

describe('QrEmployeeDialogComponent', () => {
  let component: QrEmployeeDialogComponent;
  let fixture: ComponentFixture<QrEmployeeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrEmployeeDialogComponent]
    });
    fixture = TestBed.createComponent(QrEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
