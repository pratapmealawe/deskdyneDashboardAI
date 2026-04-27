import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToasterService } from '@service/toaster.service';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-event-pop-card',
  templateUrl: './event-pop-card.component.html',
  styleUrls: ['./event-pop-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EventPopCardComponent implements OnInit {
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
  eventInfo: any;
  pageSize: number = 10;
  pageIndex: number = 0;
  eventUpdated: any[] = [];

  constructor(private apiMainService: ApiMainService, private confirmationModalService: ConfirmationModalService, private toaster: ToasterService) { }
  ngOnInit(): void {
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
      const res = await this.apiMainService.deleteEventPopup(this.eventInfo?._id);
      this.toaster.success("Successfully Deleted Event....!")
      this.refresh.emit();
    } catch (err: any) {
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

  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }
}
