import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgBulkSnackboxMenuComponent } from './org-bulk-snackbox-menu.component';

describe('OrgBulkSnackboxMenuComponent', () => {
  let component: OrgBulkSnackboxMenuComponent;
  let fixture: ComponentFixture<OrgBulkSnackboxMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgBulkSnackboxMenuComponent]
    });
    fixture = TestBed.createComponent(OrgBulkSnackboxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
