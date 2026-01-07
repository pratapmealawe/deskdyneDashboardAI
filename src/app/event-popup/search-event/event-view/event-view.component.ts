import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

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

  constructor() { }

  ngOnInit(): void {
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
