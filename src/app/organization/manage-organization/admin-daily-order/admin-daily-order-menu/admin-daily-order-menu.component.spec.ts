import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOrderMenuComponent } from './daily-order-menu.component';

describe('DailyOrderMenuComponent', () => {
  let component: DailyOrderMenuComponent;
  let fixture: ComponentFixture<DailyOrderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyOrderMenuComponent]
    });
    fixture = TestBed.createComponent(DailyOrderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
