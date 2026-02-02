import { Component, Input, ViewChild } from "@angular/core";
import { ApiMainService } from "src/service/apiService/apiMain.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ExcelService } from "src/service/excel.service";
import { ToasterService } from 'src/service/toaster.service';

@Component({
    selector: 'app-employee-list',
    templateUrl: 'employee-list.component.html',
    styleUrls: ['employee-list.component.scss']
})
export class EmployeeListComponent {
    employeeList: any;
    @ViewChild("content") content: any;
    @ViewChild("delete") delete: any;
    @Input() orgObj: any;
    empId: any;
    form: any;
    showMultipleEmployeeForm = false;
    multipleEmployeeform: any;
    addMultipleEmploeeList: any = [];
    disableSubmit: any = false;
    showRemoveForm = false;
    showAddMoreForm = true;
    employeeObj: any;
    confirmDelete: boolean = false;
    deleteId: any;
    deleteEmployeeName: any = '';
    selectedCafeteria: any;
    selectedCafeteriaName: any;
    selectedCafeteriaId: any;
    showAllEmployee = true;
    message = '';
    deletedEmployee: any;
    showError: boolean = false;
    isuploadEmployeeData = false;
    uploadEmployeeData: any;
    uploadEmployeeObj: any;
    uploadedFile: any;
    fileName: any
    constructor(private ddApiMainService: ApiMainService, private excelService: ExcelService, private modalService: NgbModal, private fb: FormBuilder, private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.getEmployeeListByOrgId();
        this.form = this.fb.group({
            organization_name: this.orgObj.organization_name,
            organization_id: this.orgObj._id,
            employeeName: ['', Validators.required],
            employeeId: ['', Validators.required],
            employeePhoneNo: ['', Validators.required],
            employeeEmail: ['', Validators.required],
        })
        this.employeeObj = {
            organization_name: this.orgObj.organization_name,
            organization_id: this.orgObj._id,
            employeeName: '',
            employeeId: '',
            employeePhoneNo: '',
            employeeEmail: '',
        }
        if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
            this.selectedCafeteria = this.orgObj.cafeteriaList[0];
            this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
            this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
        }
        this.multipleEmployeeform = this.fb.group({
            employee: this.fb.array([this.createEmployeeForm()])
        })
    }
    createEmployeeForm() {
        return this.fb.group({
            name: '',
        });
    }
    addMoreEmployee() {
        this.addMultipleEmploeeList.push({ ...this.employeeObj });
        this.showRemoveForm = true;
        this.showAddMoreForm = false;
    }
    addMultipleEmployee() {
        this.addMultipleEmploeeList.length = 0;
        if (this.selectedCafeteria) {
            this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
            this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;

        } else {
            alert('select cafeteria');
            return;
        }
        this.addMultipleEmploeeList.push({ ...this.employeeObj });
        this.showMultipleEmployeeForm = true;
    }
    onCafeteriaChange(event: any) {
        // console.log('radio change event', event.target.checked);
        this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
        this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    }
    removeEmployeeForm(index: any) {
        this.addMultipleEmploeeList.splice(index, 1)
        if (this.addMultipleEmploeeList.length == 1) {
            this.showRemoveForm = false;
            this.showAddMoreForm = true;
        }

    }
    async getEmployeeListByOrgId() {
        try {
            this.employeeList = await this.ddApiMainService.getEmployeeListByOrgId(this.orgObj._id);
            console.log('employee list', this.employeeList);
        } catch (error) {
            console.log(error)
        }
    }

    showAddMultipleEmployee() {
        this.showMultipleEmployeeForm = true;
    }
    async submitMultipleEmployee() {
        console.log('employeee list to save', this.addMultipleEmploeeList);
        this.addMultipleEmploeeList.forEach((emp: any) => {
            if (emp && !emp.employeeName || !emp.employeeId || !emp.employeePhoneNo || !emp.employeeEmail) {
                this.disableSubmit = true;
            }
            else {
                this.disableSubmit = false;
            }
        })
        if (this.disableSubmit) {
            return;
        }
        try {
            this.addMultipleEmploeeList.forEach((el: any) => {
                el.cafeteria_name = this.selectedCafeteriaName;
                el.cafeteria_id = this.selectedCafeteriaId;
            })
            const employeeList = [...this.addMultipleEmploeeList];
            console.log(employeeList)
            const res = await this.ddApiMainService.addEmployeeList(employeeList);
            if (res && res.length > 0) {
                this.addMultipleEmploeeList = res;
            }
        } catch (error: any) {
            // console.log(error.error.msg);
            const errorArr = error?.error?.msg?.skippedEmployees;

            if (Array.isArray(errorArr) && errorArr.length > 0) {
                errorArr.forEach(emp => {
                    alert(`Duplicate Entry For ${emp.employeeName}: ${emp.employeePhoneNo}`);
                });
            }
        }
        this.getEmployeeListByOrgId();
        this.showMultipleEmployeeForm = false;
    }
    editEmployee(employee: any) {
        console.log(this.employeeList);
        this.modalService.open(this.content);
        this.empId = employee._id;

        this.form.patchValue({
            employeeName: employee.employeeName,
            employeeId: employee.employeeId,
            employeePhoneNo: employee.employeePhoneNo,
            employeeEmail: employee.employeeEmail
        })
    }
    async updateEmployee(id: any, employeeObj: any) {
        try {
            const formdata = { ...employeeObj }
            const res = await this.ddApiMainService.updateEmployee(id, formdata);
            console.log('response', res);
            if (res && res._id) {
                this.getEmployeeListByOrgId();
            }
        } catch (error) {
            console.log(error);
        }
        this.getEmployeeListByOrgId();

    }

    deleteConfirmed(deletedEmployee: any) {
        this.confirmDelete = true;
        this.deleteEmployee(deletedEmployee);
        this.modalService.dismissAll();
        this.confirmDelete = false;
    }
    async deleteEmployee(employee: any) {
        this.deleteEmployeeName = employee.employeeName;
        this.deletedEmployee = employee;
        this.modalService.open(this.delete);
        try {
            if (this.confirmDelete) {
                console.log(this.confirmDelete);
                console.log('employee', employee)
                const deletedEmployee = await this.ddApiMainService.deleteEmployee(employee._id);
                this.getEmployeeListByOrgId();
                console.log(deletedEmployee);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async onFileChange(evt: any) {
        this.isuploadEmployeeData = true;
        try {
            const target: DataTransfer = <DataTransfer>(evt.target);
            if (target.files.length !== 1) throw new Error('Cannot use multiple files');
            let data: any = await this.excelService.upload(target.files[0])
            console.log('target.files[0]', data);
            console.log(target.files[0].name);
            this.fileName = target.files[0].name;
            if (data && data.files && data.files.length > 0) {
                data = target.files;
            }
            this.uploadEmployeeData = data
            console.log('uploaded excel data', this.uploadEmployeeData);
            if (this.uploadEmployeeData && this.uploadEmployeeData.length > 0) {
                this.addMultipleEmploeeList.length = 0;
                this.uploadEmployeeData.forEach((elm: any) => {
                    if (!(typeof elm[0] === 'undefined') && elm[0] != null && elm[0] != '' && elm[0] != 'Emp Name') {
                        this.employeeObj.employeeName = elm[0];
                        this.employeeObj.employeeId = elm[1];
                        this.employeeObj.employeePhoneNo = elm[2];
                        this.employeeObj.employeeEmail = elm[3];
                        console.log('uploaded employee object', this.employeeObj)
                        const employeeList: any = []
                        employeeList.push({
                            cafeteria_name: this.selectedCafeteriaName,
                            cafeteria_id: this.selectedCafeteriaId,
                            ...this.employeeObj
                        })
                        this.addMultipleEmploeeList.push(...employeeList);
                        console.log(this.addMultipleEmploeeList)
                        if (this.addMultipleEmploeeList.length == this.uploadEmployeeData.length) {
                            this.employeeObj = {
                                organization_name: this.orgObj.organization_name,
                                organization_id: this.orgObj._id,
                                employeeName: '',
                                employeeId: '',
                                employeePhoneNo: '',
                                employeeEmail: '',
                            }
                        }
                    }
                })
            }
            this.showMultipleEmployeeForm = true;
            this.showRemoveForm = true;
            this.showAddMoreForm = false;
        } catch (error) {
            console.log(error)
        }
    }

    cancelMultipleEmployee() {
        this.showMultipleEmployeeForm = false;
        this.showAddMoreForm = true;
        this.showRemoveForm = false;
        this.fileName = null
        // if (this.fileInputRef) {
        //     this.fileInputRef.nativeElement.value = '';
        // }
        // this.employeeForm?.reset();
        // this.uploadedEmployeeList = [];
    }

}