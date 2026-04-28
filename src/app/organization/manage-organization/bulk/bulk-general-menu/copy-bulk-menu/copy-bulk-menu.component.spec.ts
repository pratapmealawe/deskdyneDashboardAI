import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyBulkMenuComponent } from './copy-bulk-menu.component';

describe('CopyBulkMenuComponent', () => {
  let component: CopyBulkMenuComponent;
  let fixture: ComponentFixture<CopyBulkMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CopyBulkMenuComponent]
    });
    fixture = TestBed.createComponent(CopyBulkMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
