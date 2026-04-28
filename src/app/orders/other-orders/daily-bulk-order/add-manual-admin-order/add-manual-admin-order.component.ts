import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { MatSelectChange } from '@angular/material/select';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-add-manual-admin-order',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './add-manual-admin-order.component.html',
  styleUrls: ['./add-manual-admin-order.component.scss']
})
export class AddManualAdminOrderComponent implements OnInit {

  // State
  organizationList: any[] = [];
  cafeteriaList: any[] = [];
  pocList: any[] = [];
  menuItems: any[] = [];
  isSubmitting = false;
  isMenuLoading = false;
  cafeteriaSelected = false;
  selectedCafe: any;
  orderForm!: FormGroup;

  constructor(
    private apiMainService: ApiMainService,
    private cdr: ChangeDetectorRef,
    public activeModal: NgbActiveModal,
    private toasterService: ToasterService
  ) { }

  //Inits
  ngOnInit(): void {
    this.initForm();
    this.getAllOrganizations();
  }

  initForm(): void {
    this.orderForm = new FormGroup({
      orgId: new FormControl('', [Validators.required]),
      orgName: new FormControl(''),
      cafeteriaId: new FormControl('', [Validators.required]),
      cafeteriaName: new FormControl(''),
      orderDate: new FormControl(new Date(), [Validators.required]),
      pocId: new FormControl(''),
      pocName: new FormControl(''),
      pocPhone: new FormControl(''),
      pocEmail: new FormControl(''),
      pocRole: new FormControl(''),
      sourceType: new FormControl('manualOrder'),
    });
  }

  getAllOrganizations(): void {
    this.apiMainService.getOrgList()
      .then((res: any) => {
        if (res) {
          this.organizationList = res;
          this.cdr.detectChanges();
        }
      })
      .catch(err => console.error('Error fetching organizations', err));
  }

  // Actions
  onOrganizationChange(event: MatSelectChange): void {
    const selectedId = event.value;
    if (!selectedId) return;

    const selectedOrg = this.organizationList.find((org: any) => org._id === selectedId);
    if (!selectedOrg) return;

    this.cafeteriaList = selectedOrg.cafeteriaList || [];
    this.pocList = selectedOrg.poc_details || [];
    this.menuItems = [];
    this.cafeteriaSelected = false;

    this.orderForm.patchValue({
      orgName: selectedOrg.organization_name,
      cafeteriaId: '',
      cafeteriaName: '',
      pocId: '',
      pocName: '',
      pocPhone: '',
      pocEmail: '',
    });
    this.cdr.detectChanges();
  }

  onCafeteriaChange(event: MatSelectChange): void {
    const selectedId = event.value;
    if (!selectedId) return;

    const selectedCafe = this.cafeteriaList.find((c: any) => c.cafeteria_id === selectedId);
    this.selectedCafe = selectedCafe;
    if (!selectedCafe) return;

    this.orderForm.patchValue({ cafeteriaName: selectedCafe.cafeteria_name });
    this.cafeteriaSelected = true;
    this.menuItems = [];
    this.loadMenuItems(selectedId);
  }

  onPocChange(event: MatSelectChange): void {
    const selectedId = event.value;
    if (!selectedId) return;

    const poc = this.pocList.find((p: any) => p.poc_id === selectedId);
    if (poc) {
      this.orderForm.patchValue({
        pocName: poc.poc_name,
        pocPhone: poc.poc_phoneNo,
        pocEmail: poc.poc_email,
        pocRole: poc.poc_role || '',
      });
    }
  }

  incrementItem(item: any): void {
    const next = (item.count || 0) + 1;
    item.count = next > 999 ? 999 : next;
  }

  decrementItem(item: any): void {
    if ((item.count || 0) > 0) item.count--;
  }

  onManualQtyInput(item: any, event: Event): void {
    const input = event.target as HTMLInputElement;
    const parsed = parseInt(input.value, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      item.count = parsed > 999 ? 999 : parsed;
      if (parsed > 999) input.value = '999';
    } else if (input.value === '') {
      item.count = 0;
    }
  }

  onManualQtyBlur(item: any, event: Event): void {
    const input = event.target as HTMLInputElement;
    const parsed = parseInt(input.value, 10);
    item.count = isNaN(parsed) || parsed < 0 ? 0 : parsed > 999 ? 999 : parsed;
    input.value = String(item.count);
  }

  trackByMealType(_: number, group: any): string {
    return group.mealTypeName;
  }

  trackByItem(_: number, item: any): string {
    return item._id || String(_);
  }

