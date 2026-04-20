import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEventPopComponent } from '../../add-event-pop/add-event-pop.component';
import { environment } from '@environments/environment';
import { PolicyService } from '@service/policy.service';
import { RuntimeStorageService } from '@service/runtime-storage.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-event-pop-details',
  templateUrl: './event-pop-details.component.html',
  styleUrls: ['./event-pop-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EventPopDetailsComponent implements OnInit {

  @Input() eventObj: any;
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;

  constructor(
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private policyService: PolicyService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  editOrg() {
    const dialogRef = this.dialog.open(AddEventPopComponent, {
      width: '900px',
      maxWidth: '95vw',
      panelClass: 'modern-dialog',
      data: { eventObj: this.eventObj }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Emit refresh if parent needs to know
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return 'E';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
}
