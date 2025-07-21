import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherOrdersComponent } from './other-orders.component';

describe('OtherOrdersComponent', () => {
  let component: OtherOrdersComponent;
  let fixture: ComponentFixture<OtherOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherOrdersComponent]
    });
    fixture = TestBed.createComponent(OtherOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
