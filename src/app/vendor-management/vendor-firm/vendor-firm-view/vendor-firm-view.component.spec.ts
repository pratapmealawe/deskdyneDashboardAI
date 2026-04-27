import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFirmViewComponent } from './vendor-firm-view.component';

describe('VendorFirmViewComponent', () => {
  let component: VendorFirmViewComponent;
  let fixture: ComponentFixture<VendorFirmViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorFirmViewComponent]
    });
    fixture = TestBed.createComponent(VendorFirmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
