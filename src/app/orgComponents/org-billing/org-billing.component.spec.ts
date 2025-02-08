import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgBillingComponent } from './org-billing.component';

describe('OrgBillingComponent', () => {
  let component: OrgBillingComponent;
  let fixture: ComponentFixture<OrgBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgBillingComponent]
    });
    fixture = TestBed.createComponent(OrgBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
