import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSelectCafeteriaComponent } from './bulk-select-cafeteria.component';

describe('BulkSelectCafeteriaComponent', () => {
  let component: BulkSelectCafeteriaComponent;
  let fixture: ComponentFixture<BulkSelectCafeteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BulkSelectCafeteriaComponent]
    });
    fixture = TestBed.createComponent(BulkSelectCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
