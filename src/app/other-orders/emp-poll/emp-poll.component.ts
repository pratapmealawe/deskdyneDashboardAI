import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-emp-poll',
    templateUrl: './emp-poll.component.html',
    styleUrls: ['./emp-poll.component.scss']
})
export class EmployeePollComponent implements OnInit {
    selectedPollDate: Date = new Date();
    orgList: any = [];
    cafeteriaList: any = [];
    selectedOrg: any = null;
    selectedCafeteria: any = null;
    searchPhone: string = '';
    filteredList: any[] = [];
    isLoading: boolean = false;

    constructor(
        private apiMainService: ApiMainService,
        private sendDataToComponent: SendDataToComponent,
    ) { }

    ngOnInit(): void {
        this.getOrgList();
        this.subscribeEvents();
        this.getEmployeePollList(this.selectedPollDate);
    }

    async getOrgList() {
        try {
            const res: any = await this.apiMainService.getOrgList();
            if (res && res.length > 0) {
                this.orgList = res;
            }
        } catch (error) {
            console.error('Error fetching org list:', error);
        }
    }

    onOrgChange(event: any) {
        if (event) {
            this.selectedOrg = event._id;
            this.cafeteriaList = event.cafeteriaList || [];
        } else {
            this.selectedOrg = null;
            this.cafeteriaList = [];
        }
    }

    subscribeEvents() {
        this.sendDataToComponent.subscribe('UPDATE_EMPLOYEE_POLL_PAGE', (data) => {
            if (data && data.reload) {
                this.getEmployeePollList(this.selectedPollDate);
            }
        });
    }

    async getEmployeePollList(dateInput?: any) {
        const targetDate = dateInput ? new Date(dateInput) : this.selectedPollDate;
        this.filteredList = [];
        const payload: any = {
            fromDate: targetDate,
        };
        if (this.selectedCafeteria) {
            payload['cafeteriaId'] = this.selectedCafeteria;
        }
        if (this.searchPhone) {
            payload['employeePhoneNo'] = this.searchPhone;
        }
        if (this.selectedOrg) {
            payload['org_id'] = this.selectedOrg;
        }

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
                this.filteredList = Array.from(groupedMap.values()).map(group => {
                    group.mealTypeList = Array.from(group.mealTypeMap.values());
                    delete group.mealTypeMap;
                    return group;
                });
            } else {
                this.filteredList = [];
            }
        } catch (error) {
            console.error('Error fetching employee poll list:', error);
            this.filteredList = [];
        } finally {
            this.isLoading = false;
        }
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
