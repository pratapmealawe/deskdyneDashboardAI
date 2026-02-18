import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { orderStatusMapper } from 'src/config/order-status.config';

@Component({
  selector: 'app-other-orders',
  templateUrl: './other-orders.component.html',
  styleUrls: ['./other-orders.component.scss']
})
export class OtherOrdersComponent implements OnInit {
  orderTypeList = [
    { name: 'Admin Orders', path: 'adminOrders', },
    { name: 'Bulk Orders', path: 'bulkOrders', },
    { name: 'Employee Poll', path: 'employeePoll', }
  ];
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
  selectedTabIndex = 0;
  selectedTab = 'adminOrders';
  filteredList: any[] = [];
  selectedPollDate: Date = new Date();
  orgList: any = [];
  cafeteriaList: any = [];
  selectedOrg: any = null;
  selectedCafeteria: any = null;
  selectedStatus: string = 'placed';
  bulkOrderSelectedStatus: string = 'waitingForApproval';
  page: number = 1;
  pageLimit: number = 10;
  totalCount: number = 0;
  totalPages: number = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  paginationOver = false;
  lastPage: number = 1;
  searchPhone: string = '';
  pageFirstEntry: number = 1;
  pageLastEntry: number = 1;
  isLoading: boolean = false;
  selectedAdminOrderDate: Date = new Date();
  constructor(
    private apiMainService: ApiMainService,
    private sendDataToComponent: SendDataToComponent,
  ) { }

  ngOnInit(): void {
    this.getOrgList();
    this.subscribeEvents();
    this.onTabChange({ index: 0 });
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

  onDateChange(event: any) {
    this.selectedPollDate = event.value;
    this.getEmployeePollList(this.selectedPollDate);
  }

  getTabIcon(path: string): string {
    const icons: { [key: string]: string } = {
      'adminOrders': 'receipt_long',
      'bulkOrders': 'inventory_2',
      'employeePoll': 'how_to_vote'
    };
    return icons[path] || 'folder';
  }

  onCustomTabChange(index: number): void {
    this.onTabChange({ index });
  }

  onAdminOrderDateChange(event: any): void {
    this.selectedAdminOrderDate = event.value;
    this.getBulkDailyOrderList();
  }


  subscribeEvents() {
    this.sendDataToComponent.subscribe('UPDATE_BULK_ORDER_PAGE', (data) => {
      if (data && data.reload) {
        if (this.selectedTab === 'employeePoll') {
          this.getEmployeePollList(this.selectedPollDate);
        } else if (this.selectedTab === 'bulkOrders') {
          this.getb2bBulkOrderList();
        } else if (this.selectedTab === 'adminOrders') {
          this.getBulkDailyOrderList();
        }
      }
    });
  }

  onTabChange(event: any): void {
    this.selectedTabIndex = event.index;
    this.selectedTab = this.orderTypeList[event.index].path;
    this.filteredList = [];
    this.page = 1;
    if (this.selectedTab === 'employeePoll') {
      this.selectedPollDate = new Date();
      this.getEmployeePollList(this.selectedPollDate);
    } else if (this.selectedTab === 'bulkOrders') {
      this.getb2bBulkOrderList();
      this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, this.page);
    } else if (this.selectedTab === 'adminOrders') {
      this.getBulkDailyOrderList();
    }
  }

  async getEmployeePollList(dateInput?: any) {
    const targetDate = dateInput ? new Date(dateInput) : this.selectedPollDate;
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;
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
        console.log(res);
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

  async getBulkDailyOrderList() {
    try {
      this.isLoading = true;
      const dateParam = this.selectedAdminOrderDate ?
        new Date(this.selectedAdminOrderDate) :
        new Date();
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

  async getb2bBulkOrderList() {
    // Reset counts first
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
      const dateStr = this.selectedAdminOrderDate ?
        new Date(this.selectedAdminOrderDate) :
        new Date();
      const res: any = await this.apiMainService.getBulkDailyOrderList(status, this.page, this.pageLimit, dateStr);
      console.log(res);

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

  async getClusterb2bBulkOrderList(status: string, pageNum: number) {
    try {
      this.isLoading = true;
      this.bulkOrderSelectedStatus = status;
      const res: any = await this.apiMainService.getClusterb2bBulkOrderList(status, pageNum, this.pageLimit);
      if (res) {
        this.filteredList = res;
        this.totalCount = res.length;
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

  onStatusChanged(status: any) {
    if (status) {
      this.getb2bBulkOrderList();
      this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, this.page);
    }
  }

  onPageSizeChange(newSize: number) {
    this.pageLimit = newSize;
    this.page = 1;

    if (this.selectedTab === 'adminOrders') {
      this.getOrderStatusList(this.selectedStatus, this.page);
    }

    if (this.selectedTab === 'bulkOrders') {
      this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, this.page);
    }
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

    if (this.selectedTab === 'adminOrders') {
      this.getOrderStatusList(this.selectedStatus, pageNum);
    }

    if (this.selectedTab === 'bulkOrders') {
      this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, pageNum);
    }
  }

  previous(page: number) {
    if (page <= 1) return;

    const newPage = page - 1;

    if (this.selectedTab === 'adminOrders') {
      this.getOrderStatusList(this.selectedStatus, newPage);
    }

    if (this.selectedTab === 'bulkOrders') {
      this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, newPage);
    }
  }

  next(page: number) {
    if (this.paginationOver || page >= this.totalPages) return;

    const newPage = page + 1;

    if (this.selectedTab === 'adminOrders') {
      this.getOrderStatusList(this.selectedStatus, newPage);
    }

    if (this.selectedTab === 'bulkOrders') {
      this.getClusterb2bBulkOrderList(this.bulkOrderSelectedStatus, newPage);
    }
  }

  refreshOrderList() {
    if (this.selectedTab === 'adminOrders') {
      this.getBulkDailyOrderList();
    } else if (this.selectedTab === 'bulkOrders') {
      this.getb2bBulkOrderList();
    }
  }

  async exportAdminOrdersToExcel() {
    if (!this.filteredList || this.filteredList.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Admin Orders');

    worksheet.columns = [
      { header: 'Order No', key: 'orderNo', width: 15 },
      { header: 'Date', key: 'orderDate', width: 20 },
      { header: 'Delivery Date', key: 'deliveryDate', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Customer Name', key: 'customerName', width: 20 },
      { header: 'Customer Phone', key: 'customerPhone', width: 15 },
      { header: 'Org Name', key: 'orgName', width: 25 },
      { header: 'Cafe Name', key: 'cafeName', width: 20 },
      { header: 'Items', key: 'items', width: 40 },
      { header: 'Bill Amount', key: 'billAmount', width: 15 },
      { header: 'Address', key: 'address', width: 30 },
    ];

    // Add Header Row
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

    this.filteredList.forEach(order => {
      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count}`)
        .join(', ');

      worksheet.addRow({
        orderNo: order.orderNo || '-',
        orderDate: this.formatDate(order.orderDate),
        deliveryDate: order.deliveryDate ? this.formatDate(order.deliveryDate) : '-',
        status: this.orderStatusMapper[order.orderstatus] || order.orderstatus,
        customerName: order.customerName || '-',
        customerPhone: order.customerPhoneNo || '-',
        orgName: order.organizationDetails?.organization_name || '-',
        cafeName: order.cafeteriaDetails?.cafeteria_name || '-',
        items: items,
        billAmount: order.amount || 0,
        address: order.address || '-'
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Admin_Orders_${new Date().toISOString().slice(0, 10)}.xlsx`);
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

    // Add Header Row
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

    // Flatten data
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
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // 0-based month
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }
}