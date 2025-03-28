import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bCurrentOrdersComponent } from './b2b-current-orders.component';

describe('B2bCurrentOrdersComponent', () => {
  let component: B2bCurrentOrdersComponent;
  let fixture: ComponentFixture<B2bCurrentOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2bCurrentOrdersComponent]
    });
    fixture = TestBed.createComponent(B2bCurrentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
