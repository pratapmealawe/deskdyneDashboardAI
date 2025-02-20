import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealAweOutletComponent } from './meal-awe-outlet.component';

describe('MealAweOutletComponent', () => {
  let component: MealAweOutletComponent;
  let fixture: ComponentFixture<MealAweOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealAweOutletComponent]
    });
    fixture = TestBed.createComponent(MealAweOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
