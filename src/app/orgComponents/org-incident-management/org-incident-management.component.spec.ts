import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgIncidentManagementComponent } from './org-incident-management.component';

describe('OrgIncidentManagementComponent', () => {
  let component: OrgIncidentManagementComponent;
  let fixture: ComponentFixture<OrgIncidentManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgIncidentManagementComponent]
    });
    fixture = TestBed.createComponent(OrgIncidentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
