import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcEmployeeComponent } from './vc-employee.component';

describe('VcEmployeeComponent', () => {
  let component: VcEmployeeComponent;
  let fixture: ComponentFixture<VcEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VcEmployeeComponent]
    });
    fixture = TestBed.createComponent(VcEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
