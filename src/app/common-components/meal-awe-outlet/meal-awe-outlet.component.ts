import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
  searchText: any = '';
  showUpdate: boolean = false;
  mealAweOutletObj: any = {
    outletName: 'mealAwe',
    org_id: 0,
    org_name: '',
    outletOpened: true,
    itemList: [],
  };
  packageEditMode: any = false;

  constructor(
    private apiMainService: ApiMainService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFooditemList();
    console.log('mealawe packafge', this.orgObj);
  }

  async fetchMealAweOutlet(id: any) {
    try {
      const mealAweOutlet = await this.apiMainService.getMealAweOutletById(id);
      if (mealAweOutlet && mealAweOutlet._id) {
        console.log(mealAweOutlet);
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
      let mealPackageList = await this.apiMainService.getMealPackageList();
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
