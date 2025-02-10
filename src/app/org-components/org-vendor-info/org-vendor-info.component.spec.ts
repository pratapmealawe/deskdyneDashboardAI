import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgVendorInfoComponent } from './org-vendor-info.component';

describe('OrgVendorInfoComponent', () => {
  let component: OrgVendorInfoComponent;
  let fixture: ComponentFixture<OrgVendorInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgVendorInfoComponent]
    });
    fixture = TestBed.createComponent(OrgVendorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
