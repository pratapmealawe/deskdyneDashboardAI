import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
    selector: 'app-add-audit-report-dialog',
    templateUrl: './add-audit-report-dialog.component.html',
    styleUrls: ['./add-audit-report-dialog.component.scss']
})
export class AddAuditReportDialogComponent implements OnInit {
    form: FormGroup;
    orgList: any[] = [];
    reportData: any;
    cafeList: any[] = [];
    selectedFile: File | null = null;
    selectedFileName: string = '';
    loading = false;
    mode: 'create' | 'edit' = 'create';

    constructor(
        private fb: FormBuilder,
        private api: ApiMainService,
        private localStorage: LocalStorageService,
        private dialogRef: MatDialogRef<AddAuditReportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.orgList = data.orgList || [];
        this.reportData = data.report;
        this.mode = data.mode || 'create';

        this.form = this.fb.group({
            orgId: ['', Validators.required],
            cafeteriaId: ['', Validators.required],
            uploadedDate: [new Date(), Validators.required],
        });
    }

    ngOnInit(): void {
        if (this.mode === 'edit' && this.reportData) {
            this.form.patchValue({
                orgId: this.reportData.orgId,
                uploadedDate: this.reportData.uploadedDate
            });
            // Trigger org change to load cafes, then set cafeteria
            this.onOrgChange(this.reportData.orgId);
            this.form.patchValue({ cafeteriaId: this.reportData.cafeteriaId });
            this.selectedFileName = this.reportData.uploadedUrl ? 'Existing File' : '';
        }
    }

    onOrgChange(orgId: string) {
        const org = this.orgList.find(o => o._id === orgId);
        this.cafeList = org?.cafeteriaList || [];
        this.form.get('cafeteriaId')?.setValue('');
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                alert('Only PDF files are allowed.');
                return;
            }
            this.selectedFile = file;
            this.selectedFileName = file.name;
        }
    }

    async submit() {
        if (this.form.invalid) return;
        if (this.mode === 'create' && !this.selectedFile) {
            alert('Please select a file.');
            return;
        }

        this.loading = true;
        try {
            let uploadedUrl = this.reportData?.uploadedUrl;

            // 1. Upload File if selected
            if (this.selectedFile) {
                const formData = new FormData();
                formData.append('file', this.selectedFile, this.selectedFile.name);
                const fileDetails = await this.api.createPdf(formData);
                uploadedUrl = fileDetails.fileUrl;
            }

            // 2. Prepare Payload
            const org = this.orgList.find(o => o._id === this.form.value.orgId);
            const cafe = this.cafeList.find(c => c.cafeteria_id === this.form.value.cafeteriaId);
            const adminProfile = this.localStorage.getCacheData('ADMIN_PROFILE');

            const payload = {
                orgId: org._id,
                orgName: org.organization_name,
                cafeteriaId: cafe.cafeteria_id,
                cafeteriaName: cafe.cafeteria_name,
                uploadedDate: this.form.value.uploadedDate,
                uploadedUrl: uploadedUrl,
                uploadedByName: adminProfile ? `${adminProfile.name}` : 'Admin',
                uploadedById: adminProfile ? adminProfile._id : null
            };

            // 3. Create or Update
            if (this.mode === 'create') {
                await this.api.createAuditReport(payload);
            } else {
                await this.api.updateAuditReport(this.reportData._id, payload);
            }

            this.dialogRef.close(true);
        } catch (err) {
            console.error('Error submitting report:', err);
        } finally {
            this.loading = false;
        }
    }

    close() {
        this.dialogRef.close(false);
    }
}
