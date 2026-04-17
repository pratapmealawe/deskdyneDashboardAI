import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigImagesGroupComponent } from './config-images-group.component';

describe('ConfigImagesGroupComponent', () => {
  let component: ConfigImagesGroupComponent;
  let fixture: ComponentFixture<ConfigImagesGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigImagesGroupComponent]
    });
    fixture = TestBed.createComponent(ConfigImagesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
