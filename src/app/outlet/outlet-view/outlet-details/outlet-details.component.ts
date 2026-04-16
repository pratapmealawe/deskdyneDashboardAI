import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderstatusService } from 'src/app/main-loader/loaderstatus.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOutletComponent } from '../../add-outlet/add-outlet.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-outlet-details',
  templateUrl: './outlet-details.component.html',
  styleUrls: ['./outlet-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class OutletDetailsComponent implements OnInit {
  @Input() outletObj: any;
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;
  loading: boolean = false

  constructor(
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private loadingService: LoaderstatusService,
    private policyService: PolicyService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.normalizeHolidays();
  }

  private normalizeHolidays(): void {
    if (!this.outletObj) return;

    const normalize = (h: any) => {
      if (!h) return null;
      const dateStr = h.date || h;
      const nameStr = h.name || 'Holiday';
      return { date: dateStr, name: nameStr };
    };

    if (this.outletObj.holidays && Array.isArray(this.outletObj.holidays)) {
      this.outletObj.holidays = this.outletObj.holidays.map(normalize).filter((h: any) => h !== null);
    }

    if (this.outletObj.preOrderConfig?.holidays && Array.isArray(this.outletObj.preOrderConfig.holidays)) {
      this.outletObj.preOrderConfig.holidays = this.outletObj.preOrderConfig.holidays.map(normalize).filter((h: any) => h !== null);
    }
  }

  editOrg() {
    const dialogRef = this.dialog.open(AddOutletComponent, {
      width: '90vw',
      maxWidth: '90vw',
      maxHeight: '100vh',
      data: this.outletObj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle refresh if needed, although usually parent might handle it
        // For now, closing the dialog with true indicates success
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return 'O';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }

  getMealIcon(mealType: string): string {
    const type = (mealType || '').toLowerCase();
    const icons: { [key: string]: string } = {
      'breakfast': 'free_breakfast',
      'lunch': 'lunch_dining',
      'dinner': 'dinner_dining',
      'snacks': 'local_cafe',
      'high tea': 'restaurant',
      'brunch': 'brunch_dining'
    };
    return icons[type] || 'restaurant';
  }

  getSubsidyLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'free': 'Organization Full Paid',
      'subsidized': 'Full Paid by Employee Salary',
      'chargeable': 'Normal'
    };
    return labels[type] || (type ? type.charAt(0).toUpperCase() + type.slice(1) : '-');
  }
}
