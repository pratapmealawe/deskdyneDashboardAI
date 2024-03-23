import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletCategoriesComponent } from './outlet-categories.component';

describe('OutletCategoriesComponent', () => {
  let component: OutletCategoriesComponent;
  let fixture: ComponentFixture<OutletCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletCategoriesComponent]
    });
    fixture = TestBed.createComponent(OutletCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
