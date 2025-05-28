import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletEmployeeComponent } from './outlet-employee.component';

describe('OutletEmployeeComponent', () => {
  let component: OutletEmployeeComponent;
  let fixture: ComponentFixture<OutletEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletEmployeeComponent]
    });
    fixture = TestBed.createComponent(OutletEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
