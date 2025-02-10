import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgOrdersComponent } from './org-orders.component';

describe('OrgOrdersComponent', () => {
  let component: OrgOrdersComponent;
  let fixture: ComponentFixture<OrgOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgOrdersComponent]
    });
    fixture = TestBed.createComponent(OrgOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
