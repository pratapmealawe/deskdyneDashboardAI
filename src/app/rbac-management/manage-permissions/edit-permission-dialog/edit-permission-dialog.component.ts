import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '@service/toaster.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';

@Component({
  selector: 'app-edit-permission-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-permission-dialog.component.html',
  styleUrls: ['./edit-permission-dialog.component.scss']
})
export class EditPermissionDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiMainService = inject(ApiMainService);
  private toasterService = inject(ToasterService);
  private confirmationModalService = inject(ConfirmationModalService);

  permissionForm: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  
  // Custom key management state
  currentPermissions: any[] = [];
  newKeyName: string = '';
  isAddingKey = false;
  hasChanges = false;

  constructor(
    public dialogRef: MatDialogRef<EditPermissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { resource?: string, permissions?: any[] }
  ) {
    this.isEditMode = !!data?.resource;
    this.currentPermissions = [...(data?.permissions || [])].sort((a, b) => a.action.localeCompare(b.action));
    
    this.permissionForm = this.fb.group({
      newResourceName: [data?.resource || '', [Validators.required, Validators.pattern(/^[a-z0-9_-]+$/)]],
      description: ['']
    });
  }

  ngOnInit(): void {}

  async addKey() {
    if (!this.isEditMode) return;
    const action = this.newKeyName.toLowerCase().trim();
    if (!action) return;

    if (this.currentPermissions.some(p => p.action === action)) {
      this.toasterService.warning(`Key "${action}" already exists in this module.`);
      return;
    }

    this.isAddingKey = true;
    try {
      await this.apiMainService.addPermissionKey(this.data.resource!, action);
      this.toasterService.success(`Key "${action}" added successfully`);
      this.newKeyName = '';
      this.hasChanges = true;
      await this.refreshPermissions();
    } catch (error) {
      console.error('Error adding key:', error);
      this.toasterService.error('Failed to add key');
    } finally {
      this.isAddingKey = false;
    }
  }

  async removeKey(p: any) {
    if (!this.isEditMode) return;
    this.confirmationModalService.modal({
      msg: `Remove permission key "${this.data.resource}:${p.action}"? This may impact existing roles.`,
      context: this,
      callback: async () => {
        try {
          await this.apiMainService.deletePermissionKey(p._id);
          this.toasterService.success('Key removed successfully');
          this.hasChanges = true;
          await this.refreshPermissions();
        } catch (error) {
          console.error('Error deleting key:', error);
          this.toasterService.error('Failed to remove key');
        }
      }
    });
  }

  async refreshPermissions() {
    if (!this.isEditMode) return;
    try {
      const allData = await this.apiMainService.getAllPermissions() as any[];
      this.currentPermissions = allData
        .filter(p => p.resource === this.data.resource)
        .sort((a, b) => a.action.localeCompare(b.action));
    } catch (error) {
      console.error('Error refreshing permissions:', error);
    }
  }

  async onSave() {
    if (this.permissionForm.invalid) return;

    this.isSubmitting = true;
    try {
      if (this.isEditMode) {
        await this.apiMainService.updateResource(
          this.data.resource!, 
          this.permissionForm.value
        );
        this.toasterService.success('Module updated successfully');
      } else {
        await this.apiMainService.createResource(this.permissionForm.value.newResourceName);
        this.toasterService.success('Module created successfully');
      }
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error saving resource:', error);
      this.toasterService.error(`Failed to ${this.isEditMode ? 'update' : 'create'} module`);
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close(this.hasChanges);
  }
}
