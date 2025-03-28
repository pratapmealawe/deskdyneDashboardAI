import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bWeeklyMenuComponent } from './b2b-weekly-menu.component';

describe('B2bWeeklyMenuComponent', () => {
  let component: B2bWeeklyMenuComponent;
  let fixture: ComponentFixture<B2bWeeklyMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2bWeeklyMenuComponent]
    });
    fixture = TestBed.createComponent(B2bWeeklyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
