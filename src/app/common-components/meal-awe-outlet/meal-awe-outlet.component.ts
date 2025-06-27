import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MlApiMainService } from 'src/service/apiService/mlApiMain.service';

@Component({
  selector: 'app-meal-awe-outlet',
  templateUrl: './meal-awe-outlet.component.html',
  styleUrls: ['./meal-awe-outlet.component.scss'],
})
export class MealAweOutletComponent implements OnInit {
  @Input() orgObj: any;
  @ViewChild('content') content: any;
  serverUrl = environment.imageUrl;
  mealPackageList: any = [];
  mealAweOutlet: any;
  showMoreAddons: boolean = true;
  showMoreMenu: boolean = true;
  showMoreCafeteria: boolean = true;
  searchText: any = '';
  showUpdate: boolean = false;
  mealAweOutletObj: any = {
    outletName: 'mealAwe',
    org_id: 0,
    org_name: '',
    outletOpened: true,
    itemList: [],
  };
  cafeteriaList: any = []
  packageEditMode: any = false;
  constructor(
    private apiMainService: ApiMainService,
    private mlApiMainService: MlApiMainService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFooditemList();
    console.log('mealawe packafge', this.orgObj);
    this.cafeteriaList = [...this.orgObj.cafeteriaList];
  }

  async fetchMealAweOutlet(id: any) {
    try {
      const mealAweOutlet = await this.apiMainService.getMealAweOutletById(id);
      if (mealAweOutlet && mealAweOutlet._id) {
        console.log(mealAweOutlet);
        this.mealAweOutletObj = mealAweOutlet;
        this.showUpdate = true;
        this.mealAweOutletObj.org_name = mealAweOutlet.org_name;
        this.mealAweOutletObj.showOnlyToEmployees =
          mealAweOutlet.showOnlyToEmployees;
        this.mealAweOutletObj.org_id = mealAweOutlet.org_id;
        this.mealAweOutletObj.outletOpened = mealAweOutlet.outletOpened;
        this.mealAweOutletObj._id = mealAweOutlet._id;
        this.mealAweOutletObj.itemList = mealAweOutlet.itemList;
        this.mealAweOutlet = mealAweOutlet;
        this.mealAweOutlet.itemList.forEach((item: any) => {
          this.mealPackageList.forEach((pkg: any) => {
            if (pkg._id === item.masterMenuId) {
              pkg.selected = true;
            }
          });
        });
      } else {
        this.mealAweOutletObj.org_name = this.orgObj.organization_name;
        this.mealAweOutletObj.org_id = this.orgObj._id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getFooditemList() {
    try {
      let mealPackageList = await this.mlApiMainService.getMealPackageList();
      mealPackageList = [...mealPackageList].map((ele) => {
        ele.selected = false;
        return ele;
      });
      this.mealPackageList = mealPackageList;
      this.fetchMealAweOutlet(this.orgObj._id);
    } catch (e) {
      console.log('error while getFooditemList', e);
    }
  }

  openMealPackageList() {
    if (this.showUpdate == false) {
      this.mealPackageList = [...this.mealPackageList].map((ele) => {
        ele.selected = false;
        return ele;
      });
    }
    this.modalService
      .open(this.content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
        windowClass: 'mapModel',
      })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`, this.mealPackageList);
          if (result === 'add') {
            this.mealPackageList.forEach((el: any) => {
              if (el.selected) {
                el.masterMenuId = el._id;
                delete el._id;
                this.mealAweOutletObj.itemList.push(el);
              }
            });
            // this.mealAweOutletObj.itemList = this.mealPackageList.filter((el:any) => el.selected);
            this.showUpdate = this.mealAweOutletObj._id ? true : false;
            console.log(this.mealPackageList);
          }
        },
        (reason) => {
          console.log(`Model Dismissed`);
        }
      );
  }

  onCafeteriaCheckChange(event: Event, cafe: any, i: any, j: any) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (!this.mealAweOutletObj.itemList[i]['cafeteriaList']) {
      this.mealAweOutletObj.itemList[i]['cafeteriaList'] = [];
    }

    if (isChecked) {
      this.mealAweOutletObj.itemList[i].cafeteriaList.push(cafe);
    } else {
      const indexToRemove = this.mealAweOutletObj.itemList[i].cafeteriaList.findIndex(
        (c: any) => c.cafeteria_id === cafe.cafeteria_id
      );
      if (indexToRemove > -1) {
        this.mealAweOutletObj.itemList[i].cafeteriaList.splice(indexToRemove, 1);
      }
    }
  }

  async changePackageStatus(status: any, mealId: any, orgId: any) {
    console.log(status, mealId, orgId);
    try {
      await this.apiMainService.changePackageStatus(status, mealId, orgId);
    } catch (error) {
      console.log(error);
    }
  }

  createOutlet(type: any) {
    if (type === 'add') {
      this.addOutlet(this.mealAweOutletObj);
    } else {
      console.log(this.mealPackageList);
      this.updateOutlet(this.mealAweOutletObj);
    }
  }

  async addOutlet(outlet: any) {
    try {
      const savedOutlet = this.apiMainService.saveMealAweOutlet(outlet);
      this.router.navigate(['b2bSearchOrg']);
    } catch (error) {
      console.log(error);
    }
  }
  async updateOutlet(outlet: any) {
    try {
      const updatedOutlet = this.apiMainService.updateMealAweOutlet(
        outlet._id,
        outlet
      );

      this.packageEditMode = false;
      this.showMoreCafeteria = true;
      this.router.navigate(['b2bSearchOrg']);
    } catch (error) {
      console.log(error);
    }
  }

  async enableDisableOutlet() {
    if (this.mealAweOutletObj._id) {
      let status = !this.mealAweOutletObj.outletOpened;
      try {
        await this.apiMainService.setOutletOpenedStatus(
          this.mealAweOutletObj._id,
          status
        );
        this.mealAweOutletObj.outletOpened = status;
      } catch (e) {
        console.log('error while changes kitchen opened status ', e);
      }
    } else {
      this.mealAweOutletObj.outletOpened = !this.mealAweOutletObj.outletOpened;
    }
  }

  checkedCafe(i: number, cafe: any): boolean {
    return !!this.mealAweOutletObj.itemList[i].cafeteriaList.find(
      (data: any) => data.cafeteria_id === cafe.cafeteria_id
    );
  }

  editPackage(pakcage: any) {
    console.log(pakcage);
    this.packageEditMode = true;
  }

  deletePackage(index: any) {
    this.mealAweOutletObj.itemList.splice(index, 1);
    if (this.mealAweOutlet.itemList.length === 0) {
      this.updateOutlet(this.mealAweOutletObj);
    }
  }
}
