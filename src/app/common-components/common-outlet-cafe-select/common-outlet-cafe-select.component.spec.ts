import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonOutletCafeSelectComponent } from './common-outlet-cafe-select.component';

describe('CommonOutletCafeSelectComponent', () => {
  let component: CommonOutletCafeSelectComponent;
  let fixture: ComponentFixture<CommonOutletCafeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonOutletCafeSelectComponent]
    });
    fixture = TestBed.createComponent(CommonOutletCafeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
