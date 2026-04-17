import { CommonSelectConfig, SubmitPayload, CommonOutletCafeSelectComponent } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { EmpPollCardComponent } from 'src/app/other-orders/emp-poll/emp-poll-card/emp-poll-card.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
    selector: 'app-org-emp-poll',
    templateUrl: './org-emp-poll.component.html',
    styleUrls: ['./org-emp-poll.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        EmpPollCardComponent,
        CommonOutletCafeSelectComponent
    ]
})
export class OrgEmpPollComponent implements OnInit, OnChanges {
    @Input() adminOrg: any;

    headerConfig: CommonSelectConfig = {
        mode: 'cafeteria',
        showDateRange: true,
        disableOrg: true,
        requireAll: true
    };

    currentFilter!: SubmitPayload;
    allPollResults: any[] = [];
    filteredList: any[] = [];
    searchQuery: string = '';
    isLoading: boolean = false;
    orgAdmin: any;

    constructor(
        private apiMainService: ApiMainService,
        private sendDataToComponent: SendDataToComponent,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
        this.subscribeEvents();
        this.updateHeaderConfig();
    }

    ngOnChanges(changes: any): void {
        if (changes['adminOrg']) {
            this.updateHeaderConfig();
        }
    }

    updateHeaderConfig() {
        if (this.adminOrg) {
            this.headerConfig.defaultOrgId = this.adminOrg._id;
            this.headerConfig.disableOrg = true;
        } else if (this.orgAdmin?.orgDetails?._id) {
            this.headerConfig.defaultOrgId = this.orgAdmin.orgDetails._id;
            this.headerConfig.disableOrg = true;
        } else {
            this.headerConfig.disableOrg = false;
        }

        if (this.orgAdmin?.role === 'HYPERPURE_POC') {
            this.headerConfig.defaultCafeId = this.orgAdmin?.cafeDetails?.[0]?.cafeteria_id;
            this.headerConfig.disableCafe = true;
        }
        
        this.headerConfig = { ...this.headerConfig };
    }

    filterSubmitted(event: SubmitPayload) {
        if (event) {
            this.currentFilter = event;
            this.getEmployeePollList();
        }
    }

    // Removed redundant getOrgList and onOrgChange as they are handled by shared component

    subscribeEvents() {
        this.sendDataToComponent.subscribe('UPDATE_EMPLOYEE_POLL_PAGE', (data) => {
            if (data && data.reload) {
                this.getEmployeePollList();
            }
        });
    }

    async getEmployeePollList() {
        if (!this.currentFilter?.org_id || !this.currentFilter?.cafeteria_id) return;

        this.allPollResults = [];
        this.filteredList = [];
        const payload: any = {
            fromDate: this.currentFilter.date_from,
            toDate: this.currentFilter.date_to,
            cafeteriaId: this.currentFilter.cafeteria_id,
            orgId: this.currentFilter.org_id
        };

        try {
            this.isLoading = true;
            const res: any[] = await this.apiMainService.getAdminEmpPolls(payload);
            if (res && res.length > 0) {
                const groupedMap = new Map<string, any>();
                res.forEach(order => {
                    if (!Array.isArray(order.mealTypeList)) return;
                    order.mealTypeList.forEach((meal: any) => {
                        if (meal.pollStatus === 'inactive') return;
                        const key = `${order.cafeteriaId}_${order.orgId}_${meal.itemName}`;
                        if (!groupedMap.has(key)) {
                            const group = {
                                customerLocation: order.customerLocation,
                                pocDetails: order.pocDetails,
                                cafeteriaId: order.cafeteriaId,
                                deliveryDate: order.deliveryDate,
                                orgId: order.orgId,
                                cafeteriaName: order.cafeteriaName,
                                orgCity: order.orgCity,
                                orgName: order.orgName,
                                pollDate: order.pollDate,
                                mealType: meal.mealType,
                                mealTypeMap: new Map<string, any>(),
                                employeeList: []
                            };
                            groupedMap.set(key, group);
                        }
                        const group = groupedMap.get(key);
                        const empExists = group.employeeList.some(
                            (e: any) =>
                                e.employeeId === order.employeeId &&
                                e.deliveredItem === meal.deliveredItem
                        );
                        if (!empExists) {
                            group.employeeList.push({
                                employeeId: order.employeeId,
                                employeeName: order.employeeName,
                                employeePhoneNo: order.employeePhoneNo,
                                employeeEmail: order.employeeEmail,
                                deliveredItem: meal.deliveredItem,
                                mealPrice: meal.mealPrice || 0
                            });
                        }
                        if (meal.deliveredItem) {
                            const existing = group.mealTypeMap.get(meal.deliveredItem);
                            if (existing) {
                                existing.count += 1;
                                existing.totalAmount += meal.mealPrice || 0;
                            } else {
                                group.mealTypeMap.set(meal.deliveredItem, {
                                    ...meal,
                                    count: 1,
                                    totalAmount: meal.mealPrice || 0
                                });
                            }
                        }
                    });
                });
                this.allPollResults = Array.from(groupedMap.values()).map(group => {
                    group.mealTypeList = Array.from(group.mealTypeMap.values());
                    delete group.mealTypeMap;
                    return group;
                });
                this.applySearchFilter();
            } else {
                this.allPollResults = [];
                this.applySearchFilter();
            }
        } catch (error) {
            console.error('Error fetching employee poll list:', error);
            this.allPollResults = [];
            this.applySearchFilter();
        } finally {
            this.isLoading = false;
        }
    }

