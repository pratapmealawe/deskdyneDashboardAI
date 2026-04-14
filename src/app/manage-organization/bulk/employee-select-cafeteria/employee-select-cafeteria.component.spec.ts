import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSelectCafeteriaComponent } from './employee-select-cafeteria.component';

describe('EmployeeSelectCafeteriaComponent', () => {
  let component: EmployeeSelectCafeteriaComponent;
  let fixture: ComponentFixture<EmployeeSelectCafeteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeSelectCafeteriaComponent]
    });
    fixture = TestBed.createComponent(EmployeeSelectCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
