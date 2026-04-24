import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportOutletMenuComponent } from './import-outlet-menu.component';

describe('ImportOutletMenuComponent', () => {
  let component: ImportOutletMenuComponent;
  let fixture: ComponentFixture<ImportOutletMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImportOutletMenuComponent]
    });
    fixture = TestBed.createComponent(ImportOutletMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
