import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-outlet-card',
  templateUrl: './outlet-card.component.html',
  styleUrls: ['./outlet-card.component.scss'],
})
export class OutletCardComponent implements OnInit, OnChanges {
  @Input() outlet: any;
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;
  filteredMenuList: any;
  outletInfo:any

  constructor(private policyService: PolicyService, private apiMainService: ApiMainService, private confirmationModalService: ConfirmationModalService, private toaster: ToasterService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.outlet);

  }
  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();

    this.filteredMenuList = [...this.outlet.outletList].sort(
      (a, b) => (a.precedence || 0) - (b.precedence || 0)
    );

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
}
