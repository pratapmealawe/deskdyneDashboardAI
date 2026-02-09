import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBulkSnackMenuComponent } from './employee-bulk-snack-menu.component';

describe('EmployeeBulkSnackMenuComponent', () => {
  let component: EmployeeBulkSnackMenuComponent;
  let fixture: ComponentFixture<EmployeeBulkSnackMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeBulkSnackMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeeBulkSnackMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
