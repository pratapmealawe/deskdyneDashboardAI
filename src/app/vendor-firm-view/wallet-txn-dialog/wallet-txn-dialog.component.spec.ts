import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTxnDialogComponent } from './wallet-txn-dialog.component';

describe('WalletTxnDialogComponent', () => {
  let component: WalletTxnDialogComponent;
  let fixture: ComponentFixture<WalletTxnDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletTxnDialogComponent]
    });
    fixture = TestBed.createComponent(WalletTxnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
