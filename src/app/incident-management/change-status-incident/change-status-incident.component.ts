import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-change-status-incident',
  templateUrl: './change-status-incident.component.html',
  styleUrls: ['./change-status-incident.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule]
})
export class ChangeStatusIncidentComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  adminProfile: any;
  adminList: any[] = [];
  nextStatus: string;
  incident: any;
  showSiteUser = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangeStatusIncidentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiMainService,
    private localStorageService: LocalStorageService
  ) {
    this.incident = data.incident;
    this.nextStatus = data.nextStatus;
    this.adminList = data.adminList || [];
    this.adminProfile = this.localStorageService.getCacheData('ADMIN_PROFILE');
  }

  ngOnInit(): void {
    this.showSiteUser = (this.adminProfile?.role === 'ADMIN' && this.nextStatus === 'acknowledged');
    
    this.form = this.fb.group({
      assignedToId: [this.incident.assignedToInfo?.id || '', this.showSiteUser ? [Validators.required] : []],
      remark: ['', Validators.required]
    });
  }

  async submit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    const formValue = this.form.value;
    
    const updatedBy = {
      id: this.adminProfile._id,
      name: this.adminProfile.name,
    };

    let assignedToInfo = this.incident.assignedToInfo;
    if (this.showSiteUser) {
      const selectedAdmin = this.adminList.find(a => a._id === formValue.assignedToId);
      assignedToInfo = {
        id: selectedAdmin._id,
        name: selectedAdmin.name
      };
    } else if (this.adminProfile?.role !== 'ADMIN') {
        assignedToInfo = {
            id: this.adminProfile._id,
            name: this.adminProfile.name
        };
    }

    let history = [
      ...(this.incident.history || []),
      {
        prevStatus: this.incident.status,
        changedByInfo: updatedBy,
        changedToStatus: this.nextStatus,
        remark: formValue.remark,
      }
    ];

    let status = this.nextStatus;
    if (this.nextStatus === 'acknowledged') {
      status = 'inReview';
      history.push({
        prevStatus: 'acknowledged',
        changedByInfo: updatedBy,
        changedToStatus: 'inReview',
        remark: 'Auto transition to inReview',
      });
    }

    const dataObj: any = {
      _id: this.incident._id,
      status,
      history,
      assignedToInfo,
      remark: formValue.remark
    };

    try {
      await this.api.updateIncident(dataObj);
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error updating incident status:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
