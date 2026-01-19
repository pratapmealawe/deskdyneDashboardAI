import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  private _event: any[] = [];
  searchText: string = '';

  @Input()
  get event(): any[] {
    return this._event;
  }

  set event(value: any[]) {
    this._event = value ?? [];
    this.eventUpdated = this._event;
  }
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;
  eventInfo: any;
  pageSize: number = 10;
  pageIndex: number = 0;
  eventUpdated: any[] = [];

  constructor(private policyService: PolicyService, private apiMainService: ApiMainService, private confirmationModalService: ConfirmationModalService, private toaster: ToasterService) { }
  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.eventUpdated = this.event;
  }

  showPopup(event: any) {
    this.eventInfo = event;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${this.eventInfo.eventPopupName}?`,
      callback: this.deleteOutletFunc,
      context: this
    });
  }

  async deleteOutletFunc() {
    try {
      const res = await this.apiMainService.deletePopupOutlet(this.eventInfo?._id);
      this.toaster.success("Successfully Deleted Event....!")
      this.refresh.emit();
    } catch (err: any) {
      console.log(err);
    }
  }

  vieworg(org: any) {
    this.view.emit(org);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
    this.updatePage();
  }

  updatePage() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.eventUpdated = this.event.slice(start, end)
  }

}
