import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatewiseOrdersDialogComponent } from './datewise-orders-dialog.component';

describe('DatewiseOrdersDialogComponent', () => {
  let component: DatewiseOrdersDialogComponent;
  let fixture: ComponentFixture<DatewiseOrdersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatewiseOrdersDialogComponent]
    });
    fixture = TestBed.createComponent(DatewiseOrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
