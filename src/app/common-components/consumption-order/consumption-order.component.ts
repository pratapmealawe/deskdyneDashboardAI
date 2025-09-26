import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
  showMultipleConsumptionForm = false;
  addMultipleConsumptionList: any = [];
  consumptionObj: any;
  showRemoveForm = false;
  showAddMoreForm = true;
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.orgObj);
  }

  ngOnInit(): void {

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
    }
  }

  onCafeteriaChange(event: any) {
    console.log('radio change event', event.target.checked);
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
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

  addConsumptionOrder() {
    this.addMultipleConsumptionList.length = 0;
    if (this.selectedCafeteria) {
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;

    } else {
      alert('select cafeteria');
      return;
    }
    this.addMultipleConsumptionList.push({ ...this.consumptionObj });
    this.showMultipleConsumptionForm = true;
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
