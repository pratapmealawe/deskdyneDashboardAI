import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
})
export class OrgDetailsComponent implements OnInit {
  @Input() orgObj: any;
  btnPolicy: any;

  constructor(
    private runtimeStorageService: RuntimeStorageService,
    private router: Router,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    console.log(this.orgObj);
    
  }

  editOrg() {
    this.runtimeStorageService.setCacheData('VIEW_ORG', this.orgObj);
    this.router.navigate(['b2bAddorg']);
  }
}
