import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {

  searchObj: any = {
    outletName: '',
    emailID:'',
    phoneNo:''
  };
  page:any = 0;
  outletList: any = [];

  constructor(private apiMainService:ApiMainService, private router:Router){

  }

  ngOnInit(): void {
    
  }

  async searchOutlet(){
    try {
      const res = await this.apiMainService.fetchAllOutlets();
      if(res && res.length>0){
        this.outletList = res;
      }
      console.log(res)
    } catch (error) {
      
    }
  }

  resetForm() {
    this.searchObj = {
      outletName: '',
      emailID:'',
      phoneNo:''
    };
  }

  addOutlet(){
    this.router.navigate(['/outlet/add-outlet'])
  }

}
