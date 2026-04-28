import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPreOrdersComponent } from './org-pre-orders.component';

describe('OrgPreOrdersComponent', () => {
  let component: OrgPreOrdersComponent;
  let fixture: ComponentFixture<OrgPreOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPreOrdersComponent]
    });
    fixture = TestBed.createComponent(OrgPreOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
