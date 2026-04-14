import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyDailyOrderMenuComponent } from './copy-daily-order-menu.component';

describe('CopyDailyOrderMenuComponent', () => {
  let component: CopyDailyOrderMenuComponent;
  let fixture: ComponentFixture<CopyDailyOrderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CopyDailyOrderMenuComponent]
    });
    fixture = TestBed.createComponent(CopyDailyOrderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
