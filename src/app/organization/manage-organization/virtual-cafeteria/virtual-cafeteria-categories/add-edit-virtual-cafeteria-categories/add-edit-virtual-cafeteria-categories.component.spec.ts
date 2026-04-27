import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVirtualCafeteriaCategoriesComponent } from './add-edit-virtual-cafeteria-categories.component';

describe('AddEditVirtualCafeteriaCategoriesComponent', () => {
  let component: AddEditVirtualCafeteriaCategoriesComponent;
  let fixture: ComponentFixture<AddEditVirtualCafeteriaCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditVirtualCafeteriaCategoriesComponent]
    });
    fixture = TestBed.createComponent(AddEditVirtualCafeteriaCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
