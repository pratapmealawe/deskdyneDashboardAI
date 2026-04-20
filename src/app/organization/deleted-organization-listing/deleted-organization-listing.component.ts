import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-deleted-organization-listing',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: './deleted-organization-listing.component.html',
    styleUrls: ['./deleted-organization-listing.component.scss'],
})
export class DeletedOrganizationListingComponent implements OnInit {
    deletedOrgList: any[] = [];
    isLoading: boolean = true;

    constructor(
        public dialogRef: MatDialogRef<DeletedOrganizationListingComponent>,
        private apiMainService: ApiMainService
    ) { }

    ngOnInit() {
        this.fetchDeletedOrgs();
    }

    async fetchDeletedOrgs() {
        this.isLoading = true;
        try {
            const deletedList = await this.apiMainService.getDeletedOrganizations();
            this.deletedOrgList = deletedList || [];
        } catch (error) {
            console.error('Error fetching deleted organizations:', error);
            this.deletedOrgList = [];
        } finally {
            this.isLoading = false;
        }
    }

    async restoreOrg(org: any) {
        try {
            await this.apiMainService.restoreOrganization(org._id);
            this.fetchDeletedOrgs();
        } catch (error) {
            console.error('Error restoring organization:', error);
        }
    }

    getInitials(name: string): string {
        if (!name) return 'O';
        const words = name.trim().split(' ');
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }

    close() {
        this.dialogRef.close();
    }
}
