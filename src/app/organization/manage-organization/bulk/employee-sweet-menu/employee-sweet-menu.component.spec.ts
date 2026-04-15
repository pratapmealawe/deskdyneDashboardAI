import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSweetMenuComponent } from './employee-sweet-menu.component';

describe('EmployeeSweetMenuComponent', () => {
  let component: EmployeeSweetMenuComponent;
  let fixture: ComponentFixture<EmployeeSweetMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeSweetMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeeSweetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
