import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgBulkOrderHistoryComponent } from './org-bulk-order-history.component';

describe('OrgBulkOrderHistoryComponent', () => {
  let component: OrgBulkOrderHistoryComponent;
  let fixture: ComponentFixture<OrgBulkOrderHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgBulkOrderHistoryComponent]
    });
    fixture = TestBed.createComponent(OrgBulkOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
