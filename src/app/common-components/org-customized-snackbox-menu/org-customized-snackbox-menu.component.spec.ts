import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCustomizedSnackboxMenuComponent } from './org-customized-snackbox-menu.component';

describe('OrgCustomizedSnackboxMenuComponent', () => {
  let component: OrgCustomizedSnackboxMenuComponent;
  let fixture: ComponentFixture<OrgCustomizedSnackboxMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgCustomizedSnackboxMenuComponent]
    });
    fixture = TestBed.createComponent(OrgCustomizedSnackboxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
