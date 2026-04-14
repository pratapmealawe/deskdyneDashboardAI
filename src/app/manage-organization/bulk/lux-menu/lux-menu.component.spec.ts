import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxMenuComponent } from './lux-menu.component';

describe('LuxMenuComponent', () => {
  let component: LuxMenuComponent;
  let fixture: ComponentFixture<LuxMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LuxMenuComponent]
    });
    fixture = TestBed.createComponent(LuxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
