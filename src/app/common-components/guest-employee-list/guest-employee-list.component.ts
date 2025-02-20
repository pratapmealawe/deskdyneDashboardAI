import { Component, Input, ViewChild } from "@angular/core";
import { ApiMainService } from "src/service/apiService/apiMain.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
// import { ExcelService } from "src/service/excel.service";

@Component({
    selector: 'app-guest-employee-list',
    templateUrl: 'guest-employee-list.component.html',
    styleUrls: ['guest-employee-list.component.scss']
})

export class GuestEmployeeListComponent {
    guestEmployeeList: any;
    @ViewChild("content") content: any;
    @ViewChild("delete") delete: any;
    @Input() orgObj: any;
    form: any;
    showMultipleEmployeeForm = false;
    multipleEmployeeform: any;
    addMultipleEmploeeList: any = [];
    showRemoveForm = false;
    showAddMoreForm = true;
    employeeObj: any;
    guestEmpId: any;
    showUpdateModalBtn = false;
    deleteEmployeeName: any
    confirmDelete: boolean = false;
    deleteId: any;
    employeeDetail: any;
    selectedCafeteriaId: any;
    selectedCafeteria: any;
    selectedCafeteriaName: any;
    disableSubmit: any = false;
    constructor(private ddApiMainService: ApiMainService, private modalService: NgbModal, private fb: FormBuilder) {
    }
    ngOnInit() {
        this.getGuestEmployeelistByOrgId();
        this.form = this.fb.group({
            organization_name: this.orgObj.organization_name,
            organization_id: this.orgObj._id,
            employeeName: [''],
            employeeId: [''],
            employeePhoneNo: [''],
            employeeEmail: [''],
            expiry: ['']
        })
        this.employeeObj = {
            organization_name: this.orgObj.organization_name,
            organization_id: this.orgObj._id,
            employeeName: '',
            employeeId: '',
            employeePhoneNo: '',
            employeeEmail: '',
            expiry: ''
        }
        if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
            this.selectedCafeteria = this.orgObj.cafeteriaList[0];
            this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
            this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
        }
    }
    addMoreEmployee() {
        this.addMultipleEmploeeList.push({ ...this.employeeObj });
        this.showRemoveForm = true;
        this.showAddMoreForm = false;
    }
    addMultipleEmployee() {
        if (this.selectedCafeteria) {
            this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
            this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
            console.log('cafeteria', this.selectedCafeteria)

        } else {
            alert('select cafeteria');
            return
        }
        const employee = {
            cafeteria_name: this.selectedCafeteriaName,
            cafeteria_id: this.selectedCafeteriaId,
            ...this.employeeObj
        }
        this.addMultipleEmploeeList.length = 0
        this.addMultipleEmploeeList.push({ ...employee });
        this.showMultipleEmployeeForm = true;
    }
    removeEmployeeForm(index: any) {
        this.addMultipleEmploeeList.splice(index, 1)
        if (this.addMultipleEmploeeList.length == 1) {
            this.showRemoveForm = false;
            this.showAddMoreForm = true;
        }
    }
    async getGuestEmployeelistByOrgId() {
        try {
            this.guestEmployeeList = await this.ddApiMainService.getGuestEmployeelistByOrgId(this.orgObj._id);
        } catch (error) {
            console.log(error)
        }
    }
    addEmployeeForm() {
        this.modalService.open(this.content);
    }
    showAddMultipleEmployee() {
        this.showMultipleEmployeeForm = true;
    }
    async submitMultipleGuestEmployee() {
        console.log('multiple guest employee', this.addMultipleEmploeeList);
        this.addMultipleEmploeeList.forEach((emp: any) => {
            console.log(emp)
            if (emp && !emp.employeeName || !emp.employeeId || !emp.employeePhoneNo || !emp.employeeEmail || !emp.expiry) {
                this.disableSubmit = true;
            }
            else {
                this.disableSubmit = false;
            }
        })
        if (this.disableSubmit) {
            return;
        }

        this.addMultipleEmploeeList.forEach((el: any) => {
            el.cafeteria_name = this.selectedCafeteriaName;
            el.cafeteria_id = this.selectedCafeteriaId;
        })
        const guestEmployeeList = [...this.addMultipleEmploeeList];
        console.log(guestEmployeeList)
        try {
            await this.ddApiMainService.addGuestEmployeeList(guestEmployeeList);
        }
        catch (error) {
            console.log(error);
        }
        this.getGuestEmployeelistByOrgId();
        this.showMultipleEmployeeForm = false;
    }
    onCafeteriaChange(event: any) {
        console.log('radio change event', event.target.checked);
        if (this.selectedCafeteria) {
            this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
            this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
        }
        console.log(this.selectedCafeteria)
        console.log('guset emploee', this.guestEmployeeList);
    }
    editGuestEmployee(employee: any) {
        console.log('guestEmployee', employee);
        this.modalService.open(this.content);
        this.guestEmpId = employee._id;
        const date = this.formatDate(employee.expiry);
        this.form.patchValue({
            employeeName: employee.employeeName,
            employeeId: employee.employeeId,
            employeePhoneNo: employee.employeePhoneNo,
            employeeEmail: employee.employeeEmail,
            expiry: date
        })
        this.showUpdateModalBtn = true;
    }
    async updateGuestEmployee(id: any, employeeObj: any) {
        try {
            const formdata = { ...employeeObj }
            console.log('expiry date update', employeeObj.expiry, typeof employeeObj.expiry);
            const res = await this.ddApiMainService.updateGuestEmployee(id, formdata);
            console.log('response', res);
        } catch (error) {
            console.log(error);
        }
        this.getGuestEmployeelistByOrgId();

    }

    formatDate(date: Date): string {
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }
    // formatDate(dateStr: string): string {
    //     const parts = dateStr.split('-');
    //     const day = parts[0];
    //     const month = parts[1];
    //     const year = parts[2];
    //     return `${year}-${month}-${day}`;
    //   }

    deleteConfirmed(employee: any) {
        this.confirmDelete = true;
        this.deleteGuestEmployee(employee);
        this.modalService.dismissAll();
        this.confirmDelete = false;
    }
    async deleteGuestEmployee(employee: any) {
        console.log(this.guestEmployeeList);
        this.employeeDetail = employee;
        this.deleteEmployeeName = employee.employeeName;
        if (!this.confirmDelete) {
            this.modalService.open(this.delete);
        }

        try {
            if (this.confirmDelete) {
                const deletedEmployee = await this.ddApiMainService.deleteGuestEmployee(employee._id);
                this.getGuestEmployeelistByOrgId();
                console.log(deletedEmployee)
                this.getGuestEmployeelistByOrgId();
                console.log(deletedEmployee)
            }

        } catch (error) {
            console.log(error);
        }

    }
