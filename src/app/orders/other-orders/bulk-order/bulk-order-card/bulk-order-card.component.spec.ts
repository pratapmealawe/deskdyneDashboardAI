import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOrderCardComponent } from './bulk-order-card.component';

describe('BulkOrderCardComponent', () => {
  let component: BulkOrderCardComponent;
  let fixture: ComponentFixture<BulkOrderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkOrderCardComponent]
    });
    fixture = TestBed.createComponent(BulkOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
