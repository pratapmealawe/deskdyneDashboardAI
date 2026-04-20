import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { startWith } from 'rxjs/operators';

import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AddPolicyComponent } from './add-policy/add-policy.component';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AddPolicyComponent
  ]
})
export class PolicyComponent implements OnInit {
  policyArr: any[] = [];
  filteredPolicyArr: any[] = [];
  searchControl = new FormControl<string>('');

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  ngOnInit(): void {
    this.initSearch();
    this.getAllPolicy();
  }

  private initSearch(): void {
    this.searchControl.valueChanges
      .pipe(startWith(this.searchControl.value || ''))
      .subscribe((value) => {
        this.applyFilter(value || '');
      });
  }

  async getAllPolicy(): Promise<void> {
    try {
      const policyArr: any = await this.apiMainService.getAllPolicy();
      if (policyArr && policyArr.length > 0) {
        this.localStorageService.setCacheData('POLICIES', policyArr);
        this.policyArr = policyArr;
      } else {
        this.policyArr = [];
      }
      this.applyFilter(this.searchControl.value || '');
    } catch (error) {
      this.policyArr = [];
      this.applyFilter(this.searchControl.value || '');
    }
  }

  private applyFilter(term: string): void {
    if (!this.policyArr || this.policyArr.length === 0) {
      this.filteredPolicyArr = [];
      return;
    }

    if (!term) {
      this.filteredPolicyArr = [...this.policyArr];
      return;
    }

    const lower = term.toLowerCase();
    this.filteredPolicyArr = this.policyArr.filter((p: any) => {
      const name = (p.policy_name || '').toLowerCase();
      const desc = (p.policy_description || '').toLowerCase();
      return name.includes(lower) || desc.includes(lower);
    });
  }

  addPolicy(): void {
    const dialogRef = this.dialog.open(AddPolicyComponent, {
      width: '1000px',
      panelClass: 'custom-dialog-container',
      data: { id: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllPolicy();
      }
    });
  }

  editPolicy(id: any): void {
    const dialogRef = this.dialog.open(AddPolicyComponent, {
      width: '1000px',
      panelClass: 'custom-dialog-container',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllPolicy();
      }
    });
  }

  async deletePolicy(id: any): Promise<void> {
    try {
      await this.apiMainService.deletePolicy(id);
      await this.getAllPolicy();
    } catch (error) {
    }
  }

  async confirmDelete(id: any): Promise<void> {
    try {
      this.confirmationModalService.modal({
        msg: 'Are you sure you want to delete this Policy?',
        callback: () => this.deletePolicy(id), 
        context: this
      });
    } catch (e) {
    }
  }
}
