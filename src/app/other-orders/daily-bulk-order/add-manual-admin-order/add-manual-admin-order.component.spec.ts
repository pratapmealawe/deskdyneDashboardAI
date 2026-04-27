import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualAdminOrderComponent } from './add-manual-admin-order.component';

describe('AddManualAdminOrderComponent', () => {
  let component: AddManualAdminOrderComponent;
  let fixture: ComponentFixture<AddManualAdminOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddManualAdminOrderComponent]
    });
    fixture = TestBed.createComponent(AddManualAdminOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
