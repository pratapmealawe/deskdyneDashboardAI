import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIndividualMealMenuComponent } from './employee-individual-meal-menu.component';

describe('EmployeeIndividualMealMenuComponent', () => {
  let component: EmployeeIndividualMealMenuComponent;
  let fixture: ComponentFixture<EmployeeIndividualMealMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeIndividualMealMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeeIndividualMealMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
