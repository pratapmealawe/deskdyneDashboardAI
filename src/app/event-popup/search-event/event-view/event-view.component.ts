import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  @Input() event: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  selectedtab: number = 0;
  eventViewList = [
    { name: 'Basic Details', path: 'event-details' },
    { name: 'Menu', path: 'event-menu' },
    { name: 'Event Orders', path: 'event-orders' },
    { name: 'Reviews', path: 'event-feedback' },
  ];
  selectedTab = 'event-details';
  updateval: any = false;
  tabPolicy: any;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.tabPolicy = this.policyService.getCurrentTabPolicy();

    const eventTabMap: { [key: string]: string } = {
      'event-details': 'eventBasicDetails',
      'event-menu': 'eventMenu',
      'event-orders': 'eventOrders',
      'event-feedback': 'eventReviews'
    };

    this.eventViewList = this.eventViewList.filter((item: any) => {
      const policyKey = eventTabMap[item.path];
      if (policyKey && this.tabPolicy[policyKey] === false) {
        return false;
      }
      return true;
    });

    if (this.selectedTab) {
      const foundIndex = this.eventViewList.findIndex(x => x.path === this.selectedTab);
      if (foundIndex === -1 && this.eventViewList.length > 0) {
        this.selectedTab = this.eventViewList[0].path;
        this.selectedtab = 0;
      } else {
        this.selectedtab = foundIndex >= 0 ? foundIndex : 0;
      }
    }
  }

  gotToTab(tab: string) {
    this.selectedTab = tab;
  }

  goBack() {
    this.back.emit({ val: true, updateval: this.updateval });
  }

  updateOutlet(val: any) {
    this.updateval = val;
  }

  receiveData(event: any) {
    this.event = event;
  }

  onTabChange(event: MatTabChangeEvent) {
    const selectedIndex = this.eventViewList[event.index];
    this.gotToTab(selectedIndex.path);
  }
}
