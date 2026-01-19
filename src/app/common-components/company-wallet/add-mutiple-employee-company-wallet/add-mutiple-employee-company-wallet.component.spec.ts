import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMutipleEmployeeCompanyWalletComponent } from './add-mutiple-employee-company-wallet.component';

describe('AddMutipleEmployeeCompanyWalletComponent', () => {
  let component: AddMutipleEmployeeCompanyWalletComponent;
  let fixture: ComponentFixture<AddMutipleEmployeeCompanyWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddMutipleEmployeeCompanyWalletComponent]
    });
    fixture = TestBed.createComponent(AddMutipleEmployeeCompanyWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
