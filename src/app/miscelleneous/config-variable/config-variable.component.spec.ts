import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigVariableComponent } from './config-variable.component';

describe('ConfigVariableComponent', () => {
  let component: ConfigVariableComponent;
  let fixture: ComponentFixture<ConfigVariableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigVariableComponent]
    });
    fixture = TestBed.createComponent(ConfigVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
