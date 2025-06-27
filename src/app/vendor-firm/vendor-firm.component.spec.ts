import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFirmComponent } from './vendor-firm.component';

describe('VendorFirmComponent', () => {
  let component: VendorFirmComponent;
  let fixture: ComponentFixture<VendorFirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorFirmComponent]
    });
    fixture = TestBed.createComponent(VendorFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
