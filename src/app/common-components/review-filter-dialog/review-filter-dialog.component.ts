import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

export interface ReviewFilterDialogData {
    filterRating: string;
    hasCommentOnly: boolean;
}

export interface ReviewFilterDialogResult {
    filterRating: string;
    hasCommentOnly: boolean;
}

@Component({
    selector: 'app-review-filter-dialog',
    templateUrl: './review-filter-dialog.component.html',
    styleUrls: ['./review-filter-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule]
})
export class ReviewFilterDialogComponent {
    filterRating: string;
    hasCommentOnly: boolean;

    constructor(
        private dialogRef: MatDialogRef<ReviewFilterDialogComponent, ReviewFilterDialogResult>,
        @Inject(MAT_DIALOG_DATA) public data: ReviewFilterDialogData
    ) {
        this.filterRating = data.filterRating || '';
        this.hasCommentOnly = data.hasCommentOnly || false;
    }

    get activeCount(): number {
        let count = 0;
        if (this.filterRating) count++;
        if (this.hasCommentOnly) count++;
        return count;
    }

    clearAll() {
        this.filterRating = '';
        this.hasCommentOnly = false;
    }

    apply() {
        this.dialogRef.close({
            filterRating: this.filterRating,
            hasCommentOnly: this.hasCommentOnly,
        });
    }

    cancel() {
        this.dialogRef.close();
    }
}
