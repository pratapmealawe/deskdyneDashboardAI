import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() userDetails: any
  imageUrl = '';


  ngOnInit(): void {
    console.log(this.userDetails);
    
  }

}
