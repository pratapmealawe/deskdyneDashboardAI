import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgEmployeeListComponent } from './org-employee-list.component';

describe('OrgEmployeeListComponent', () => {
  let component: OrgEmployeeListComponent;
  let fixture: ComponentFixture<OrgEmployeeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgEmployeeListComponent]
    });
    fixture = TestBed.createComponent(OrgEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
