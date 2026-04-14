import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgOutletOrdersComponent } from './org-outlet-orders.component';

describe('OrgOutletOrdersComponent', () => {
  let component: OrgOutletOrdersComponent;
  let fixture: ComponentFixture<OrgOutletOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgOutletOrdersComponent]
    });
    fixture = TestBed.createComponent(OrgOutletOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
