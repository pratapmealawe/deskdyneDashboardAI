import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRegistryComponent } from './org-registry.component';

describe('OrgRegistryComponent', () => {
  let component: OrgRegistryComponent;
  let fixture: ComponentFixture<OrgRegistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgRegistryComponent]
    });
    fixture = TestBed.createComponent(OrgRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
