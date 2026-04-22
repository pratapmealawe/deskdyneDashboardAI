import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVirtualCafeteriaCategoriesWeeklyMenuComponent } from './add-edit-virtual-cafeteria-categories-weekly-menu.component';

describe('AddEditVirtualCafeteriaCategoriesWeeklyMenuComponent', () => {
  let component: AddEditVirtualCafeteriaCategoriesWeeklyMenuComponent;
  let fixture: ComponentFixture<AddEditVirtualCafeteriaCategoriesWeeklyMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditVirtualCafeteriaCategoriesWeeklyMenuComponent]
    });
    fixture = TestBed.createComponent(AddEditVirtualCafeteriaCategoriesWeeklyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
