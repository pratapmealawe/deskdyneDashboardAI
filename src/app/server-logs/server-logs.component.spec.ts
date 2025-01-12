import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerLogsComponent } from './server-logs.component';

describe('ServerLogsComponent', () => {
  let component: ServerLogsComponent;
  let fixture: ComponentFixture<ServerLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerLogsComponent]
    });
    fixture = TestBed.createComponent(ServerLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