//     async onFileChange(evt: any) {
//         console.log('file change');
//         // this.showMultipleEmployeeForm = false;
//         this.isuploadEmployeeData = true;
//         try {
//             const target: DataTransfer = <DataTransfer>(evt.target);
//             if (target.files.length !== 1) throw new Error('Cannot use multiple files');
//             const data = await this.excelService.upload(target.files[0])
//             console.log('target.files[0]',data);
//             console.log(target.files[0].name)
//             if(target.files[0] && target.files[0].name)
//             this.fileName = target.files[0].name;

//             this.uploadEmployeeData = data.slice(1);
//             console.log('uploaded excel data',this.uploadEmployeeData);
//             if(this.uploadEmployeeData && this.uploadEmployeeData.length>0){
//                 this.addMultipleEmploeeList.length=0;
//                this.uploadEmployeeData.forEach((elm:any)=>{
//               this.employeeObj.guestEmployeeName = elm[0];
//               this.employeeObj.guestEmployeeId = elm[1];
//               this.employeeObj.guestEmployeePhoneNo = elm[2];
//               this.employeeObj.guestEmployeeEmail = elm[3];
//               console.log('date in the excel',elm[4])
//               const date = this.formatDate(elm[4]);
//               this.employeeObj.expiry = date;
//               console.log('uploaded employee object',this.employeeObj)
//               const employee = {
//                 cafeteria_name:this.selectedCafeteriaName,
//                 cafeteria_id:this.selectedCafeteriaId,
//                 ...this.employeeObj
//             }
//             this.addMultipleEmploeeList.push({...employee});
//             if(this.addMultipleEmploeeList.length == this.uploadEmployeeData.length){
//                 this.employeeObj={
//                     organization_name : this.orgObj.organization_name,
//                     organization_id : this.orgObj._id,
//                     guestEmployeeName : '',
//                     guestEmployeeId :  '',
//                     guestEmployeePhoneNo :  '',
//                     guestEmployeeEmail : '',
//                     expiry : ''
//                 }
//             }
//                })
              
//             }
//             console.log('multiple employee List',this.addMultipleEmploeeList )
//             this.showRemoveForm = true;
//             this.showAddMoreForm = false;
//         } catch (error) {
//             console.log(error)
//         }
// }
}