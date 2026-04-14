import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgBulkMenuComponent } from './org-bulk-menu.component';

describe('OrgBulkMenuComponent', () => {
  let component: OrgBulkMenuComponent;
  let fixture: ComponentFixture<OrgBulkMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgBulkMenuComponent]
    });
    fixture = TestBed.createComponent(OrgBulkMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