    applySearchFilter() {
        if (!this.searchQuery) {
            this.filteredList = [...this.allPollResults];
        } else {
            const query = this.searchQuery.toLowerCase();
            this.filteredList = this.allPollResults.filter(group => {
                const matchesOrg = group.orgName?.toLowerCase().includes(query);
                const matchesCafe = group.cafeteriaName?.toLowerCase().includes(query);
                const matchesEmp = group.employeeList.some((emp: any) =>
                    emp.employeeName?.toLowerCase().includes(query) ||
                    emp.employeePhoneNo?.includes(query)
                );
                return matchesOrg || matchesCafe || matchesEmp;
            });
        }
    }


    excelExport() {
        this.exportEmployeePollToExcel();
    }

    downloadPdf() {
        console.log('PDF export not implemented for Employee Poll yet');
    }

    async exportEmployeePollToExcel() {
        if (!this.filteredList || this.filteredList.length === 0) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employee Poll');

        worksheet.columns = [
            { header: 'Poll Date', key: 'pollDate', width: 15 },
            { header: 'Delivery Date', key: 'deliveryDate', width: 15 },
            { header: 'Org Name', key: 'orgName', width: 25 },
            { header: 'Cafe Name', key: 'cafeName', width: 20 },
            { header: 'Meal Type', key: 'mealType', width: 20 },
            { header: 'Item Name', key: 'itemName', width: 25 },
            { header: 'Price', key: 'price', width: 10 },
            { header: 'Emp Name', key: 'empName', width: 20 },
            { header: 'Emp Phone', key: 'empPhone', width: 15 },
            { header: 'Emp Email', key: 'empEmail', width: 25 },
        ];

        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        this.filteredList.forEach(group => {
            if (group.employeeList && group.employeeList.length > 0) {
                group.employeeList.forEach((emp: any) => {
                    worksheet.addRow({
                        pollDate: this.formatDate(group.pollDate),
                        deliveryDate: group.deliveryDate ? this.formatDate(group.deliveryDate) : '-',
                        orgName: group.orgName,
                        cafeName: group.cafeteriaName,
                        mealType: group.mealType,
                        itemName: emp.deliveredItem || '-',
                        price: emp.mealPrice || 0,
                        empName: emp.employeeName,
                        empPhone: emp.employeePhoneNo,
                        empEmail: emp.employeeEmail
                    });
                });
            }
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `Employee_Poll_${new Date().toISOString().slice(0, 10)}.xlsx`);
    }

    formatDate(dateInput: any): string {
        if (!dateInput) return '-';
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return '-';
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }
}
