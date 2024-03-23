import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletCardComponent } from './outlet-card.component';

describe('OutletCardComponent', () => {
  let component: OutletCardComponent;
  let fixture: ComponentFixture<OutletCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletCardComponent]
    });
    fixture = TestBed.createComponent(OutletCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
