import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBulkMealMenuComponent } from './employee-bulk-meal-menu.component';

describe('EmployeeBulkMealMenuComponent', () => {
  let component: EmployeeBulkMealMenuComponent;
  let fixture: ComponentFixture<EmployeeBulkMealMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeBulkMealMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeeBulkMealMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
