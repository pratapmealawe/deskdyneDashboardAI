import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletVendorComponent } from './outlet-vendor.component';

describe('OutletVendorComponent', () => {
  let component: OutletVendorComponent;
  let fixture: ComponentFixture<OutletVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletVendorComponent]
    });
    fixture = TestBed.createComponent(OutletVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
