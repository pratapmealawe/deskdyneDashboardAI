import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletViewComponent } from './outlet-view.component';

describe('OutletViewComponent', () => {
  let component: OutletViewComponent;
  let fixture: ComponentFixture<OutletViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletViewComponent]
    });
    fixture = TestBed.createComponent(OutletViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
