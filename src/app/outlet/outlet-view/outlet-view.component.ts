import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  outletViewList = [
    { name: 'Basic Details', path: 'outlet-details' },
    { name: 'Categories', path: 'outlet-categories' },
    { name: 'Menu', path: 'outlet-menu' },
    { name: 'Past Orders', path: 'outlet-orders' },
    { name: 'Reviews', path: 'outlet-feedback' },
    { name: 'Vendor', path: 'outlet-vendor' },
    // { name: 'Complience', path: 'outlet-compliance' },
  ];
  selectedTab = 'outlet-details';
  updateval: any = false;

  constructor(private router: Router,    private sendDataToComponent:SendDataToComponent
) {}

  ngOnInit(): void {
       this.sendDataToComponent.subscribe('MASTER_MENU_LIST',(data:any)=>{

      console.log(data);
      
    })
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
}
