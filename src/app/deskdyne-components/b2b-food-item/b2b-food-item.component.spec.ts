import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bFoodItemComponent } from './b2b-food-item.component';

describe('B2bFoodItemComponent', () => {
  let component: B2bFoodItemComponent;
  let fixture: ComponentFixture<B2bFoodItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2bFoodItemComponent]
    });
    fixture = TestBed.createComponent(B2bFoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
