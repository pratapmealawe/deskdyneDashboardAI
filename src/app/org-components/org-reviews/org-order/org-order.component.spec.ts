import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgOrderComponent } from './org-order.component';

describe('OrgOrderComponent', () => {
  let component: OrgOrderComponent;
  let fixture: ComponentFixture<OrgOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgOrderComponent]
    });
    fixture = TestBed.createComponent(OrgOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
