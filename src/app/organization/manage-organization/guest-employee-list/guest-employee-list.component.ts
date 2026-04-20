import { Component, Input, ViewChild } from "@angular/core";
import { ApiMainService } from "@service/apiService/apiMain.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { DirectivesModule } from "src/shared/directives/common-directives.directives.modules";

@Component({
    selector: 'app-guest-employee-list',
    templateUrl: 'guest-employee-list.component.html',
    styleUrls: ['guest-employee-list.component.scss'],
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
    constructor(private apiMainService: ApiMainService, private modalService: NgbModal, private fb: FormBuilder) {
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
            this.guestEmployeeList = await this.apiMainService.getGuestEmployeelistByOrgId(this.orgObj._id);
        } catch (error) {
    }
    showAddMultipleEmployee() {
        this.showMultipleEmployeeForm = true;
    }
    async submitMultipleGuestEmployee() {
        this.addMultipleEmploeeList.forEach((emp: any) => {
            
        this.showMultipleEmployeeForm = false;
    }
    onCafeteriaChange(event: any) {
        // 
        if (this.selectedCafeteria) {
            this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
            this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
        }
    }
    editGuestEmployee(employee: any) {
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
            const res = await this.apiMainService.updateGuestEmployee(id, formdata);
        } catch (error) {
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
        this.employeeDetail = employee;
        this.deleteEmployeeName = employee.employeeName;
        if (!this.confirmDelete) {
            this.modalService.open(this.delete);
        }

        try {
            if (this.confirmDelete) {
                const deletedEmployee = await this.apiMainService.deleteGuestEmployee(employee._id);
                this.getGuestEmployeelistByOrgId();
        }

    }
    //     async onFileChange(evt: any) {
    //         
    //         // this.showMultipleEmployeeForm = false;
    //         this.isuploadEmployeeData = true;
    //         try {
    //             const target: DataTransfer = <DataTransfer>(evt.target);
    //             if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    //             const data = await this.excelService.upload(target.files[0])
    //             
    //             
    //             
    //             if(this.uploadEmployeeData && this.uploadEmployeeData.length>0){
    //                 this.addMultipleEmploeeList.length=0;
    //                this.uploadEmployeeData.forEach((elm:any)=>{
    //               this.employeeObj.guestEmployeeName = elm[0];
    //               this.employeeObj.guestEmployeeId = elm[1];
    //               this.employeeObj.guestEmployeePhoneNo = elm[2];
    //               this.employeeObj.guestEmployeeEmail = elm[3];
    //               
    //               this.employeeObj.expiry = date;
    //               
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

    cancelMultipleEmployee() {
        this.showMultipleEmployeeForm = false;
        this.showAddMoreForm = true;
        this.showRemoveForm = false;
    }
}