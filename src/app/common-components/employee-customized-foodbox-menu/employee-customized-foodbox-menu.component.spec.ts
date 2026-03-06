import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCustomizedFoodboxMenuComponent } from './employee-customized-foodbox-menu.component';

describe('EmployeeCustomizedFoodboxMenuComponent', () => {
  let component: EmployeeCustomizedFoodboxMenuComponent;
  let fixture: ComponentFixture<EmployeeCustomizedFoodboxMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCustomizedFoodboxMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeeCustomizedFoodboxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
