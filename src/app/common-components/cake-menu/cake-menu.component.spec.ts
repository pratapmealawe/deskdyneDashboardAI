import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeMenuComponent } from './cake-menu.component';

describe('CakeMenuComponent', () => {
  let component: CakeMenuComponent;
  let fixture: ComponentFixture<CakeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CakeMenuComponent]
    });
    fixture = TestBed.createComponent(CakeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
