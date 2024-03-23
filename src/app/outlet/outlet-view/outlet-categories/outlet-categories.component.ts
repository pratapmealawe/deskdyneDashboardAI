import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-outlet-categories',
  templateUrl: './outlet-categories.component.html',
  styleUrls: ['./outlet-categories.component.scss']
})
export class OutletCategoriesComponent {
  @Input() outletObj:any;
}
