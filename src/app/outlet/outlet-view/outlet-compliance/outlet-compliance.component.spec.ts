import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletComplianceComponent } from './outlet-compliance.component';

describe('OutletComplianceComponent', () => {
  let component: OutletComplianceComponent;
  let fixture: ComponentFixture<OutletComplianceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletComplianceComponent]
    });
    fixture = TestBed.createComponent(OutletComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
