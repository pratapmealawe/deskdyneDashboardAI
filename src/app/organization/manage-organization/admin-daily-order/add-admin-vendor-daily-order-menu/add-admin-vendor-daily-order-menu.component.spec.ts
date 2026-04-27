import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorDailyOrderMenuComponent } from './add-vendor-daily-order-menu.component';

describe('AddVendorDailyOrderMenuComponent', () => {
  let component: AddVendorDailyOrderMenuComponent;
  let fixture: ComponentFixture<AddVendorDailyOrderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddVendorDailyOrderMenuComponent]
    });
    fixture = TestBed.createComponent(AddVendorDailyOrderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
