import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgordersComponent } from './orgorders.component'

describe('OrgordersComponent', () => {
  let component: OrgordersComponent;
  let fixture: ComponentFixture<OrgordersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgordersComponent]
    });
    fixture = TestBed.createComponent(OrgordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
