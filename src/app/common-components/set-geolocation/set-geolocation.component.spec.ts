import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetGeolocationComponent } from './set-geolocation.component';

describe('SetGeolocationComponent', () => {
  let component: SetGeolocationComponent;
  let fixture: ComponentFixture<SetGeolocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetGeolocationComponent]
    });
    fixture = TestBed.createComponent(SetGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
