import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPredefinedSnackboxMenuComponent } from './org-predefined-snackbox-menu.component';

describe('OrgPredefinedSnackboxMenuComponent', () => {
  let component: OrgPredefinedSnackboxMenuComponent;
  let fixture: ComponentFixture<OrgPredefinedSnackboxMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPredefinedSnackboxMenuComponent]
    });
    fixture = TestBed.createComponent(OrgPredefinedSnackboxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
