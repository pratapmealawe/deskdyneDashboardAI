import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorFirmComponent } from './add-vendor-firm.component';

describe('AddVendorFirmComponent', () => {
  let component: AddVendorFirmComponent;
  let fixture: ComponentFixture<AddVendorFirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVendorFirmComponent]
    });
    fixture = TestBed.createComponent(AddVendorFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
