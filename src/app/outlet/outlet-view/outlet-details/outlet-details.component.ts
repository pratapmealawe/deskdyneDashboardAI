import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-outlet-details',
  templateUrl: './outlet-details.component.html',
  styleUrls: ['./outlet-details.component.scss']
})
export class OutletDetailsComponent implements OnInit {
  @Input() outletObj:any;

  constructor(private router:Router, private runtimeStorageService:RuntimeStorageService){

  }

  ngOnInit(): void {
    
  }

  editOrg(){
    this.runtimeStorageService.setCacheData('OUTLET_EDIT',this.outletObj);
    this.router.navigate(['/outlet/add-outlet']);
  }

}
