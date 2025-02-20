import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PdfuploadComponent } from '../pdfupload/pdfupload.component';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss'],
})
export class OrganizationViewComponent implements OnInit {
  @Input() organization: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  showBulkMenuSection:any = false;

  orgViewList = [{ name: 'Org Details', path: 'orgDetails' },
  { name: 'Bulk Menu Section', path: 'bulkMenuSection' },
  { name: 'MealAwe Outlet', path: 'mealAweOutlet' },
  { name: 'B2B Weekly Menu', path: 'b2bWeeklyMenu' },
  { name: 'Employee List', path: 'employeeList' },
  { name:'Guest Employee List', path:'guestEmployeeList'},
  { name: 'Complience', path: 'organization-compliance' },
  ];
  oldList:any = [];
  bulkObj = [{ name: 'Bulk Meals Menu', path: 'bulkMealsMenu' },
    { name: 'Individual Meals Menu', path: 'individualMealsMenu' },
    { name: 'Bulk Snacks Menu', path: 'bulkSnacksMenu' },
    { name: 'Individual Snacks Menu', path: 'individualSnacksMenu' },
    { name: 'Pre Defined Snack Box Menu', path: 'predefinedSnackBoxMenu' },
    { name: 'Customized Snack Box Menu', path: 'customizedSnackBoxMenu' },]
  selectedTab = 'orgDetails';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.oldList = [...this.orgViewList];
  }

  gotToTab(tab: string) {
    if(tab === 'bulkMenuSection'){
      this.showBulkMenuSection = !this.showBulkMenuSection;
      if(this.showBulkMenuSection){
        this.orgViewList = [...this.orgViewList,...this.bulkObj];
        this.selectedTab = 'bulkMealsMenu';
        return;
      }
      this.orgViewList = this.oldList;
      this.selectedTab = 'orgDetails';
      return;
    }
    this.selectedTab = tab;
  }

  goBack() {
    this.back.emit(true);
  }

}
