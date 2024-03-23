import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-outlet-card',
  templateUrl: './outlet-card.component.html',
  styleUrls: ['./outlet-card.component.scss']
})
export class OutletCardComponent implements OnInit {
  @Input() outlet: any;
  @Output() view:EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  vieworg(org:any){
    this.view.emit(org);
  }

}
