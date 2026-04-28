import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletOrderCardComponent } from './outlet-order-card.component';

describe('OutletOrderCardComponent', () => {
  let component: OutletOrderCardComponent;
  let fixture: ComponentFixture<OutletOrderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletOrderCardComponent]
    });
    fixture = TestBed.createComponent(OutletOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
