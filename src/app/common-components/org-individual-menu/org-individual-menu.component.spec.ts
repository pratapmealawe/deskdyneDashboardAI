import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgIndividualMenuComponent } from './org-individual-menu.component';

describe('OrgIndividualMenuComponent', () => {
  let component: OrgIndividualMenuComponent;
  let fixture: ComponentFixture<OrgIndividualMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgIndividualMenuComponent]
    });
    fixture = TestBed.createComponent(OrgIndividualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
