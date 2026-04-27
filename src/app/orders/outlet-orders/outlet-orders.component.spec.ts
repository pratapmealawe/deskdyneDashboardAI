import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletOrdersComponent } from './outlet-orders.component';

describe('OutletOrdersComponent', () => {
  let component: OutletOrdersComponent;
  let fixture: ComponentFixture<OutletOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletOrdersComponent]
    });
    fixture = TestBed.createComponent(OutletOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
