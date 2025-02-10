import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMenuCountersComponent } from './org-menu-counters.component';

describe('OrgMenuCountersComponent', () => {
  let component: OrgMenuCountersComponent;
  let fixture: ComponentFixture<OrgMenuCountersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgMenuCountersComponent]
    });
    fixture = TestBed.createComponent(OrgMenuCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
