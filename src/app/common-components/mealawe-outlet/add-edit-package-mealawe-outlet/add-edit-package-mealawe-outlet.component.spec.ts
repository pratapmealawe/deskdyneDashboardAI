import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPackageMealaweOutletComponent } from './add-edit-package-mealawe-outlet.component';

describe('AddEditPackageMealaweOutletComponent', () => {
  let component: AddEditPackageMealaweOutletComponent;
  let fixture: ComponentFixture<AddEditPackageMealaweOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditPackageMealaweOutletComponent]
    });
    fixture = TestBed.createComponent(AddEditPackageMealaweOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
