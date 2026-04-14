import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrEmployeeComponent } from './qr-employee.component';

describe('QrEmployeeComponent', () => {
  let component: QrEmployeeComponent;
  let fixture: ComponentFixture<QrEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrEmployeeComponent]
    });
    fixture = TestBed.createComponent(QrEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
