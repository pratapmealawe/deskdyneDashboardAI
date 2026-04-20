import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime } from 'rxjs/operators';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';

@Component({
    selector: 'app-add-auto-rule',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule],
    templateUrl: './add-auto-rule.component.html',
    styleUrls: ['./add-auto-rule.component.scss']
})

export class AddAutoRuleComponent implements OnInit {
    ruleForm: FormGroup = new FormGroup({
        level: new FormControl('CAFETERIA', Validators.required),
        cafeteria_id: new FormControl('', Validators.required),
        employee_id: new FormControl('', Validators.required),
        employeeSearch: new FormControl(''),
        ruleType: new FormControl('AUTO_CREDIT', Validators.required),
        frequency: new FormControl('MONTHLY', Validators.required),
        points: new FormControl(500, [Validators.required, Validators.min(1)]),
        walletType: new FormControl('billing', Validators.required),
        expiryDays: new FormControl(30, [Validators.required, Validators.min(1)]),
        allowedOrderTypes: new FormControl([], Validators.required)
    });
    levels = [
        { label: 'Cafeteria', value: 'CAFETERIA' },
        { label: 'Employee', value: 'EMPLOYEE' }
    ];
    frequencies = [
        { label: 'Daily', value: 'DAILY' },
        { label: 'Weekly', value: 'WEEKLY' },
        { label: 'Monthly', value: 'MONTHLY' }
    ];
    walletTypes = [
        { label: 'Billing', value: 'billing' },
        { label: 'Complimentary', value: 'complimentary' }
    ];
    allowedOrderTypesList = [
        { label: 'Outlet Order', value: 'outletOrder' },
        { label: 'Event Order', value: 'eventOrder' },
        { label: 'Subscription Package', value: 'subscriptionPackage' },
    ];

    cafeteriaList: any[] = [];
    filteredEmployees: any[] = [];
    isLoadingEmployees = false;
    orgObj: any;
    isEdit = false;

    constructor(
        private apiMainService: ApiMainService,
        private toasterService: ToasterService,
        public dialogRef: MatDialogRef<AddAutoRuleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.orgObj = this.data.orgObj;
        this.cafeteriaList = this.orgObj?.cafeteriaList || [];
        this.isEdit = !!this.data.rule;
        const allowedOrderTypes = this.allowedOrderTypesList.map((type: any) => type.value) || [];
        if (this.isEdit) {
            this.ruleForm.patchValue({
                level: this.data.rule?.level,
                cafeteria_id: this.data.rule?.cafeteria_id,
                employee_id: this.data.rule?.employee_id,
                employeeSearch: '',
                ruleType: 'AUTO_CREDIT',
                frequency: this.data.rule?.frequency,
                points: this.data.rule?.points,
                walletType: this.data.rule?.walletType,
                expiryDays: this.data.rule?.expiryDays,
                allowedOrderTypes: this.data.rule?.allowedOrderTypes || allowedOrderTypes
            });
        }
        if (this.isEdit && this.data.rule?.level === 'EMPLOYEE') {
            const empName = this.data.rule.employeeName || this.data.rule.employee_id;
            this.ruleForm.patchValue({ employeeSearch: empName });
            this.selectedEmployee = this.data.rule;
        }
        this.ruleForm.get('level')?.valueChanges.subscribe(val => {
            this.updateValidators(val);
        });
        this.ruleForm.get('frequency')?.valueChanges.subscribe(val => {
            if (val === 'DAILY') {
                this.ruleForm.patchValue({ expiryDays: 1 });
            } else if (val === 'WEEKLY') {
                this.ruleForm.patchValue({ expiryDays: 7 });
            } else if (val === 'MONTHLY') {
                this.ruleForm.patchValue({ expiryDays: 30 });
            }
        });
        this.ruleForm.get('employeeSearch')?.valueChanges.pipe(
            debounceTime(300)
        ).subscribe(value => {
            if (typeof value === 'string' && value.length > 2) {
                this.searchEmployees(value);
            }
        });
        this.updateValidators(this.ruleForm.get('level')?.value);
    }

