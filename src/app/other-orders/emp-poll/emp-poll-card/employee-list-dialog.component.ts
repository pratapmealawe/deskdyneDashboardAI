import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-employee-list-dialog',
    template: `
    <div class="employee-dialog">
      <div class="dialog-header">
        <h2>Employees ({{data?.employeeList?.length || 0}})</h2>
        <button mat-icon-button (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      
      <div class="dialog-content">
        <div class="employee-list">
          <div *ngFor="let emp of data?.employeeList" class="employee-card">
            <div class="employee-avatar">
              {{emp?.employeeName?.charAt(0) || 'U'}}
            </div>
            <div class="employee-info">
              <div class="employee-header">
                <span class="employee-name">{{emp?.employeeName || 'N/A'}}</span>
                <span class="item-badge">{{emp?.deliveredItem}}</span>
              </div>
              <div class="employee-contacts">
                <span class="contact-item">
                  <mat-icon>email</mat-icon>
                  {{emp?.employeeEmail || 'N/A'}}
                </span>
                <span class="divider">|</span>
                <span class="contact-item">
                  <mat-icon>phone</mat-icon>
                  {{emp?.employeePhoneNo || 'N/A'}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .employee-dialog {
      min-width: 450px;
      max-width: 600px;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e9ecef;

      h2 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #334155;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .dialog-content {
      padding: 1.5rem;
      max-height: 60vh;
      overflow-y: auto;
      background: #f8f9fa;
    }

    .employee-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .employee-card {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .employee-avatar {
      width: 45px;
      height: 45px;
      min-width: 45px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FF9800, #F57C00);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
    }

    .employee-info {
      flex: 1;
      overflow: hidden;
    }

    .employee-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
      gap: 0.5rem;
    }

    .employee-name {
      font-weight: 600;
      color: #1e293b;
      font-size: 0.95rem;
    }

    .item-badge {
      padding: 0.25rem 0.75rem;
      background: #dcfce7;
      color: #16a34a;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .employee-contacts {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: #64748b;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }
    }

    .divider {
      opacity: 0.4;
    }

    @media (max-width: 600px) {
      .employee-dialog {
        min-width: 100%;
      }

      .employee-contacts {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }

      .divider {
        display: none;
      }
    }
  `]
})
export class EmployeeListDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<EmployeeListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    close(): void {
        this.dialogRef.close();
    }
}
