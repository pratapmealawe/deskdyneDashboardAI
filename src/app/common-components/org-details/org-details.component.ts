import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss']
})
export class OrgDetailsComponent implements OnInit {
  @Input() orgObj:any;

  constructor(private runtimeStorageService:RuntimeStorageService, private router:Router){

  }

  ngOnInit(): void {
  }

  editOrg(){
    this.runtimeStorageService.setCacheData('VIEW_ORG', this.orgObj);
    this.router.navigate(['B2B_add_org'])
  }

}
