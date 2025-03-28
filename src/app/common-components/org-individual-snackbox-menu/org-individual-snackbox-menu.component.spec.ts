import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgIndividualSnackboxMenuComponent } from './org-individual-snackbox-menu.component';

describe('OrgIndividualSnackboxMenuComponent', () => {
  let component: OrgIndividualSnackboxMenuComponent;
  let fixture: ComponentFixture<OrgIndividualSnackboxMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgIndividualSnackboxMenuComponent]
    });
    fixture = TestBed.createComponent(OrgIndividualSnackboxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
