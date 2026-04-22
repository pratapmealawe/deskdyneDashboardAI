import { Component, OnInit } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { SendDataToComponent } from '@service/sendDataToComponent.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { orderStatusMapper } from 'src/config/order-status.config';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { DailyBulkCardComponent } from './daily-bulk-card/daily-bulk-card.component';

@Component({
    selector: 'app-daily-bulk-order',
    templateUrl: './daily-bulk-order.component.html',
    styleUrls: ['./daily-bulk-order.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        DailyBulkCardComponent
    ]
})
export class DailyBulkOrderComponent implements OnInit {
    orderStatusMapper: any = orderStatusMapper;
    adminOrderStatusList = [
        { label: 'Placed', value: 'placed', count: 0 },
        { label: 'Accepted', value: 'accepted', count: 0 },
        { label: 'Preparing', value: 'preparing', count: 0 },
        { label: 'Ready For Delivery', value: 'readyForDelivery', count: 0 },
        { label: 'Agent Assigned', value: 'deliveryBoyAssigned', count: 0 },
        { label: 'Handed Over', value: 'handedOverToDeliveryBoy', count: 0 },
        { label: 'On The Way', value: 'onTheWay', count: 0 },
        { label: 'Delivered', value: 'delivered', count: 0 },
        { label: 'Completed', value: 'completed', count: 0 },
    ];

    filteredList: any[] = [];
    selectedStatus: string = 'placed';
    selectedAdminOrderDate: Date = new Date();
    isLoading: boolean = false;
    page: number = 1;
    pageLimit: number = 10;
    totalCount: number = 0;
    totalPages: number = 0;
    pageSizeOptions: number[] = [10, 20, 50, 100];
    paginationOver = false;
    lastPage: number = 1;
    pageFirstEntry: number = 1;
    pageLastEntry: number = 1;

    constructor(
        private apiMainService: ApiMainService,
        private sendDataToComponent: SendDataToComponent,
    ) { }

    ngOnInit(): void {
        this.subscribeEvents();
        this.getBulkDailyOrderList();
    }

    subscribeEvents() {
        this.sendDataToComponent.subscribe('UPDATE_DAILY_BULK_ORDER_PAGE', (data) => {
            if (data && data.reload) {
                this.getBulkDailyOrderList();
            }
        });
    }

    onAdminOrderDateChange(event: any): void {
        this.selectedAdminOrderDate = event.value;
        this.getBulkDailyOrderList();
    }

    async getBulkDailyOrderList() {
        try {
            this.isLoading = true;
            const dateParam = this.selectedAdminOrderDate ?
                this.selectedAdminOrderDate.toISOString() :
                new Date().toISOString();
            const res: any = await this.apiMainService.getCurrentDailyOrdersCount(dateParam);
            if (res) {
                this.adminOrderStatusList.forEach((status: any) => {
                    status.count = res[status.value];
                });
            }
        } catch (error) {
            console.error('Error fetching daily orders count:', error);
        } finally {
            this.isLoading = false;
        }
        this.getLatestBulkDailyOrderStatusList(this.selectedStatus);
    }

    async getLatestBulkDailyOrderStatusList(status: any) {
        this.selectedStatus = status;
        this.filteredList = [];
        this.page = 1;
        this.lastPage = 1;
        this.paginationOver = false;
        this.getOrderStatusList(status, 1);
    }

    async getOrderStatusList(status: string, pageNum: number) {
        try {
            this.isLoading = true;
            this.page = pageNum;
            const selectedDate = this.selectedAdminOrderDate || new Date();
            const startDate = selectedDate.toISOString();
            const endDate = selectedDate.toISOString();

            const res: any = await this.apiMainService.getBulkDailyOrderList(status, startDate, endDate);
            if (res) {
                this.filteredList = res.orderList;
                this.totalCount = res.totalCount;
                this.totalPages = Math.ceil(this.totalCount / this.pageLimit);
                if (this.filteredList && this.filteredList.length > 0) {
                    this.pageFirstEntry = ((pageNum - 1) * this.pageLimit) + 1;
                    this.pageLastEntry = this.pageFirstEntry + this.filteredList.length - 1;
                    if (this.filteredList.length < this.pageLimit) {
                        this.paginationOver = true;
                        this.lastPage = pageNum;
                    } else {
                        this.paginationOver = false;
                    }
                } else {
                    this.filteredList = [];
                    this.paginationOver = true;
                    this.lastPage = pageNum;
                }
            }
        } catch (error) {
            console.error('Error fetching order status list:', error);
            this.filteredList = [];
        } finally {
            this.isLoading = false;
        }
    }

    refreshOrderList() {
        this.getBulkDailyOrderList();
    }

    onPageSizeChange(newSize: number) {
        this.pageLimit = newSize;
        this.page = 1;
        this.getOrderStatusList(this.selectedStatus, this.page);
    }

