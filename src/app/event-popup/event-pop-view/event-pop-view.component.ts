import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PermissionsService } from '@service/permission.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { EventPopDetailsComponent } from './event-pop-details/event-pop-details.component';
import { EventPopMenuComponent } from './event-pop-menu/event-pop-menu.component';
import { EventPopOrdersComponent } from './event-pop-orders/event-pop-orders.component';
import { EventPopFeedbackComponent } from './event-pop-feedback/event-pop-feedback.component';

@Component({
  selector: 'app-event-pop-view',
  templateUrl: './event-pop-view.component.html',
  styleUrls: ['./event-pop-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    EventPopDetailsComponent,
    EventPopMenuComponent,
    EventPopOrdersComponent,
    EventPopFeedbackComponent
  ]
})
export class EventPopViewComponent implements OnInit {
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

  constructor(private permissionsService: PermissionsService) { }

  ngOnInit(): void {
    const eventTabMap: { [key: string]: string } = {
      'event-details': 'eventBasicDetails',
      'event-menu': 'eventMenu',
      'event-orders': 'eventOrders',
      'event-feedback': 'eventReviews'
    };

    this.eventViewList = this.eventViewList.filter((item: any) => {
      const policyKey = eventTabMap[item.path];
      if (policyKey && !this.permissionsService.hasPermission(policyKey)) {
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

  getTabIcon(path: string): string {
    const icons: { [key: string]: string } = {
      'event-details': 'info',
      'event-menu': 'restaurant_menu',
      'event-orders': 'receipt_long',
      'event-feedback': 'rate_review'
    };
    return icons[path] || 'tab';
  }
}

