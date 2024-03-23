import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outlet-details',
  templateUrl: './outlet-details.component.html',
  styleUrls: ['./outlet-details.component.scss']
})
export class OutletDetailsComponent implements OnInit {
  @Input() outletObj:any;

  constructor(private router:Router){

  }

  ngOnInit(): void {
    
  }

  editOrg(){
    this.router.navigate(['/outlet-add']);
  }

}