  close(): void {
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    if (this.selectedItems.length === 0) {
      this.toasterService.warning('Please select at least one item');
      return;
    }

    this.isSubmitting = true;
    const payload = this.buildOrderObj();

    this.apiMainService.saveDailyOrder(payload)
      .then((res: any) => {
        this.toasterService.success('Manual order created successfully');
        this.activeModal.close({ success: true, order: res });
      })
      .catch(err => {
        console.error('Error creating manual order', err);
        this.toasterService.error(300);
      })
      .finally(() => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
      });
  }

  // Helpers 
  get groupedMenuItems(): { mealTypeName: string; deliveryTimeFrom: string; deliveryTimeTo: string; items: any[] }[] {
    const map = new Map<string, any>();
    this.menuItems.forEach(item => {
      if (!map.has(item.mealTypeName)) {
        map.set(item.mealTypeName, {
          mealTypeName: item.mealTypeName,
          deliveryTimeFrom: item.deliveryTimeFrom,
          deliveryTimeTo: item.deliveryTimeTo,
          items: [],
        });
      }
      map.get(item.mealTypeName).items.push(item);
    });
    return Array.from(map.values());
  }

  get selectedItems(): any[] {
    return this.menuItems.filter(i => (i.count || 0) > 0);
  }

  get totalAmount(): number {
    // Uses `price` which maps from `mealPrice` in the API response via parseMenuResponse
    return this.menuItems.reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.count) || 0), 0);
  }

  get totalItemCount(): number {
    return this.menuItems.reduce((sum, i) => sum + (Number(i.count) || 0), 0);
  }

  loadMenuItems(cafeteriaId: string): void {
    this.isMenuLoading = true;
    this.apiMainService.getDailyOrderMenuByCafeteriaId(cafeteriaId)
      .then((res: any) => {
        this.menuItems = this.parseMenuResponse(res);
      })
      .catch(err => console.error('Error fetching menu', err))
      .finally(() => {
        this.isMenuLoading = false;
        this.cdr.detectChanges();
      });
  }

  private buildOrderObj(): object {
    const f = this.orderForm.value;

    const itemList = this.selectedItems.map(item => ({
      itemName: item.itemName || item.name || '',
      itemId: item._id || item.itemId || '',
      // Server reads `mealPrice` (not `price`) to compute orderAmount
      mealPrice: Number(item.price) || 0,
      price: Number(item.price) || 0,
      count: Number(item.count) || 0,
      // Server reads `selectedMealType` to set mealType on the saved doc
      selectedMealType: item.mealTypeName || '',
      mealType: item.mealTypeName || '',
      deliveryTimeFrom: item.deliveryTimeFrom || '',
      deliveryTimeTo: item.deliveryTimeTo || '',
      // Server reads `payAmtToKitchen` to compute itemAmount
      payAmtToKitchen: Number(item.payAmtToKitchen) || 0,
      deliveryCost: 0,
    }));

    // Server recomputes orderAmount/taxes/itemAmount/amount from itemList,
    // but we send them too as a safety fallback.
    const gstPercentage = 5;
    const orderAmount = itemList.reduce((sum, i) => sum + (i.mealPrice * i.count), 0);
    const taxes = parseFloat(((orderAmount / 100) * gstPercentage).toFixed(2));
    const itemAmount = itemList.reduce((sum, i) => sum + (i.payAmtToKitchen * i.count), 0);
    const deliveryCharge = 0;
    const amount = orderAmount + taxes + deliveryCharge;

    const orderDate = f.orderDate ? new Date(f.orderDate).toISOString() : new Date().toISOString();

    return {
      orgId: f.orgId,
      orgName: f.orgName,
      orgCity: this.selectedCafe?.cafeteria_city || '',
      cafeteriaId: f.cafeteriaId,
      cafeteriaName: f.cafeteriaName,
      orderDate,
      deliveryDate: orderDate,
      // Service reads these top-level fields to build pocDetails on its side
      employeeName: f.pocName || '',
      employeePhoneNo: f.pocPhone || '',
      employeeEmail: f.pocEmail || '',
      pocDetails: {
        pocId: f.pocId || '',
        pocRole: f.pocRole || '',
      },
      itemList,
      orderAmount,
      itemAmount,
      deliveryCharge,
      taxes,
      amount,
      orderstatus: 'placed',
      orderType: 'dailyBulk',
      statusHistory: [],
      customerLocation: {
        tagLocation: 'Work',
        geolocation: this.selectedCafe?.cafeteria_location || null,
        location: this.selectedCafe?.location || '',
        address: this.selectedCafe
          ? (this.selectedCafe.address1 + ', ' + this.selectedCafe.address2)
          : '',
        landmark: this.selectedCafe?.landmark || '',
      },
      sourceType: 'manualAdmin',
      specialRequest: '',
    };
  }

  private parseMenuResponse(res: any): any[] {
    const items: any[] = [];

    // API may return a single object or an array
    const data: any[] = Array.isArray(res) ? res : [res];

    data.forEach((cafeteria: any) => {
      const mealTypeList: any[] = cafeteria.mealTypeList || [];

      mealTypeList.forEach((mealType: any) => {
        // Items live in `mealConfig`, not `mealTypeList`
        const configs: any[] = mealType.mealConfig || [];

        configs
          .filter((c: any) => c.isActive)
          .forEach((config: any) => {
            items.push({
              _id: config._id,
              mealTypeId: mealType._id,
              itemName: config.itemName,
              price: config.mealPrice || 0,
              payAmtToKitchen: config.payAmtToKitchen || 0,
              mealTypeName: mealType.selectedMealType || '',
              deliveryTimeFrom: mealType.deliveryTimeFrom || '',
              deliveryTimeTo: mealType.deliveryTimeTo || '',
              cutOffTime: mealType.cutOffTime || '',
              deliveryMOQ: mealType.deliveryMOQ || 0,
              deliveryCharge: mealType.deliveryCharge || 0,
              isSameDay: config.isSameDay,
              count: 0,
            });
          });
      });
    });

    return items;
  }
}