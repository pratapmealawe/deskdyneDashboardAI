import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPackageVirtualCafeteriaComponent } from './add-edit-package-virtual-cafeteria.component';

describe('AddEditPackageVirtualCafeteriaComponent', () => {
  let component: AddEditPackageVirtualCafeteriaComponent;
  let fixture: ComponentFixture<AddEditPackageVirtualCafeteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditPackageVirtualCafeteriaComponent]
    });
    fixture = TestBed.createComponent(AddEditPackageVirtualCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
