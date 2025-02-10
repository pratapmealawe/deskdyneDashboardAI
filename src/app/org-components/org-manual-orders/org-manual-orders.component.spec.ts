import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgManualOrdersComponent } from './org-manual-orders.component';

describe('OrgManualOrdersComponent', () => {
  let component: OrgManualOrdersComponent;
  let fixture: ComponentFixture<OrgManualOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgManualOrdersComponent]
    });
    fixture = TestBed.createComponent(OrgManualOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
