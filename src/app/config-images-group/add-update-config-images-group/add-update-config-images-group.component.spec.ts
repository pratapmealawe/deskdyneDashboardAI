import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateConfigImagesGroupComponent } from './add-update-config-images-group.component';

describe('AddUpdateConfigImagesGroupComponent', () => {
  let component: AddUpdateConfigImagesGroupComponent;
  let fixture: ComponentFixture<AddUpdateConfigImagesGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateConfigImagesGroupComponent]
    });
    fixture = TestBed.createComponent(AddUpdateConfigImagesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
