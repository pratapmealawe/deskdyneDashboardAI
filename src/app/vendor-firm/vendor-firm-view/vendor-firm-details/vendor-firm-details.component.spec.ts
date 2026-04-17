import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFirmDetailsComponent } from './vendor-firm-details.component';

describe('VendorFirmDetailsComponent', () => {
  let component: VendorFirmDetailsComponent;
  let fixture: ComponentFixture<VendorFirmDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VendorFirmDetailsComponent]
    });
    fixture = TestBed.createComponent(VendorFirmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
