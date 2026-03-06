import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';
import { CreateNotificationComponent } from '../create-notification/create-notification.component';

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
    isLoading = false;
    filterStatus = '';
    fromDate: Date | null = null;
    toDate: Date | null = null;
    notificationList: any[] = [];
    pagedNotificationList: any[] = [];
    pageSize = 10;
    pageIndex = 0;

    constructor(
        private apiMainService: ApiMainService,
        private toaster: ToasterService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.fetchNotifications();
    }

    async fetchNotifications() {
        this.isLoading = true;
        const params: any = {};
        if (this.filterStatus && this.filterStatus !== 'all') params.status = this.filterStatus;
        if (this.fromDate) params.fromDate = this.fromDate.toISOString();
        if (this.toDate) params.toDate = this.toDate.toISOString();

        try {
            console.log(params);
            const res: any = await this.apiMainService.getScheduledNotifications(params);
            console.log(res);
            this.isLoading = false;

            if (res && res.length > 0) {
                this.notificationList = res || [];
                // Reset to first page when fetching new data
                this.pageIndex = 0;
                this.updatePagedList();
            } else {
                this.notificationList = [];
                this.pagedNotificationList = [];
            }
        } catch (err: any) {
            this.isLoading = false;
            this.toaster.error('Error fetching notifications');
            console.error(err);
        }
    }

    onPageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePagedList();
    }

    updatePagedList() {
        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedNotificationList = this.notificationList.slice(startIndex, endIndex);
    }

    applyFilter() {
        this.fetchNotifications();
    }

    resetFilter() {
        this.filterStatus = '';
        this.fromDate = null;
        this.toDate = null;
        this.fetchNotifications();
    }

    openCreateDialog(data?: any) {
        const dialogRef = this.dialog.open(CreateNotificationComponent, {
            width: '600px',
            disableClose: true,
            data: data // Pass data if available
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.fetchNotifications();
            }
        });
    }

    resendNotification(notification: any) {
        this.openCreateDialog(notification);
    }

    async cancelNotification(notification: any) {
        if (confirm(`Are you sure you want to cancel notification "${notification.title}"?`)) {
            try {
                const res: any = await this.apiMainService.cancelScheduledNotification(notification._id);
                if (res && res.status) {
                    this.toaster.success('Notification cancelled successfully');
                    this.fetchNotifications();
                } else {
                    this.toaster.error(res.message || 'Failed to cancel notification');
                }
            } catch (err: any) {
                this.toaster.error('Error cancelling notification');
                console.error(err);
            }
        }
    }
}
