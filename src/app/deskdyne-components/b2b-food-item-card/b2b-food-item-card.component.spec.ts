import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bFoodItemCardComponent } from './b2b-food-item-card.component';

describe('B2bFoodItemCardComponent', () => {
  let component: B2bFoodItemCardComponent;
  let fixture: ComponentFixture<B2bFoodItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2bFoodItemCardComponent]
    });
    fixture = TestBed.createComponent(B2bFoodItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
