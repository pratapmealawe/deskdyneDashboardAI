import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletMasterMenuComponent } from './outlet-master-menu.component';

describe('OutletMasterMenuComponent', () => {
  let component: OutletMasterMenuComponent;
  let fixture: ComponentFixture<OutletMasterMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletMasterMenuComponent]
    });
    fixture = TestBed.createComponent(OutletMasterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
