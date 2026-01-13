import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventComponent } from './search-event.component';

describe('SearchEventComponent', () => {
  let component: SearchEventComponent;
  let fixture: ComponentFixture<SearchEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchEventComponent]
    });
    fixture = TestBed.createComponent(SearchEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
