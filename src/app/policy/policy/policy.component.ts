import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  policyArr: any[] = [];
  filteredPolicyArr: any[] = [];
  // only search filter needed
  searchControl = new FormControl<string>('');

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService,
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
      console.log(error);
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
    // new policy => clear VIEW_POLICY
    this.runtimeStorageService.setCacheData('VIEW_POLICY', null);
    this.router.navigate(['/app/addPolicy']);
  }

  editPolicy(id: any): void {
    this.runtimeStorageService.setCacheData('VIEW_POLICY', id);
    this.router.navigate(['/app/addPolicy']);
  }

  async deletePolicy(id: any): Promise<void> {
    try {
      await this.apiMainService.deletePolicy(id);
      await this.getAllPolicy();
    } catch (error) {
      console.log(error);
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
      console.log('error while Deleting Policy ', e);
    }
  }
}
