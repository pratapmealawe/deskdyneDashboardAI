import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 admin: any
  
  constructor(private router: Router, private apiMainService: ApiMainService, private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService, private utilityService: UtilityService, private offcanvasService: NgbOffcanvas){
     
    }
  
  ngOnInit(): void {
    // this.admin =  this.localStorageService.getCacheData('ADMIN_PROFILE') ;
    
    // if(this.admin?.role === "ADMIN") {
    //   this.router.navigate(["/dashboard"])
    // } else {
    //   this.router.navigate(["/orgDashboard"])
    // }
  }

  

}
