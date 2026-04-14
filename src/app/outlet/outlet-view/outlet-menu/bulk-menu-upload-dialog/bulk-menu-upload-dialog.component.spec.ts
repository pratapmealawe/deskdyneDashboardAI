import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMenuUploadDialogComponent } from './bulk-menu-upload-dialog.component';

describe('BulkMenuUploadDialogComponent', () => {
  let component: BulkMenuUploadDialogComponent;
  let fixture: ComponentFixture<BulkMenuUploadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkMenuUploadDialogComponent]
    });
    fixture = TestBed.createComponent(BulkMenuUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