    get visiblePages(): (number | string)[] {
        const total = this.totalPages;
        const current = this.page;
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | string)[] = [];
        let l: number | undefined;
        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
                range.push(i);
            }
        }
        for (const i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }
        return rangeWithDots;
    }

    goToPage(pageNum: number | string) {
        if (typeof pageNum !== 'number' || pageNum === this.page) return;
        this.page = pageNum;
        this.getOrderStatusList(this.selectedStatus, pageNum);
    }

    previous(page: number) {
        if (page <= 1) return;
        const newPage = page - 1;
        this.getOrderStatusList(this.selectedStatus, newPage);
    }

    next(page: number) {
        if (this.paginationOver || page >= this.totalPages) return;
        const newPage = page + 1;
        this.getOrderStatusList(this.selectedStatus, newPage);
    }

    async exportAdminOrdersToExcel() {
        if (!this.filteredList || this.filteredList.length === 0) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Daily Bulk Orders');

        worksheet.columns = [
            { header: 'Order No', key: 'orderNo', width: 14 },
            { header: 'Order Date', key: 'orderDate', width: 20 },
            { header: 'Delivery Date', key: 'deliveryDate', width: 16 },
            { header: 'Status', key: 'status', width: 18 },
            { header: 'POC Name', key: 'pocName', width: 20 },
            { header: 'POC Phone', key: 'pocPhone', width: 16 },
            { header: 'POC Email', key: 'pocEmail', width: 25 },
            { header: 'Organization', key: 'orgName', width: 22 },
            { header: 'Cafeteria', key: 'cafeName', width: 20 },
            { header: 'Vendor Firm', key: 'vendorFirm', width: 20 },
            { header: 'Vendor Name', key: 'vendorName', width: 18 },
            { header: 'Vendor Phone', key: 'vendorPhone', width: 16 },
            { header: 'Delivery Slot', key: 'deliverySlot', width: 20 },
            { header: 'Delivery Mode', key: 'deliveryMode', width: 16 },
            { header: 'Items', key: 'items', width: 40 },
            { header: 'Item Count', key: 'itemCount', width: 12 },
            { header: 'Subtotal (₹)', key: 'subtotal', width: 14 },
            { header: 'Delivery Charge (₹)', key: 'deliveryCharge', width: 18 },
            { header: 'Taxes (₹)', key: 'taxes', width: 12 },
            { header: 'Total Amount (₹)', key: 'totalAmount', width: 16 },
            { header: 'Paid to Kitchen (₹)', key: 'paidToKitchen', width: 18 },
            { header: 'Special Request', key: 'specialRequest', width: 30 },
            { header: 'Location', key: 'location', width: 30 },
        ];

        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FF1A1A1A' } };
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
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        });

        this.filteredList.forEach((order: any) => {
            const itemList = order.itemList || [];
            const items = itemList
                .map((i: any) => `${i.deliveredItem || i.itemName || 'N/A'} x${i.count || 1}`)
                .join(', ');
            const totalItemCount = itemList.reduce((sum: number, i: any) => sum + (i.count || 0), 0);

            const formatTime = (t: string) => {
                if (!t) return '';
                const [h, m] = t.split(':');
                let hr = parseInt(h);
                const min = parseInt(m);
                const ampm = hr >= 12 ? 'PM' : 'AM';
                hr = hr % 12 || 12;
                return `${hr}:${min < 10 ? '0' + min : min} ${ampm}`;
            };

            const slotFrom = itemList[0]?.deliveryTimeFrom || '';
            const slotTo = itemList[0]?.deliveryTimeTo || '';
            const deliverySlot = slotFrom ? `${formatTime(slotFrom)} - ${formatTime(slotTo)}` : '-';

            worksheet.addRow({
                orderNo: order.orderNo || '-',
                orderDate: this.formatDate(order.orderDate),
                deliveryDate: order.deliveryDate ? this.formatDate(order.deliveryDate) : '-',
                status: this.orderStatusMapper[order.orderstatus] || order.orderstatus || '-',
                pocName: order.pocDetails?.pocName || '-',
                pocPhone: order.pocDetails?.pocPhoneNo || '-',
                pocEmail: order.pocDetails?.pocEmail || '-',
                orgName: order.orgName || '-',
                cafeName: order.cafeteriaName || '-',
                vendorFirm: order.vendorFirmName || '-',
                vendorName: order.vendorName || '-',
                vendorPhone: order.vendorPhoneNo || '-',
                deliverySlot: deliverySlot,
                deliveryMode: order.deliveryVendor || 'Standard',
                items: items || '-',
                itemCount: totalItemCount,
                subtotal: order.orderAmount || 0,
                deliveryCharge: order.deliveryCharge || 0,
                taxes: order.taxes || 0,
                totalAmount: order.amount || 0,
                paidToKitchen: order.amtAfterCommisionPaidToKitchen || order.itemAmount || 0,
                specialRequest: order.specialRequest || '-',
                location: order.customerLocation?.location || order.customerLocation?.address || order.orgCity || '-',
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `Daily_Bulk_Orders_${new Date().toISOString().slice(0, 10)}.xlsx`);
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
