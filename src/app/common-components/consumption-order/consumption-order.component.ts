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
      selctedmealtype: ['']
    })

    this.consumptionObj = {
      organization_name: this.orgObj.organization_name,
      organization_id: this.orgObj._id,
      itemName: '',
      mealPrice: '',
      selctedmealtype: ''
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
    console.log('radio change event', event.target.checked);
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    this.selectedOriginalCafeteriaId = this.selectedCafeteria._id;
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
    this.modalRef = this.modalService.open(this.content);
    console.log(mealInfo);
    this.consumptionMenuId = mealInfo._id;
    this.cafeOriginalId = selectedCafeteriaId;
    console.log(this.orgObj._id);


    this.MealForm.patchValue(
      {
        itemName: mealInfo.itemName,
        mealPrice: mealInfo.mealPrice,
        selctedmealtype: mealInfo.selctedmealtype
      }
    );
    // this.empId = employee._id;

    // this.form.patchValue({
    //   employeeName: employee.employeeName,
    //   employeeId: employee.employeeId,
    //   employeePhoneNo: employee.employeePhoneNo,
    //   employeeEmail: employee.employeeEmail
    // })
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
    console.log("in orgggggg")
    try {
      const result = await this.ddApiMainService.getConsumptionOrderByOrgId(this.orgObj._id)
      console.log(result);
      this.consumptionList = result;
      console.log(this.consumptionList);

    }
    catch (error) {
      console.log(error)
    }
  }

  async submitMultipleConsumption() {
    console.log('employeee list to save', this.addMultipleConsumptionList);

    // Validate input
    const hasInvalid = this.addMultipleConsumptionList.some(
      (consumption: any) =>
        !consumption.itemName || !consumption.mealPrice || !consumption.selctedmealtype
    );
    if (hasInvalid) {
      this.disableSubmit = true;
      return;
    }
    this.disableSubmit = false;

    try {
      // Attach cafeteria info once
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
          selctedmealtype: item.selctedmealtype
        }))
      }

      console.log('Final payload', transformedConsumptionList);

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


  //   async onFileChange(evt: any) {
  //     this.isuploadEmployeeData = true;
  //     try {
  //         const target: DataTransfer = <DataTransfer>(evt.target);
  //         if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  //         let data: any = await this.excelService.upload(target.files[0])
  //         console.log('target.files[0]', data);
  //         console.log(target.files[0].name);
  //         this.fileName = target.files[0].name;
  //         if (data && data.files && data.files.length > 0) {
  //             data = target.files;
  //         }
  //         this.uploadEmployeeData = data
  //         console.log('uploaded excel data', this.uploadEmployeeData);
  //         if (this.uploadEmployeeData && this.uploadEmployeeData.length > 0) {
  //             this.addMultipleEmploeeList.length = 0;
  //             this.uploadEmployeeData.forEach((elm: any) => {
  //                 if (!(typeof elm[0] === 'undefined') && elm[0] != null && elm[0] != '' && elm[0] != 'Emp Name') {
  //                     this.employeeObj.employeeName = elm[0];
  //                     this.employeeObj.employeeId = elm[1];
  //                     this.employeeObj.employeePhoneNo = elm[2];
  //                     this.employeeObj.employeeEmail = elm[3];
  //                     console.log('uploaded employee object', this.employeeObj)
  //                     const employeeList: any = []
  //                     employeeList.push({
  //                         cafeteria_name: this.selectedCafeteriaName,
  //                         cafeteria_id: this.selectedCafeteriaId,
  //                         ...this.employeeObj
  //                     })
  //                     this.addMultipleEmploeeList.push(...employeeList);
  //                     console.log(this.addMultipleEmploeeList)
  //                     if (this.addMultipleEmploeeList.length == this.uploadEmployeeData.length) {
  //                         this.employeeObj = {
  //                             organization_name: this.orgObj.organization_name,
  //                             organization_id: this.orgObj._id,
  //                             employeeName: '',
  //                             employeeId: '',
  //                             employeePhoneNo: '',
  //                             employeeEmail: '',
  //                         }
  //                     }
  //                 }
  //             })
  //         }
  //         this.showRemoveForm = true;
  //         this.showAddMoreForm = false;
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
}
