import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-outlet-card',
  templateUrl: './outlet-card.component.html',
  styleUrls: ['./outlet-card.component.scss'],
})
export class OutletCardComponent implements OnInit {
private _outlet: any[] = [];
searchText:string =''

@Input()
get outlet(): any[] {
  return this._outlet;
}

set outlet(value: any[]) {
  this._outlet = value ?? [];
  this.outletUpdated = this._outlet;
}

  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;
  filteredMenuList: any;
  outletInfo:any
  pageSize :number = 5
  pageIndex:number = 0
  outletUpdated:any[]=[]

  constructor(private policyService: PolicyService, private apiMainService: ApiMainService, private confirmationModalService: ConfirmationModalService, private toaster: ToasterService) { }
  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.outletUpdated = this.outlet;
  }

  showPopup(outlet: any) {
    this.outletInfo = outlet;
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${this.outletInfo.outletName}?`,
      this.deleteOutletFunc,
      this
    );
  }

 async deleteOutletFunc() {
    try {
      const res = await this.apiMainService.deleteOutlet(this.outletInfo?._id)
      console.log(res);
      this.toaster.success("Successfully Deleted Outlet....!")
    } catch(err: any) {
      console.log(err);
    }
  }

  vieworg(org: any) {
    this.view.emit(org);
  }

  onPageChange(event:PageEvent){
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
    this.updatePage();
  }

  updatePage(){
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.outletUpdated = this.outlet.slice(start, end)
  }
}
