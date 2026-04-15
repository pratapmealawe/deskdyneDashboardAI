import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualCafeteriaComponent } from './virtual-cafeteria.component';

describe('VirtualCafeteriaComponent', () => {
  let component: VirtualCafeteriaComponent;
  let fixture: ComponentFixture<VirtualCafeteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirtualCafeteriaComponent]
    });
    fixture = TestBed.createComponent(VirtualCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
