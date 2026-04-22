import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '@service/toaster.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';

@Component({
  selector: 'app-manage-module-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-module-dialog.component.html',
  styleUrls: ['./manage-module-dialog.component.scss']
})
export class ManageModuleDialogComponent implements OnInit {
  permissionForm: FormGroup;
  isSubmitting = false;
  isEditMode = false;

  // Custom key management state
  currentPermissions: any[] = [];
  newKeyName: string = '';
  isAddingKey = false;
  hasChanges = false;

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    private confirmationModalService: ConfirmationModalService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ManageModuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { resource?: string, permissions?: any[] }
  ) {
    this.isEditMode = !!data?.resource;

    if (this.isEditMode) {
      this.currentPermissions = [...(data?.permissions || [])].sort((a, b) => a.action.localeCompare(b.action));
    } else {
      // Default keys for new module
      const defaults = ['read', 'create', 'update', 'delete', 'manage', 'export'];
      this.currentPermissions = defaults.map(action => ({ action, isNew: true }));
    }

    this.permissionForm = this.fb.group({
      newResourceName: [
        { value: data?.resource || '', disabled: this.isEditMode },
        [Validators.required, Validators.pattern(/^[a-z0-9_-]+$/)]
      ],
      description: ['']
    });
  }

  ngOnInit(): void { }

  async addKey() {
    const action = this.newKeyName.toLowerCase().trim();
    if (!action) return;

    if (this.currentPermissions.some(p => p.action === action)) {
      this.toasterService.warning(`Key "${action}" already exists.`);
      return;
    }

    // Add locally
    const resourceName = this.permissionForm.getRawValue().newResourceName;
    this.currentPermissions = [...this.currentPermissions, {
      resource: this.isEditMode ? this.data.resource : resourceName,
      action,
      isNew: true
    }].sort((a, b) => a.action.localeCompare(b.action));

    this.newKeyName = '';
    this.hasChanges = true;
    this.cdr.detectChanges();
  }

  removeKey(p: any) {
    this.currentPermissions = this.currentPermissions.filter(perm => perm.action !== p.action);
    this.hasChanges = true;
    this.cdr.detectChanges();
  }

  async onSave() {
    if (this.permissionForm.invalid) return;

    this.isSubmitting = true;
    const formValues = this.permissionForm.getRawValue();
    try {
      if (this.isEditMode) {
        await this.apiMainService.updateResource(this.data.resource!, { ...formValues, permissions: this.currentPermissions });
        this.toasterService.success('Module updated successfully');
      } else {
        await this.apiMainService.createResource(formValues.newResourceName, formValues.description, this.currentPermissions);
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