    updateValidators(level: string) {
        const cafeCtrl = this.ruleForm.get('cafeteria_id');
        const empCtrl = this.ruleForm.get('employee_id');
        if (level === 'CAFETERIA') {
            cafeCtrl?.setValidators(Validators.required);
            empCtrl?.clearValidators();
        } else if (level === 'EMPLOYEE') {
            cafeCtrl?.clearValidators();
            empCtrl?.setValidators(Validators.required);
        }
        cafeCtrl?.updateValueAndValidity();
        empCtrl?.updateValueAndValidity();
    }

    searchEmployees(query: string) {
        this.isLoadingEmployees = true;
        const payload = {
            organization_id: this.orgObj._id,
            page: 1,
            pageSize: 20,
            search: query,
            cafeteriaId: this.ruleForm.get('cafeteria_id')?.value
        };
        this.apiMainService.getCompanyWalletCafeteriaDetails(payload).then((res: any) => {
            this.filteredEmployees = res.data || [];
            this.isLoadingEmployees = false;
        }).catch(() => {
            this.isLoadingEmployees = false;
        });
    }

    selectedEmployee: any;

    selectEmployee(emp: any) {
        this.selectedEmployee = emp;
        this.ruleForm.patchValue({
            employee_id: emp._id || emp.employeeId || emp.id,
            employeeSearch: emp.employeeName
        });
    }

    displayFn(emp: any): string {
        return emp && emp.employeeName ? emp.employeeName : '';
    }

    onSubmit() {
        if (this.ruleForm.valid) {
            const formValue = this.ruleForm.getRawValue();
            let payload: any = {
                level: formValue.level,
                organization_id: this.orgObj._id,
                ruleType: formValue.ruleType,
                frequency: formValue.frequency,
                points: formValue.points,
                walletType: formValue.walletType,
                allowedOrderTypes: Array.isArray(formValue.allowedOrderTypes) ? formValue.allowedOrderTypes : [formValue.allowedOrderTypes],
                expiryDays: formValue.expiryDays
            };

            if (formValue.level === 'CAFETERIA') {
                payload.cafeteriaId = formValue.cafeteria_id;
            } else if (formValue.level === 'EMPLOYEE') {
                const emp = this.selectedEmployee || this.data.rule;
                if (emp) {
                    payload.employeePhoneNo = emp.employeePhoneNo;
                    payload.employeeEmail = emp.employeeEmail;
                }
                if (formValue.employee_id) payload.employee_id = formValue.employee_id;
            }

            // Check for duplicates
            const existingRules = this.data.autoRules || [];

            let isDuplicate = false;

            if (payload.level === 'CAFETERIA') {
                isDuplicate = existingRules.some((r: any) => {
                    const existingId = r.cafeteriaId || r.cafeteria_id;
                    const newId = payload.cafeteriaId;
                    const matches = r.level === 'CAFETERIA' && existingId === newId;
                    return matches && (!this.isEdit || r._id !== this.data.rule._id);
                });
            } else if (payload.level === 'EMPLOYEE') {
                isDuplicate = existingRules.some((r: any) => {
                    const existingId = r.employeeId || r.employee_id || r.employee?._id;
                    const newId = payload.employee_id;
                    const matches = r.level === 'EMPLOYEE' && existingId === newId;
                    return matches && (!this.isEdit || r._id !== this.data.rule._id);
                });
            }

            if (isDuplicate) {
                this.toasterService.warning('A rule for this target already exists.');
                return;
            }

            if (this.isEdit) {
                this.apiMainService.updateAutoRule(this.data.rule._id, payload).then(res => {
                    this.dialogRef.close(true);
                }, (err) => {
                    this.dialogRef.close(false);
                });
            } else {
                this.apiMainService.createAutoRule(payload).then(res => {
                    this.dialogRef.close(true);
                }, (err) => {
                    this.dialogRef.close(false);
                });
            }
        } else {
            this.ruleForm.markAllAsTouched();
        }
    }

    onCancel() {
        this.dialogRef.close();
    }
}