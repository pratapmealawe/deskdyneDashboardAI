import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealaweOutletComponent } from './mealawe-outlet.component';

describe('MealaweOutletComponent', () => {
  let component: MealaweOutletComponent;
  let fixture: ComponentFixture<MealaweOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealaweOutletComponent]
    });
    fixture = TestBed.createComponent(MealaweOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
