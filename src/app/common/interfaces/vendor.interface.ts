export interface Geolocation {
  lat: number;
  lng: number;
}

export interface GeoPoint {
  type: 'Point';
  coordinates: number[];
}

export interface CafeteriaDetails {
  cafeteria_name?: string;
  cafeteria_city?: string;
  cafeteria_location?: Geolocation;
  address1?: string;
  address2?: string;
  landmark?: string;
  location?: string;
}

export interface OrganizationDetails {
  organization_name?: string;
  organizationId?: string;
  city?: string;
  location?: string;
}

export interface OutletItem {
  outletId?: string;
  outletName?: string;
  outletType?: 'Veg' | 'NonVeg';
  outletOpened?: boolean;
  isChecked?: boolean;
  cafeteriaDetails?: CafeteriaDetails;
  organizationDetails?: OrganizationDetails;
}

export interface PopupItem {
  popupId?: string;
  popupName?: string;
  popupType?: 'Veg' | 'NonVeg';
  isChecked?: boolean;
  cafeteriaDetails?: CafeteriaDetails;
  organizationDetails?: OrganizationDetails;
}

export interface VendorFirmDetails {
  vendorFirmId?: string;
  vendorFirmName?: string;
}

export interface AddressItem {
  address1?: string;
  address2?: string;
  landmark?: string;
  location?: string;
  geolocation?: Geolocation;
}

export interface PosConfiguration {
  enablePrinter?: boolean;
  enableScanner?: boolean;
  enableSecondDisplay?: boolean;
  enableManualPrint?: boolean;
  kitchenKot?: boolean;
  userKot?: boolean;
  userKotOnlyForManual?: boolean;
}

export interface Vendor {
  _id?: string;
  vendorName: string;
  vendorPhoneNo: string;
  vendorEmail: string;
  vendorRole?: 'Owner' | 'Manager' | 'Cashier';
  outletList?: OutletItem[];
  vendorFirmDetails?: VendorFirmDetails;
  isOutletAccess?: boolean;
  isDailyAndBulkAccess?: boolean;
  isPopupAccess?: boolean;
  posEntry?: 'outlet' | 'kiosk' | 'qr';
  isPos?: boolean;
  isDashboard?: boolean;
  loginCode?: string;
  posConfiguration?: PosConfiguration;
  addressList?: AddressItem[];
  geolocation?: Geolocation;
  location?: GeoPoint;
  popup_Details?: PopupItem[];
}
