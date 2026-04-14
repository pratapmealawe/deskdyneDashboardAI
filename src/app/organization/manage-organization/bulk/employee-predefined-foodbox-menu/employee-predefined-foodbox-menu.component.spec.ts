import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePredefinedFoodboxMenuComponent } from './employee-predefined-foodbox-menu.component';

describe('EmployeePredefinedFoodboxMenuComponent', () => {
  let component: EmployeePredefinedFoodboxMenuComponent;
  let fixture: ComponentFixture<EmployeePredefinedFoodboxMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeePredefinedFoodboxMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeePredefinedFoodboxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
