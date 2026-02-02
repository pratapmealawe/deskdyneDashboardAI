import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubTypeDailyOrderMenuComponent } from './add-sub-type-daily-order-menu.component';

describe('AddSubTypeDailyOrderMenuComponent', () => {
  let component: AddSubTypeDailyOrderMenuComponent;
  let fixture: ComponentFixture<AddSubTypeDailyOrderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddSubTypeDailyOrderMenuComponent]
    });
    fixture = TestBed.createComponent(AddSubTypeDailyOrderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
