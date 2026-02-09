import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCakeMenuComponent } from './employee-cake-menu.component';

describe('EmployeeCakeMenuComponent', () => {
  let component: EmployeeCakeMenuComponent;
  let fixture: ComponentFixture<EmployeeCakeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCakeMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeeCakeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
