import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLuxMenuComponent } from './employee-lux-menu.component';

describe('EmployeeLuxMenuComponent', () => {
  let component: EmployeeLuxMenuComponent;
  let fixture: ComponentFixture<EmployeeLuxMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeLuxMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeeLuxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
