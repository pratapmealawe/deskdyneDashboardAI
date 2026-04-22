import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigImagesComponent } from './config-images.component';

describe('ConfigImagesComponent', () => {
  let component: ConfigImagesComponent;
  let fixture: ComponentFixture<ConfigImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigImagesComponent]
    });
    fixture = TestBed.createComponent(ConfigImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
