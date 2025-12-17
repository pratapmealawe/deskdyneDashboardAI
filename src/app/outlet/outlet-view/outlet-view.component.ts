import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-outlet-view',
  templateUrl: './outlet-view.component.html',
  styleUrls: ['./outlet-view.component.scss'],
})
export class OutletViewComponent implements OnInit {
  @Input() outlet: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  selectedtab:number = 0 ; 
  outletViewList = [
    { name: 'Basic Details', path: 'outlet-details' },
    { name: 'Menu', path: 'outlet-menu' },
    { name: 'QR Menu', path: 'qr-menu' },
    { name: 'Outlet Orders', path: 'outlet-orders' },
    { name: 'Reviews', path: 'outlet-feedback' },
  ];
  selectedTab = 'outlet-details';
  updateval: any = false;

  constructor(private router: Router, private sendDataToComponent: SendDataToComponent) { }

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
    this.outlet = event;
  }

  onTabChange(event:MatTabChangeEvent){
     const selectedIndex = this.outletViewList[event.index];
     this.gotToTab(selectedIndex.path);
  }
}
