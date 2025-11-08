import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperpureDashboardComponent } from './hyperpure-dashboard.component';

describe('HyperpureDashboardComponent', () => {
  let component: HyperpureDashboardComponent;
  let fixture: ComponentFixture<HyperpureDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HyperpureDashboardComponent]
    });
    fixture = TestBed.createComponent(HyperpureDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
