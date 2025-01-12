import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit{
  showSearchSection:boolean = true;
  searchObj: any = {
    outletName: '',
    emailID:'',
    phoneNo:''
  };
  page:any = 0;
  outletList: any = [];
  selectedOutlet:any;

  constructor(private apiMainService:ApiMainService, private router:Router, private sendDataToComponent: SendDataToComponent,){
  }

  ngOnInit(): void {
    this.searchOutlet();
  }

  async searchOutlet(){
    try {
        this.outletList = await this.apiMainService.searchOutlet(this.searchObj);
     
      // if(res && res.length>0){
      //   this.outletList = res;
      // }
      // console.log(res)
    } catch (error) {
      console.log('seachOutlet',error)
    }
  }

  resetForm() {
    this.searchObj = {
      outletName: '',
      emailID:'',
      phoneNo:''
    };
  }

  viewOutlet(val:any){
    this.showSearchSection = false;
    this.selectedOutlet = val;
    console.log(val)
  }

  addOutlet(){
    this.router.navigate(['/outlet/add-outlet'])
  }

  toggleShowOrder(val: any) {
    this.showSearchSection = val
    if(val.val){
       this.showSearchSection = val.val;
      }else{
         this.showSearchSection = val;
      }
      console.log(val)
      if(val.updateval){
        this.searchOutlet();
      }
  }

}
