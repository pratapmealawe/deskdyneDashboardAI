import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPackageCategoryComponent } from './add-edit-package-category.component';

describe('AddEditPackageCategoryComponent', () => {
  let component: AddEditPackageCategoryComponent;
  let fixture: ComponentFixture<AddEditPackageCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditPackageCategoryComponent]
    });
    fixture = TestBed.createComponent(AddEditPackageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
