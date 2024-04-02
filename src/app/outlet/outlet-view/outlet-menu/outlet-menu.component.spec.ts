import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletMenuComponent } from './outlet-menu.component';

describe('OutletMenuComponent', () => {
  let component: OutletMenuComponent;
  let fixture: ComponentFixture<OutletMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletMenuComponent]
    });
    fixture = TestBed.createComponent(OutletMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
