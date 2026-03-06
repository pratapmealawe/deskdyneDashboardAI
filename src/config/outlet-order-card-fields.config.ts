/**
 * Outlet Order Card — Field Reference
 * ------------------------------------
 * Documents every field rendered on the Outlet Order card in the
 * orders component (orders.component.html).
 *
 * Sections map directly to the card layout:
 *   Header  →  Body (Customer | Items)  →  Footer (Financials + Meta)
 */

export const OUTLET_ORDER_CARD_SECTIONS = {

    /** ── Card Header Strip ───────────────────────────────────── */
    header: {
        fields: [
            { key: 'orderNo', label: 'Order #', type: 'number' },
            { key: 'tokenNo', label: 'Token', type: 'number' },
            { key: 'orderDate', label: 'Date', type: 'date' },
            { key: 'orderstatus', label: 'Status', type: 'status' },
        ],
    },

    /** ── Customer Info (Body – Left) ─────────────────────────── */
    customer: {
        fields: [
            { key: 'customerName', label: 'Name', type: 'string' },
            { key: 'customerPhoneNo', label: 'Phone', type: 'string' },
            { key: 'customerEmail', label: 'Email', type: 'string', conditional: true },
        ],
    },

    /** ── Organization / Cafeteria Badges (Body – Left) ────────── */
    organization: {
        fields: [
            { key: 'organizationDetails.organization_name', label: 'Organization', type: 'string', conditional: true },
            { key: 'cafeteriaDetails.cafeteria_name', label: 'Cafeteria', type: 'string', conditional: true },
        ],
    },

    /** ── Order Flags (Body – Left) ────────────────────────────── */
    orderFlags: {
        fields: [
            { key: 'isPreOrder', label: 'Pre-Order', type: 'boolean', conditional: true },
            { key: 'preOrderMealType', label: 'Meal Type', type: 'string', conditional: true },
            { key: 'isCabinOrder', label: 'Cabin Order', type: 'boolean', conditional: true },
            { key: 'cabinConfig.cabinName', label: 'Cabin Name', type: 'string', conditional: true },
            { key: 'orderCreatedBy', label: 'Created By', type: 'string' },
        ],
    },

    /** ── Item List (Body – Right) ─────────────────────────────── */
    items: {
        arrayKey: 'itemList',
        fields: [
            { key: 'itemName', label: 'Item', type: 'string' },
            { key: 'count', label: 'Qty', type: 'number' },
            { key: 'price', label: 'Price', type: 'currency' },
            { key: 'itemType', label: 'Type', type: 'string' },  // Veg / Non-Veg
            { key: 'category', label: 'Category', type: 'string' },
        ],
    },

    /** ── Financials (Footer) ──────────────────────────────────── */
    financials: {
        fields: [
            { key: 'itemAmount', label: 'Item Total', type: 'currency' },
            { key: 'taxes', label: 'Taxes', type: 'currency', conditional: true },
            { key: 'packagingAmount', label: 'Packaging', type: 'currency', conditional: true },
            { key: 'subsidyAmount', label: 'Subsidy', type: 'currency', conditional: true },
            { key: 'moneyWalletPointsUsed', label: 'Wallet Used', type: 'currency', conditional: true },
            { key: 'companyWalletPointUsed', label: 'Company Wallet', type: 'currency', conditional: true },
            { key: 'amount', label: 'Paid (PG)', type: 'currency' },
        ],
        /** Grand Total = itemAmount + taxes + packagingAmount */
        grandTotalFormula: 'itemAmount + taxes + packagingAmount',
    },

    /** ── Payment & Device Meta (Footer – small badges) ────────── */
    metadata: {
        fields: [
            { key: 'pgName', label: 'PG', type: 'string' },
            { key: 'appVersion', label: 'App', type: 'string', conditional: true },
            { key: 'deviceInfo.model', label: 'Device', type: 'string', conditional: true },
            { key: 'deviceInfo.platform', label: 'Platform', type: 'string', conditional: true },
        ],
    },

    /** ── Special Request (Footer – callout) ───────────────────── */
    specialRequest: {
        fields: [
            { key: 'specialRequest', label: 'Special Request', type: 'string', conditional: true },
        ],
    },
};
