import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyWalletComponent } from './customer-company-wallet.component';

describe('CustomerCompanyWalletComponent', () => {
  let component: CustomerCompanyWalletComponent;
  let fixture: ComponentFixture<CustomerCompanyWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCompanyWalletComponent]
    });
    fixture = TestBed.createComponent(CustomerCompanyWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
