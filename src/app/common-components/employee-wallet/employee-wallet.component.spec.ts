import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWalletComponent } from './employee-wallet.component';

describe('EmployeeWalletComponent', () => {
  let component: EmployeeWalletComponent;
  let fixture: ComponentFixture<EmployeeWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeWalletComponent]
    });
    fixture = TestBed.createComponent(EmployeeWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
