import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyOrderMenuComponent } from './add-daily-order-menu.component';

describe('AddDailyOrderMenuComponent', () => {
  let component: AddDailyOrderMenuComponent;
  let fixture: ComponentFixture<AddDailyOrderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddDailyOrderMenuComponent]
    });
    fixture = TestBed.createComponent(AddDailyOrderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
