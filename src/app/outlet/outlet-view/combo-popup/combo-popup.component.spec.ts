import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboPopupComponent } from './combo-popup.component';

describe('ComboPopupComponent', () => {
  let component: ComboPopupComponent;
  let fixture: ComponentFixture<ComboPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComboPopupComponent]
    });
    fixture = TestBed.createComponent(ComboPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
