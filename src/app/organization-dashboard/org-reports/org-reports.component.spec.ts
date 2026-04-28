import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgReportsComponent } from './org-reports.component';

describe('OrgReportsComponent', () => {
  let component: OrgReportsComponent;
  let fixture: ComponentFixture<OrgReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgReportsComponent]
    });
    fixture = TestBed.createComponent(OrgReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
