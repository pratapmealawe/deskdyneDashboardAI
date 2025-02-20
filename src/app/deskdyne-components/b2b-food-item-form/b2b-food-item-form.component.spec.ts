import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bFoodItemFormComponent } from './b2b-food-item-form.component';

describe('B2bFoodItemFormComponent', () => {
  let component: B2bFoodItemFormComponent;
  let fixture: ComponentFixture<B2bFoodItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2bFoodItemFormComponent]
    });
    fixture = TestBed.createComponent(B2bFoodItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
