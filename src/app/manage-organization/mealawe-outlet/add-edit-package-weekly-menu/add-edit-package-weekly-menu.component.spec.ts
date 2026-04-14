import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPackageWeeklyMenuComponent } from './add-edit-package-weekly-menu.component';

describe('AddEditPackageWeeklyMenuComponent', () => {
  let component: AddEditPackageWeeklyMenuComponent;
  let fixture: ComponentFixture<AddEditPackageWeeklyMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditPackageWeeklyMenuComponent]
    });
    fixture = TestBed.createComponent(AddEditPackageWeeklyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
