import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDailyOrderMenuComponent } from './import-daily-order-menu.component';

describe('ImportDailyOrderMenuComponent', () => {
  let component: ImportDailyOrderMenuComponent;
  let fixture: ComponentFixture<ImportDailyOrderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImportDailyOrderMenuComponent]
    });
    fixture = TestBed.createComponent(ImportDailyOrderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
