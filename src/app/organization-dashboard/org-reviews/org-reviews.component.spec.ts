import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgReviewsComponent } from './org-reviews.component';

describe('OrgReviewsComponent', () => {
  let component: OrgReviewsComponent;
  let fixture: ComponentFixture<OrgReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgReviewsComponent]
    });
    fixture = TestBed.createComponent(OrgReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
