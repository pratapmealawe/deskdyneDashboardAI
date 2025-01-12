import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss']
})
export class OrganizationCardComponent implements OnInit {
  @Input() organization: any;
  @Output() view:EventEmitter<any> = new EventEmitter<any>();
  
  ngOnInit(): void {
  }

  vieworg(org:any){
    this.view.emit(org);
  }

}
