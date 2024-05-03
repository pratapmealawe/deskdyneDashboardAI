import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVersionControlComponent } from './app-version-control.component';

describe('AppVersionControlComponent', () => {
  let component: AppVersionControlComponent;
  let fixture: ComponentFixture<AppVersionControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppVersionControlComponent]
    });
    fixture = TestBed.createComponent(AppVersionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
