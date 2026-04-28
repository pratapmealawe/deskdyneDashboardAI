import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualCafeteriaEmployeeListingComponent } from './virtual-cafeteria-employee-listing.component';

describe('VirtualCafeteriaEmployeeListingComponent', () => {
  let component: VirtualCafeteriaEmployeeListingComponent;
  let fixture: ComponentFixture<VirtualCafeteriaEmployeeListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirtualCafeteriaEmployeeListingComponent]
    });
    fixture = TestBed.createComponent(VirtualCafeteriaEmployeeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
