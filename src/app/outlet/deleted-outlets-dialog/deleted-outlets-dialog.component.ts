import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
    selector: 'app-deleted-outlets-dialog',
    templateUrl: './deleted-outlets-dialog.component.html',
    styleUrls: ['./deleted-outlets-dialog.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class DeletedOutletsDialogComponent implements OnInit {
    deletedOutletList: any[] = [];
    isLoading: boolean = true;

    constructor(
        public dialogRef: MatDialogRef<DeletedOutletsDialogComponent>,
        private apiMainService: ApiMainService
    ) { }

    ngOnInit() {
        this.fetchDeletedOutlets();
    }

    async fetchDeletedOutlets() {
        this.isLoading = true;
        try {
            const deletedList = await this.apiMainService.getDeletedOutlets();
            this.deletedOutletList = deletedList || [];
        } catch (error) {
            console.error('Error fetching deleted outlets:', error);
            this.deletedOutletList = [];
        } finally {
            this.isLoading = false;
        }
    }

    async restoreOutlet(outlet: any) {
        try {
            await this.apiMainService.restoreOutlet(outlet._id);
            this.fetchDeletedOutlets();
        } catch (error) {
            console.error('Error restoring outlet:', error);
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
