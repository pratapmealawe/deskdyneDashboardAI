import { Component, Input, ViewChild, OnInit } from "@angular/core";
import { ApiMainService } from "@service/apiService/apiMain.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "src/shared/directives/common-directives.directives.modules";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../../material.module";
import { ToasterService } from "@service/toaster.service";
import { OrganizationSharedService } from "../../organization-shared.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-guest-employee-list',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule
    ],
    templateUrl: 'guest-employee-list.component.html',
    styleUrls: ['guest-employee-list.component.scss'],
})
export class GuestEmployeeListComponent implements OnInit {
    guestEmployeeList: any[] = [];
    @ViewChild("content") content: any;
    @ViewChild("delete") delete: any;
    @Input() orgObj: any;
    
    form: any;
    showMultipleEmployeeForm = false;
    addMultipleEmploeeList: any[] = [];
    showRemoveForm = false;
    employeeObj: any;
    guestEmpId: any;
    showUpdateModalBtn = false;
    deleteEmployeeName: any;
    employeeDetail: any;
    selectedCafeteriaId: any;
    selectedCafeteria: any;
    selectedCafeteriaName: any;
    disableSubmit: boolean = false;

    constructor(
        private apiMainService: ApiMainService, 
        private modalService: NgbModal, 
        private fb: FormBuilder,
        private toasterService: ToasterService,
        private orgSharedService: OrganizationSharedService,
        private route: ActivatedRoute
    ) {}

    async ngOnInit() {
        if (!this.orgObj) {
            const id = this.route.snapshot.parent?.params['id'];
            if (id) {
                this.orgObj = await this.orgSharedService.refreshOrganization(id);
            }
        }

        if (this.orgObj) {
            this.initForm();
            this.getGuestEmployeelistByOrgId();
            
            if (this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
                this.selectedCafeteria = this.orgObj.cafeteriaList[0];
                this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
                this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
            }
        }
    }

    initForm() {
        this.form = this.fb.group({
            organization_name: [this.orgObj?.organization_name || ''],
            organization_id: [this.orgObj?._id || ''],
            employeeName: ['', Validators.required],
            employeeId: ['', Validators.required],
            employeePhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            employeeEmail: ['', [Validators.required, Validators.email]],
            expiry: ['', Validators.required]
        });

        this.employeeObj = {
            organization_name: this.orgObj?.organization_name,
            organization_id: this.orgObj?._id,
            employeeName: '',
            employeeId: '',
            employeePhoneNo: '',
            employeeEmail: '',
            expiry: ''
        };
    }

    onCafeteriaChange(event: any) {
        if (this.selectedCafeteria) {
            this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
            this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
        }
    }

    async getGuestEmployeelistByOrgId() {
        try {
            this.guestEmployeeList = await this.apiMainService.getGuestEmployeelistByOrgId(this.orgObj._id);
        } catch (error) {
            console.error(error);
        }
    }

    addMoreEmployee() {
        this.addMultipleEmploeeList.push({ ...this.employeeObj });
        this.showRemoveForm = true;
    }

    addMultipleEmployee() {
        this.addMultipleEmploeeList = [{ ...this.employeeObj }];
        this.showMultipleEmployeeForm = true;
        this.showRemoveForm = false;
    }

    removeEmployeeForm(index: number) {
        this.addMultipleEmploeeList.splice(index, 1);
        if (this.addMultipleEmploeeList.length <= 1) {
            this.showRemoveForm = false;
        }
    }

    async submitMultipleGuestEmployee() {
        const validEmployees = this.addMultipleEmploeeList.filter(emp => 
            emp.employeeName && emp.employeeId && emp.employeePhoneNo && emp.employeeEmail && emp.expiry
        );

        if (validEmployees.length === 0) {
            this.toasterService.warning('Please fill all required fields for at least one employee');
            return;
        }

        const payload = validEmployees.map(emp => ({
            ...emp,
            cafeteria_id: this.selectedCafeteriaId,
            cafeteria_name: this.selectedCafeteriaName
        }));

        this.disableSubmit = true;
        try {
            await this.apiMainService.addGuestEmployeeList(payload);
            this.toasterService.success('Guest employees added successfully');
            this.showMultipleEmployeeForm = false;
            this.getGuestEmployeelistByOrgId();
        } catch (error) {
            this.toasterService.error('Failed to add guest employees');
        } finally {
            this.disableSubmit = false;
        }
    }

    editGuestEmployee(employee: any) {
        this.guestEmpId = employee._id;
        this.form.patchValue({
            employeeName: employee.employeeName,
            employeeId: employee.employeeId,
            employeePhoneNo: employee.employeePhoneNo,
            employeeEmail: employee.employeeEmail,
            expiry: this.formatDate(employee.expiry)
        });
        this.modalService.open(this.content, { centered: true, size: 'lg' });
        this.showUpdateModalBtn = true;
    }

    async updateGuestEmployee(id: any, employeeObj: any) {
        if (this.form.invalid) {
            this.toasterService.warning('Please fill all required fields correctly');
            return;
        }
        try {
            await this.apiMainService.updateGuestEmployee(id, employeeObj);
            this.toasterService.success('Guest employee updated');
            this.modalService.dismissAll();
            this.getGuestEmployeelistByOrgId();
        } catch (error) {
            this.toasterService.error('Update failed');
        }
    }

    async deleteGuestEmployee(employee: any) {
        this.employeeDetail = employee;
        this.deleteEmployeeName = employee.employeeName;
        this.modalService.open(this.delete, { centered: true });
    }

    async deleteConfirmed(employee: any) {
        try {
            await this.apiMainService.deleteGuestEmployee(employee._id);
            this.toasterService.success('Guest employee deleted');
            this.modalService.dismissAll();
            this.getGuestEmployeelistByOrgId();
        } catch (error) {
            this.toasterService.error('Delete failed');
        }
    }

    formatDate(date: any): string {
        if (!date) return '';
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

    cancelMultipleEmployee() {
        this.showMultipleEmployeeForm = false;
        this.addMultipleEmploeeList = [];
    }

    getInitials(name: string): string {
        if (!name) return 'GE';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
}