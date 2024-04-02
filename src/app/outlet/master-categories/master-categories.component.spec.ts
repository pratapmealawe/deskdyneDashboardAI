import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCategoriesComponent } from './master-categories.component';

describe('MasterCategoriesComponent', () => {
  let component: MasterCategoriesComponent;
  let fixture: ComponentFixture<MasterCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterCategoriesComponent]
    });
    fixture = TestBed.createComponent(MasterCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
