import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePantryMenuComponent } from './employee-pantry-menu.component';

describe('EmployeePantryMenuComponent', () => {
  let component: EmployeePantryMenuComponent;
  let fixture: ComponentFixture<EmployeePantryMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeePantryMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeePantryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
