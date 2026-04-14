import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCopyBulkMenuComponent } from './organization-copy-bulk-menu.component';

describe('OrganizationCopyBulkMenuComponent', () => {
  let component: OrganizationCopyBulkMenuComponent;
  let fixture: ComponentFixture<OrganizationCopyBulkMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationCopyBulkMenuComponent]
    });
    fixture = TestBed.createComponent(OrganizationCopyBulkMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
