import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgComplianceComponent } from './organization-compliance.component';

describe('OrgComplianceComponent', () => {
  let component: OrgComplianceComponent;
  let fixture: ComponentFixture<OrgComplianceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgComplianceComponent]
    });
    fixture = TestBed.createComponent(OrgComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
