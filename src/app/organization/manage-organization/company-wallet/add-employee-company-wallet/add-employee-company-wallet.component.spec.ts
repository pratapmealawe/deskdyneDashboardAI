import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeCompanyWalletComponent } from './add-employee-company-wallet.component';

describe('AddEmployeeCompanyWalletComponent', () => {
  let component: AddEmployeeCompanyWalletComponent;
  let fixture: ComponentFixture<AddEmployeeCompanyWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEmployeeCompanyWalletComponent]
    });
    fixture = TestBed.createComponent(AddEmployeeCompanyWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
