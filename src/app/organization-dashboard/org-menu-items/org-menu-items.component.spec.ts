import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMenuItemsComponent } from './org-menu-items.component';

describe('OrgMenuItemsComponent', () => {
  let component: OrgMenuItemsComponent;
  let fixture: ComponentFixture<OrgMenuItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgMenuItemsComponent]
    });
    fixture = TestBed.createComponent(OrgMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
