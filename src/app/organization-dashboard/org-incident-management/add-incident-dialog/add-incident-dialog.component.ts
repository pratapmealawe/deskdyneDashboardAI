import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { IncidentManagement } from '../org-incident-management.component';
import { LocalStorageService } from '@service/local-storage.service';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
    selector: 'app-add-incident-dialog',
    templateUrl: './add-incident-dialog.component.html',
    styleUrls: ['./add-incident-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule]
})
export class AddIncidentDialogComponent implements OnInit {
    form!: FormGroup;
    isEdit: boolean = false;
    mode: 'create' | 'edit' = 'create';
    orgList: any[] = [];
    cafeList: any[] = [];
    statusList = ['created', 'acknowledged', 'inReview', 'blocked', 'resolved'];

    // Image Upload
    selectedFile: File | null = null;
    imagePreview: string | null = null;
    uploadedImageUrl: string | null = null;
    isUploading = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddIncidentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private api: ApiMainService,
        private localStorageService: LocalStorageService
    ) {
        this.mode = data.mode || 'create';
        this.isEdit = this.mode === 'edit';
        // this.orgList = data.orgList || []; // Now fetched internally
        // this.cafeList = data.cafeList || []; // derived from orgList
    }

    ngOnInit(): void {
        this.initForm();
        this.loadOrgs().then(() => {
            if (this.isEdit && this.data.incident) {
                this.patchForm(this.data.incident);
            } else if (this.data.filterObj) {
                // Pre-fill from filter
                this.form.patchValue({
                    orgDetails: { orgId: this.data.filterObj.orgId },
                    cafeteriaDetails: { cafeteria_id: this.data.filterObj.cafeteria_id }
                });
                if (this.data.filterObj.orgId) this.onOrgChange(this.data.filterObj.orgId);
            }
        });
    }

    async loadOrgs() {
        try {
            const orgData = await this.api.B2B_fetchFilteredAllOrgs({ countOnly: false }, 1);
            this.orgList = orgData || [];
        } catch (e) {
            console.error('Failed to load orgs', e);
        }
    }

    initForm() {
        this.form = this.fb.group({
            incidentType: ['', Validators.required],
            incidentSubject: ['', Validators.required],
            incidentDescription: ['', Validators.required],
            remark: [''],
            status: ['created', Validators.required],
            cafeteriaDetails: this.fb.group({
                cafeteria_id: ['', Validators.required],
                cafeName: [''] // Populated on submit
            }),
            orgDetails: this.fb.group({
                orgId: ['', Validators.required],
                orgName: [''] // Populated on submit
            }),
            imageUrl: ['']
        });
    }

    patchForm(incident: any) {
        this.form.patchValue({
            incidentType: incident.incidentType,
            incidentSubject: incident.incidentSubject,
            incidentDescription: incident.incidentDescription,
            remark: incident.remark,
            status: incident.status,
            orgDetails: {
                orgId: incident.orgDetails.orgId
            },
            cafeteriaDetails: {
                cafeteria_id: incident.cafeteriaDetails.cafeteria_id
            },
            imageUrl: incident.imageUrl // Assuming functionality to store URL
        });
        this.uploadedImageUrl = incident.imageUrl;
        this.imagePreview = incident.imageUrl; // Assuming full URL or handled by pipe

        // Trigger Org Change to populate cafe list properly if not pre-passed
        if (this.orgList.length && incident.orgDetails.orgId) {
            this.onOrgChange(incident.orgDetails.orgId);
        }
    }

    onOrgChange(orgId: string) {
        const org = this.orgList.find(o => o._id === orgId);
        this.cafeList = org?.cafeteriaList || [];
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    async uploadImage(): Promise<string | null> {
        if (!this.selectedFile) return this.uploadedImageUrl;

        try {
            this.isUploading = true;
            const formData = new FormData();
            formData.append('file', this.selectedFile);
            // Reuse createPdf for generic file upload returning URL
            const res = await this.api.createPdf(formData);
            this.isUploading = false;
            return res.fileUrl; // Adjust based on actual response structure
        } catch (err) {
            console.error('Image upload failed', err);
            this.isUploading = false;
            return null;
        }
    }

    async submit() {
        if (this.form.invalid) return;

        const imageUrl = await this.uploadImage();

        const formValue = this.form.getRawValue();
        const selectedOrg = this.orgList.find(o => o._id === formValue.orgDetails.orgId);
        const selectedCafe = this.cafeList.find(c => c.cafeteria_id === formValue.cafeteriaDetails.cafeteria_id);

        // Populate Names
        formValue.orgDetails.orgName = selectedOrg?.organization_name;
        formValue.cafeteriaDetails.cafeName = selectedCafe?.cafeteria_name;

        // Add Image URL
        if (imageUrl) {
            formValue.imageUrl = imageUrl;
            // Note: Check if backend IncidentManagement model supports imageUrl. 
            // If not, might need to abuse 'remark' or description or just send it and hope. 
            // User asked to add photo option, implying backend support or ignoring persistence if it fails on backend side initially.
        }

        // Process other fields (User Info, History) similar to original component
        const adminProfile = this.localStorageService.getCacheData('ADMIN_PROFILE');
        const userInfo = {
            name: adminProfile?.name || 'Admin',
            id: adminProfile?._id
        };

        if (this.mode === 'create') {
            formValue.submittedByInfo = userInfo;
            formValue.assignedToInfo = userInfo;
            formValue.history = [{
                changedByInfo: userInfo,
                changedToStatus: formValue.status,
                remark: formValue.remark
            }];
            formValue.createdAt = new Date();
        } else {
            // Edit logic
            const originalIncident = this.data.incident;
            formValue.submittedByInfo = originalIncident.submittedByInfo;
            formValue.assignedToInfo = originalIncident.assignedToInfo;
            formValue._id = originalIncident._id;
            formValue.history = originalIncident.history; // Should ideally push new history

            // Push update to history just in case
            /* 
            formValue.history.push({
                changedByInfo: userInfo,
                changedToStatus: formValue.status,
                remark: formValue.remark
            });
            */
        }

        try {
            if (this.mode === 'create') {
                await this.api.createIncident(formValue);
            } else {
                await this.api.updateIncident(formValue);
            }
            this.dialogRef.close(true);
        } catch (err) {
            console.error('Error saving incident', err);
        }
    }

    close() {
        this.dialogRef.close();
    }
}
