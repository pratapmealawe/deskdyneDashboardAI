import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWalletBillingComponent } from './company-wallet-billing.component';

describe('CompanyWalletBillingComponent', () => {
  let component: CompanyWalletBillingComponent;
  let fixture: ComponentFixture<CompanyWalletBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyWalletBillingComponent]
    });
    fixture = TestBed.createComponent(CompanyWalletBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
