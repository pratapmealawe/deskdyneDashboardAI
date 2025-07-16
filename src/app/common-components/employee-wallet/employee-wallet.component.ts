import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-employee-wallet',
  templateUrl: './employee-wallet.component.html',
  styleUrls: ['./employee-wallet.component.scss']
})
export class EmployeeWalletComponent {
  @Input() orgObj: any
  modalRef!: NgbModalRef;
  employeeList: any;
  @ViewChild("content") content: any;
  @ViewChild("updateEmployeeList") updateEmployeeList: any;
  @ViewChild("delete") delete: any;
  empId: any;
  form: any;
  cashbackForm: any;
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
  showAllEmployee = true;
  message = '';
  deletedEmployee: any;
  showError: boolean = false;
  isuploadEmployeeData = false;
  uploadEmployeeData: any;
  uploadEmployeeObj: any;
  uploadedFile: any;
  fileName: any
  previousHistory: any;
  currentUser: any;

  constructor(private apiMainService: ApiMainService, private excelService: ExcelService, private modalService: NgbModal, private fb: FormBuilder, private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    console.log(this.orgObj);
    this.currentUser = this.localStorageService.getCacheData('ADMIN_PROFILE')
    this.getEmployeeListByOrgId();
    this.form = this.fb.group({
      organization_name: this.orgObj.organization_name,
      organization_id: this.orgObj._id,
      employeeName: ['', Validators.required],
      employeeId: ['', Validators.required],
      employeePhoneNo: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      cashbackPoints: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      remark: ['', Validators.required]
    })

    this.cashbackForm = this.fb.group({
      cashbackPoints: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      remark: ['', Validators.required]
    })

    this.employeeObj = {
      organization_name: this.orgObj.organization_name,
      organization_id: this.orgObj._id,
      employeeName: '',
      employeeId: '',
      employeePhoneNo: '',
      employeeEmail: '',
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
    this.addMultipleEmploeeList.push({ ...this.employeeObj });
    this.showMultipleEmployeeForm = true;
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
      this.employeeList = await this.apiMainService.employeeWalletByOrgId(this.orgObj._id);
      console.log('employee list', this.employeeList);
    } catch (error) {
      console.log(error)
    }
  }

  showAddMultipleEmployee() {
    this.showMultipleEmployeeForm = true;
  }
  async submitMultipleEmployee() {
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
      const employeeList = [...this.addMultipleEmploeeList];
      const res = await this.apiMainService.addEmployeeWalletList(employeeList);
      if (res && res.length > 0) {
        this.addMultipleEmploeeList = res;
      }
    } catch (error: any) {
      console.log(error);
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
    console.log(employee);
    this.form.reset();
    this.modalRef = this.modalService.open(this.content);
    this.empId = employee._id;
    this.showError = false;

    if (employee.cashbackPoints) {
      this.previousHistory = employee;
      this.form.patchValue({
        employeeName: employee.employeeName,
        employeeId: employee.employeeId,
        employeePhoneNo: employee.employeePhoneNo,
        employeeEmail: employee.employeeEmail,
        startDate: this.formatDate(employee.startDate),
        endDate: this.formatDate(employee.endDate),
        cashbackPoints: employee.cashbackPoints,
        remark: employee.remark
      })
    }
    else {
      this.form.patchValue({
        employeeName: employee.employeeName,
        employeeId: employee.employeeId,
        employeePhoneNo: employee.employeePhoneNo,
        employeeEmail: employee.employeeEmail,
      })
    }
    console.log(this.form.value);

  }

  openCashbackToAll() {
    this.modalService.open(this.updateEmployeeList);
    this.showError = false;
  }

  formatDate(date: string | Date): string {
    return new Date(date).toISOString().slice(0, 10);
  }

  async updateEmployee(id: any, employeeObj: any) {
    console.log(employeeObj);

    this.showError = true;
    console.log();
    let obj = {
      ...employeeObj,
      status: 'New',
      updateHistory: [
        ...(this.previousHistory?.updateHistory || []),
        {
          status: 'New',
          remark: employeeObj.remark,
          previousAmount: this.previousHistory?.cashbackPoints,
          previousRemark: this.previousHistory?.remark,
          usedAmount: employeeObj.cashbackPoints,
          updatedOn: new Date(),
          updateRemark: employeeObj.remark,
          name: this.currentUser.name,
          loginId: this.currentUser.loginId
        }
      ]
    }
    if (this.form.invalid) {
      return;
    }

    try {
      this.modalRef.dismiss();
      const formdata = { ...obj }
      console.log(formdata);

      const res = await this.apiMainService.updateEmployeeWallet(id, formdata);
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
        const deletedEmployee = await this.apiMainService.deleteEmployeeWallet(employee._id);
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
            const employeeList: any = []
            employeeList.push({
              ...this.employeeObj
            })
            this.addMultipleEmploeeList.push(...employeeList);
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
      this.showRemoveForm = true;
      this.showAddMoreForm = false;
    } catch (error) {
      console.log(error)
    }
  }

  async updateAllEmployeeList(value: any) {
    console.log(value);
    this.showError = true;
    if (this.cashbackForm.invalid) {
      return;
    }
    try {

      let obj = {
        ...value,
        status: 'New',
        updateHistory: {
          status: 'New',
          remark: value.remark,
          usedAmount: value.cashbackPoints,
          updatedOn: new Date(),
          updateRemark: value.remark,
          name: this.currentUser.name,
          loginId: this.currentUser.loginId
        }
      }
      const updatedEmployeeList = await this.apiMainService.updateEmployeeCashback(this.orgObj._id, obj);
      this.modalService.dismissAll(this.updateEmployeeList)
      this.getEmployeeListByOrgId();
    } catch (error) {
      console.log(error);

    }
  }

}
