import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletQrMenuComponent } from './outlet-qr-menu.component';

describe('OutletQrMenuComponent', () => {
  let component: OutletQrMenuComponent;
  let fixture: ComponentFixture<OutletQrMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletQrMenuComponent]
    });
    fixture = TestBed.createComponent(OutletQrMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
