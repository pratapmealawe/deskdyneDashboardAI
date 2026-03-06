import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAddVendorComponent } from './organization-add-vendor.component';

describe('OrganizationAddVendorComponent', () => {
  let component: OrganizationAddVendorComponent;
  let fixture: ComponentFixture<OrganizationAddVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationAddVendorComponent]
    });
    fixture = TestBed.createComponent(OrganizationAddVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
