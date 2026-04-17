import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { BulkOrderCardComponent } from './bulk-order-card/bulk-order-card.component';

@Component({
    selector: 'app-bulk-order',
    templateUrl: './bulk-order.component.html',
    styleUrls: ['./bulk-order.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        BulkOrderCardComponent
    ]
})
export class BulkOrderComponent implements OnInit {
    bulkOrderStatusList = [
        { label: 'Waiting For Approval', value: 'waitingForApproval', count: 0 },
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
    selectedStatus: string = 'waitingForApproval';
    bulkOrderSelectedStatus: string = 'waitingForApproval';

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
        this.getb2bBulkOrderList();
        this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, this.page);
    }

    subscribeEvents() {
        this.sendDataToComponent.subscribe('UPDATE_BULK_ORDER_PAGE', (data) => {
            if (data && data.reload) {
                this.getb2bBulkOrderList();
                this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, this.page);
            }
        });
    }

    async getb2bBulkOrderList() {
        this.bulkOrderStatusList.forEach((status: any) => {
            status.count = 0;
        });

        try {
            this.isLoading = true;
            const res: any = await this.apiMainService.getCurrentB2BOrdersCount();
            if (res) {
                this.bulkOrderStatusList.forEach((status: any) => {
                    status.count = res[status.value];
                });
            }
        } catch (error) {
            console.error('Error fetching B2B orders count:', error);
        } finally {
            this.isLoading = false;
        }
    }

    async getClusterb2bBulkOrderList(status: string, pageNum: number) {
        try {
            this.isLoading = true;
            this.selectedStatus = status;
            this.bulkOrderSelectedStatus = status;
            this.page = pageNum;
            const res: any = await this.apiMainService.getClusterb2bBulkOrderList(status, pageNum, this.pageLimit);
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
            console.error('Error fetching cluster B2B bulk order list:', error);
            this.filteredList = [];
        } finally {
            this.isLoading = false;
        }
    }

    refreshOrderList() {
        this.getb2bBulkOrderList();
        this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, this.page);
    }

    onStatusChanged(status: any) {
        if (status) {
            this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, this.page);
        }
    }

    onPageSizeChange(newSize: number) {
        this.pageLimit = newSize;
        this.page = 1;
        this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, this.page);
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
        this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, pageNum);
    }

    previous(page: number) {
        if (page <= 1) return;
        const newPage = page - 1;
        this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, newPage);
    }

    next(page: number) {
        if (this.paginationOver || page >= this.totalPages) return;
        const newPage = page + 1;
        this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, newPage);
    }
}
