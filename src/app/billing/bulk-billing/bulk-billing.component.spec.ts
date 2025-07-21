import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkBillingComponent } from './bulk-billing.component';

describe('BulkBillingComponent', () => {
  let component: BulkBillingComponent;
  let fixture: ComponentFixture<BulkBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkBillingComponent]
    });
    fixture = TestBed.createComponent(BulkBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
