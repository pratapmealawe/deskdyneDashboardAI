import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBillingComponent } from './wallet-billing.component';

describe('WalletBillingComponent', () => {
  let component: WalletBillingComponent;
  let fixture: ComponentFixture<WalletBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletBillingComponent]
    });
    fixture = TestBed.createComponent(WalletBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
