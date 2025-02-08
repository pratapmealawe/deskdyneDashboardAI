import { ComponentFixture, TestBed } from '@angular/core/testing';
import {OrgChecklistComponent } from './org-checklist.component';

describe('OrgChecklistComponent', () => {
  let component: OrgChecklistComponent;
  let fixture: ComponentFixture<OrgChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgChecklistComponent]
    });
    fixture = TestBed.createComponent(OrgChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
