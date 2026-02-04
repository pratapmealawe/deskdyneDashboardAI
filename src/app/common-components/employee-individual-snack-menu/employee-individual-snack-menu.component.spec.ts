import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIndividualSnackMenuComponent } from './employee-individual-snack-menu.component';

describe('EmployeeIndividualSnackMenuComponent', () => {
  let component: EmployeeIndividualSnackMenuComponent;
  let fixture: ComponentFixture<EmployeeIndividualSnackMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeIndividualSnackMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeeIndividualSnackMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
