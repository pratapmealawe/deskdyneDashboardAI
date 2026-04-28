import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditChecklistComponent } from './add-edit-checklist.component';

describe('AddEditChecklistComponent', () => {
  let component: AddEditChecklistComponent;
  let fixture: ComponentFixture<AddEditChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditChecklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
