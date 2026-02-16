import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-consumption-order',
  templateUrl: './consumption-order.component.html',
  styleUrls: ['./consumption-order.component.scss']
})
export class ConsumptionOrderComponent implements OnChanges, OnInit {
  @Input() orgObj: any;
  selectedCafeteria: any;
  selectedCafeteriaName: any;
  selectedCafeteriaId: any;
  consumptionMenuId: any;
  selectedOriginalCafeteriaId: any;
  showMultipleConsumptionForm = false;
  addMultipleConsumptionList: any = [];
  disableSubmit: any = false;
  consumptionList: any = [];
  consumptionObj: any;
  cafeOriginalId: any;
  showRemoveForm = false;
  showAddMoreForm = true;
  @ViewChild("content") content: any;

  mealTimeList = [
    {
      "mealType": "Fullday",
      "acceptOrderFrom": "06:00",
      "acceptOrderTill": "23:00"
    },
    {
      "mealType": "Breakfast",
      "acceptOrderFrom": "07:00",
      "acceptOrderTill": "09:00"
    },
    {
      "mealType": "Lunch",
      "acceptOrderFrom": "11:00",
      "acceptOrderTill": "13:00"
    },
    {
      "mealType": "EveningSnacks",
      "acceptOrderFrom": "15:00",
      "acceptOrderTill": "17:00"
    },
    {
      "mealType": "Dinner",
      "acceptOrderFrom": "20:00",
      "acceptOrderTill": "22:00"
    }
  ];

  MealForm!: FormGroup;
  modalRef: any;


  constructor(private ddApiMainService: ApiMainService, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.orgObj);
  }

  ngOnInit(): void {
    this.MealForm = this.fb.group({
      itemName: [''],
      mealPrice: [''],
      selctedmealtype: [''],
      minGuarantees: ['']
    })

    this.consumptionObj = {
      organization_name: this.orgObj.organization_name,
      organization_id: this.orgObj._id,
      itemName: '',
      mealPrice: '',
      selctedmealtype: '',
      minGuarantees: ''
    }
    if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
      this.selectedOriginalCafeteriaId = this.selectedCafeteria._id;
    }
    this.fetchOrgMeals()
  }

  onCafeteriaChange(event: any) {
    // console.log('radio change event', event.target.checked);
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    this.selectedOriginalCafeteriaId = this.selectedCafeteria._id;
  }

  // 👉 Select cafeteria (for pill buttons)
  selectCafeteria(cafeteria: any) {
    this.selectedCafeteria = cafeteria;
    this.selectedCafeteriaName = cafeteria.cafeteria_name;
    this.selectedCafeteriaId = cafeteria.cafeteria_id;
    this.selectedOriginalCafeteriaId = cafeteria._id;
  }

  // 👉 Get filtered items by selected cafeteria
  getFilteredItems(): any[] {
    if (!this.consumptionList) return [];

    const items: any[] = [];
    this.consumptionList.forEach((consumptionItem: any) => {
      if (consumptionItem.cafeteria_id === this.selectedCafeteriaId) {
        consumptionItem.mealTypeList?.forEach((mealItem: any) => {
          items.push({
            ...mealItem,
            cafeteria_orignal_id: consumptionItem.cafeteria_orignal_id
          });
        });
      }
    });
    return items;
  }

  // 👉 Cancel multiple consumption form
  cancelMultipleConsumption() {
    this.showMultipleConsumptionForm = false;
    this.showAddMoreForm = true;
    this.showRemoveForm = false;
    this.addMultipleConsumptionList = [];
  }

  async updateMealTypeList() {
    console.log(this.MealForm.value);
    let obj = {
      ...this.MealForm.value,
      _id: this.consumptionMenuId
    }

    this.modalRef.dismiss();

    const res = await this.ddApiMainService.updateConsumptionMenu(this.orgObj._id, this.cafeOriginalId, obj);
    console.log(res);
    this.fetchOrgMeals();

  }

  addMoreEmployee() {
    this.addMultipleConsumptionList.push({ ...this.consumptionObj });
    this.showRemoveForm = true;
    this.showAddMoreForm = false;
  }

  removeEmployeeForm(index: any) {
    this.addMultipleConsumptionList.splice(index, 1)
    if (this.addMultipleConsumptionList.length == 1) {
      this.showRemoveForm = false;
      this.showAddMoreForm = true;
    }

  }

  editConsumption(mealInfo: any, selectedCafeteriaId: any) {
    this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', });
    console.log(mealInfo);
    this.consumptionMenuId = mealInfo._id;
    this.cafeOriginalId = selectedCafeteriaId;
    console.log(this.orgObj._id);


    this.MealForm.patchValue(
      {
        itemName: mealInfo.itemName,
        mealPrice: mealInfo.mealPrice,
        selctedmealtype: mealInfo.selctedmealtype,
        minGuarantees: mealInfo.minGuarantees
      }
    );
  }

  addConsumptionOrder() {
    this.addMultipleConsumptionList.length = 0;
    if (this.selectedCafeteria) {
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
      this.selectedOriginalCafeteriaId = this.selectedCafeteria._id;

    } else {
      alert('select cafeteria');
      return;
    }
    this.addMultipleConsumptionList.push({ ...this.consumptionObj });
    this.showMultipleConsumptionForm = true;
  }

  async fetchOrgMeals() {
    try {
      const result = await this.ddApiMainService.getConsumptionOrderByOrgId(this.orgObj._id)
      this.consumptionList = result;
    }
    catch (error) {
      console.log(error)
    }
  }

  async submitMultipleConsumption() {
    console.log(this.addMultipleConsumptionList, "sss");

    const hasInvalid = this.addMultipleConsumptionList.some(
      (consumption: any) =>
        !consumption.itemName || !consumption.mealPrice || !consumption.minGuarantees
    );
    if (hasInvalid) {
      this.disableSubmit = true;
      return;
    }
    this.disableSubmit = false;

    try {
      const transformedConsumptionList =
      {
        organization_name: this.orgObj.organization_name,
        organization_id: this.orgObj._id,
        cafeteria_name: this.selectedCafeteriaName,
        cafeteria_id: this.selectedCafeteriaId,
        cafeteria_orignal_id: this.selectedOriginalCafeteriaId,
        mealTypeList: this.addMultipleConsumptionList.map((item: any) => ({
          itemName: item.itemName,
          mealPrice: item.mealPrice,
          selctedmealtype: item.selctedmealtype,
          minGuarantees: item.minGuarantees
        }))
      }

      const res = await this.ddApiMainService.addConsumptionOrderList(transformedConsumptionList);
      if (res) {
        this.addMultipleConsumptionList = [];
        this.fetchOrgMeals();
      }
    } catch (error: any) {
      const errorArr = error?.error?.msg?.skippedEmployees;
      if (Array.isArray(errorArr) && errorArr.length > 0) {
        errorArr.forEach(emp => {
          alert(`Duplicate Entry For ${emp.employeeName}: ${emp.employeePhoneNo}`);
        });
      }
    }

    this.showMultipleConsumptionForm = false;
  }

}
