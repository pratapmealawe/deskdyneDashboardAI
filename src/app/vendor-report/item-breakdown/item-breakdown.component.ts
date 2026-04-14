import { Component, computed, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ExcelService } from 'src/service/excel.service';

// Option A: namespaced
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

type BreakdownMode = 'item' | 'type' | 'category' | 'mrpSplit';

type MrpSplitRow = {
  label: string;        // "MRP Items" / "Non-MRP Items"
  gross: number;        // sum of commissionBreakup.*.gross
  base: number;         // sum of commissionBreakup.*.base
  commissionAmt: number; // sum of commissionBreakup.*.commissionAmt
};

type MrpSplitPdfRow = {
  'Type': string;
  'Gross Amount': string;
  'Base Amount': string;
  'Commission Amount': string;
};

export interface ItemBreakdownDialogData {
  orders: any[];
  rangeLabel?: string;

  header?: {
    cafeteriaName?: string;
    counterName?: string;
    gstNumber?: string;
    fssaiNumber?: string;
    createdBetween?: string;     // e.g. "Wed, 09 Jul, 2025, 5:30 am - Wed, 09 Jul, 2025, 5:30 am"
    logoBase64?: string;         // optional base64 logo (data:image/png;base64,...)
  };
}

type GroupRow = { key: string; count: number; totalPrice: number };

type ItemRow = { 'Item Name': string; 'Price': string; 'Quantity': number; 'Final Amount': string };
type GroupRowItemType = { 'Item Type': string; 'Quantity': number; 'Final Amount': string };
type GroupRowCategory = { 'Category': string; 'Quantity': number; 'Final Amount': string };

type AnyRow = ItemRow | GroupRowItemType | GroupRowCategory | MrpSplitPdfRow;

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-item-breakdown',
  templateUrl: './item-breakdown.component.html',
  styleUrls: ['./item-breakdown.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ItemBreakdownComponent {
  orders: any[] = [];

  // Groupers (computed once from parent orders)
  byItem = computed<GroupRow[]>(() => this.group(this.orders, 'item'));
  byType = computed<GroupRow[]>(() => this.group(this.orders, 'type'));
  byCategory = computed<GroupRow[]>(() => this.group(this.orders, 'category'));

  // Pagination state (signals)
  pageSizeOptions = [5, 10, 25, 50, 100];

  itemPageIndex = signal(0);
  itemPageSize = signal(5);

  typePageIndex = signal(0);
  typePageSize = signal(5);

  catPageIndex = signal(0);
  catPageSize = signal(5);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ItemBreakdownDialogData,
    public ref: MatDialogRef<ItemBreakdownComponent>,
    private excel: ExcelService
  ) {
    this.orders = Array.isArray(data?.orders) ? data.orders : [];
  }

  // Paged views
  byItemPaged = computed(() => this.slice(this.byItem(), this.itemPageIndex(), this.itemPageSize()));
  byTypePaged = computed(() => this.slice(this.byType(), this.typePageIndex(), this.typePageSize()));
  byCategoryPaged = computed(() => this.slice(this.byCategory(), this.catPageIndex(), this.catPageSize()));

  // Handlers
  onItemPage(e: PageEvent) { this.itemPageIndex.set(e.pageIndex); this.itemPageSize.set(e.pageSize); }
  onTypePage(e: PageEvent) { this.typePageIndex.set(e.pageIndex); this.typePageSize.set(e.pageSize); }
  onCatPage(e: PageEvent) { this.catPageIndex.set(e.pageIndex); this.catPageSize.set(e.pageSize); }

  // Utils
  private slice<T>(arr: T[], idx: number, size: number): T[] {
    const start = idx * size;
    return arr.slice(start, start + size);
  }

  private group(orders: any[], mode: BreakdownMode): GroupRow[] {
    const m = new Map<string, GroupRow>();
    for (const o of orders || []) {
      for (const it of o?.itemList || []) {
        const name = (it?.itemName ?? '').trim() || '(Unnamed Item)';
        const type = it?.itemType ?? '';
        const cat = (it?.category ?? '') || ''; // normalize null -> ''

        const cnt = Number(it?.count ?? 0);
        const price = Number(it?.price ?? 0);

        const key = mode === 'item' ? name : mode === 'type' ? type : cat;
        const row = m.get(key) ?? { key, count: 0, totalPrice: 0 };
        row.count += cnt;
        row.totalPrice += cnt * price;
        if (!m.has(key)) m.set(key, row);
      }
    }
    return Array.from(m.values()).sort((a, b) => b.totalPrice - a.totalPrice);
  }

  // MRP vs Non-MRP (from commissionBreakup)
  mrpSplit = computed<MrpSplitRow[]>(() => {
    const acc = {
      mrp: { label: 'MRP Items', gross: 0, base: 0, commissionAmt: 0 },
      normal: { label: 'Non-MRP Items', gross: 0, base: 0, commissionAmt: 0 },
    };

    for (const o of this.orders || []) {
      const cb = o?.commissionBreakup;
      if (cb?.mrp) {
        acc.mrp.gross += Number(cb.mrp.gross || 0);
        acc.mrp.base += Number(cb.mrp.base || 0);
        acc.mrp.commissionAmt += Number(cb.mrp.commissionAmt || 0);
      }
      if (cb?.normal) {
        acc.normal.gross += Number(cb.normal.gross || 0);
        acc.normal.base += Number(cb.normal.base || 0);
        acc.normal.commissionAmt += Number(cb.normal.commissionAmt || 0);
      }
    }

    return [acc.mrp, acc.normal];
  });


  export(which: BreakdownMode) {
    let rows: any[] = [];

    if (which === 'item') {
      rows = this.byItem().map(r => ({
        Item: r.key,
        Count: r.count,
        TotalPrice: r.totalPrice
      }));
    } else if (which === 'type') {
      rows = this.byType().map(r => ({
        ItemType: r.key || '-',
        Count: r.count,
        TotalPrice: r.totalPrice
      }));
    } else if (which === 'category') {
      rows = this.byCategory().map(r => ({
        Category: r.key || '-',
        Count: r.count,
        TotalPrice: r.totalPrice
      }));
    } else if (which === 'mrpSplit') {
      rows = this.mrpSplit().map(r => ({
        Type: r.label,
        Gross: r.gross,
        Base: r.base,
        Commission: r.commissionAmt,
      }));
    }

    // 🧮 compute totals
    const totalCount =
      which === 'mrpSplit'
        ? 0 // no quantity in this view
        : rows.reduce((sum, r) => sum + Number(r.Count || 0), 0);

    const totalPrice = rows.reduce((sum, r) => {
      if (which === 'mrpSplit') {
        return sum + Number(r.Gross || 0);  // or Commission, depends what you want
      }
      return sum + Number(r.TotalPrice || 0);
    }, 0);

    // ➕ append a blank row + totals row for Excel readability
    rows.push({});
    if (which === 'item') {
      rows.push({
        Item: 'TOTAL',
        Count: totalCount,
        TotalPrice: totalPrice,
      });
    } else if (which === 'type') {
      rows.push({
        ItemType: 'TOTAL',
        Count: totalCount,
        TotalPrice: totalPrice,
      });
    } else if (which === 'category') {
      rows.push({
        Category: 'TOTAL',
        Count: totalCount,
        TotalPrice: totalPrice,
      });
    } else if (which === 'mrpSplit') {
      rows.push({
        Type: 'TOTAL',
        Gross: totalPrice, // total gross combined
        Base: this.mrpSplit().reduce((s, r) => s + r.base, 0),
        Commission: this.mrpSplit().reduce((s, r) => s + r.commissionAmt, 0),
      });
    }

    const title = (this.data.rangeLabel || 'Selected').replace(/[^a-z0-9-_]+/gi, '_');
    const fname =
      which === 'item'
        ? `ItemBreakdown_${title}`
        : which === 'type'
          ? `ItemTypeBreakdown_${title}`
          : which === 'category'
            ? `CategoryBreakdown_${title}`
            : `MrpSplitBreakdown_${title}`;

    this.excel.download(rows, fname);
  }


  // ---------- PDF export (revamped to match sample) ----------
  exportPdf(which: BreakdownMode) {
    const rows = this.buildRowsForPdf(which);

    const isItem = which === 'item';

    const headerCells = isItem
      ? ['Item Name', 'Price', 'Quantity', 'Final Amount']
      : which === 'type'
        ? ['Item Type', 'Quantity', 'Final Amount']
        : which === 'category'
          ? ['Category', 'Quantity', 'Final Amount']
          : ['Type', 'Gross Amount', 'Base Amount', 'Commission Amount'];

    const widths = isItem
      ? ['*', 60, 60, 80]
      : which === 'mrpSplit'
        ? ['*', 80, 80, 90]
        : ['*', 60, 90];

    const body: any[] = [];

    // header
    body.push(
      headerCells.map(h => ({
        text: h,
        style: 'th',
        alignment: (h === 'Item Name' || h === 'Item Type' || h === 'Category') ? 'left' : 'right'
      }))
    );

    // rows
    for (const r of rows.data) {
      if (isItem) {
        const ir = r as ItemRow;
        body.push([
          { text: ir['Item Name'] ?? '-', alignment: 'left' },
          { text: ir['Price'] ?? '-', alignment: 'right' },
          { text: String(ir['Quantity'] ?? ''), alignment: 'right' },
          { text: ir['Final Amount'] ?? '-', alignment: 'right' },
        ]);
      } else if (which === 'type') {
        const gr = r as GroupRowItemType;
        body.push([
          { text: gr['Item Type'] ?? '-', alignment: 'left' },
          { text: String(gr['Quantity'] ?? ''), alignment: 'right' },
          { text: gr['Final Amount'] ?? '-', alignment: 'right' },
        ]);
      } else if (which === 'category') {
        const gr = r as GroupRowCategory;
        body.push([
          { text: gr['Category'] ?? '-', alignment: 'left' },
          { text: String(gr['Quantity'] ?? ''), alignment: 'right' },
          { text: gr['Final Amount'] ?? '-', alignment: 'right' },
        ]);
      } else if (which === 'mrpSplit') {
        const gr = r as MrpSplitPdfRow;
        body.push([
          { text: gr['Type'] ?? '-', alignment: 'left' },
          { text: gr['Gross Amount'] ?? '-', alignment: 'right' },
          { text: gr['Base Amount'] ?? '-', alignment: 'right' },
          { text: gr['Commission Amount'] ?? '-', alignment: 'right' },
        ]);
      }
    }

    // optional TOTAL row (works for both shapes)
    body.push([{ text: '', colSpan: headerCells.length, border: [false, false, false, false] }, ...Array(headerCells.length - 1).fill({})]);
    const totalRow =
      which === 'item'
        ? [
          { text: 'TOTAL', style: 'th', alignment: 'left' },
          { text: '-', alignment: 'right' },
          { text: String(rows.totalQty), alignment: 'right', bold: true },
          { text: this.toINR(rows.totalAmount), alignment: 'right', bold: true },
        ]
        : which === 'mrpSplit'
          ? [
            { text: 'TOTAL', style: 'th', alignment: 'left' },
            { text: this.toINR(Number(rows.totalGross)), alignment: 'right', bold: true },
            { text: this.toINR(Number(rows.totalBase)), alignment: 'right', bold: true },
            { text: this.toINR(Number(rows.totalCommission)), alignment: 'right', bold: true },
          ]
          : [
            { text: 'TOTAL', style: 'th', alignment: 'left' },
            { text: String(rows.totalQty), alignment: 'right', bold: true },
            { text: this.toINR(rows.totalAmount), alignment: 'right', bold: true },
          ];

    body.push(totalRow);

    const range = this.data.header?.createdBetween || this.data.rangeLabel || 'Selected Dates (IST)';
    const headerBlock = this.buildPdfHeaderBlock(range);

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [24, 28, 24, 40],
      content: [
        headerBlock,
        {
          text:
            which === 'item'
              ? 'Item-wise Breakdown'
              : which === 'type'
                ? 'Item Type-wise Breakdown'
                : 'Category-wise Breakdown',
          style: 'h2',
          margin: [0, 12, 0, 6],
        },
        {
          table: { headerRows: 1, widths, body },
          layout: {
            fillColor: (rowIndex: number) => (rowIndex === 0 ? '#F4F6F8' : null),
            hLineColor: '#DADADA',
            vLineColor: '#DADADA',
            paddingTop: () => 6,
            paddingBottom: () => 6,
          },
        },
      ],
      styles: {
        h1: { fontSize: 14, bold: true },
        h2: { fontSize: 11, bold: true },
        metaKey: { color: '#555', fontSize: 9 },
        metaVal: { bold: true, fontSize: 9 },
        th: { bold: true, fontSize: 9 },
      },
      defaultStyle: { fontSize: 9 },
      footer: (currentPage: number, pageCount: number) => ({
        columns: [
          { text: `Generated on: ${new Date().toLocaleString('en-IN')}`, alignment: 'left', margin: [24, 0, 0, 0] },
          { text: `Page ${currentPage} of ${pageCount}`, alignment: 'right', margin: [0, 0, 24, 0] },
        ],
        fontSize: 8,
        color: '#666',
      }),
    };

    const safeLabel = range.replace(/[^a-z0-9-_]+/gi, '_');
    const fname =
      which === 'item'
        ? `ItemBreakdown_${safeLabel}.pdf`
        : which === 'type'
          ? `ItemTypeBreakdown_${safeLabel}.pdf`
          : `CategoryBreakdown_${safeLabel}.pdf`;
    (pdfMake as any).createPdf(docDefinition).download(fname);
  }


  private buildRowsForPdf(which: BreakdownMode) {
    const rows: AnyRow[] = [];
    let totalQty = 0;
    let totalAmount = 0;

    let totalGross = 0;
    let totalBase = 0;
    let totalCommission = 0;

    const toINR = (n: number) => this.toINR(n);

    if (which === 'item') {
      for (const r of this.byItem()) {
        const unit = r.count ? r.totalPrice / r.count : 0;
        rows.push({
          'Item Name': r.key || '-',
          'Price': toINR(unit),
          'Quantity': r.count || 0,
          'Final Amount': toINR(r.totalPrice || 0),
        } as ItemRow);
        totalQty += r.count || 0;
        totalAmount += r.totalPrice || 0;
      }
    } else if (which === 'type') {
      for (const r of this.byType()) {
        rows.push({
          'Item Type': r.key || '-',
          'Quantity': r.count || 0,
          'Final Amount': toINR(r.totalPrice || 0),
        } as GroupRowItemType);
        totalQty += r.count || 0;
        totalAmount += r.totalPrice || 0;
      }
    } else if (which === 'category') {
      for (const r of this.byCategory()) {
        rows.push({
          'Category': r.key || '-',
          'Quantity': r.count || 0,
          'Final Amount': toINR(r.totalPrice || 0),
        } as GroupRowCategory);
        totalQty += r.count || 0;
        totalAmount += r.totalPrice || 0;
      }
    } else if (which === 'mrpSplit') {
      for (const r of this.mrpSplit()) {
        rows.push({
          'Type': r.label,
          'Gross Amount': toINR(r.gross),
          'Base Amount': toINR(r.base),
          'Commission Amount': toINR(r.commissionAmt),
        } as MrpSplitPdfRow);
        totalGross += r.gross || 0;
        totalBase += r.base || 0;
        totalCommission += r.commissionAmt || 0;
      }
    }

    return which === 'mrpSplit'
      ? { data: rows, totalQty, totalAmount, totalGross, totalBase, totalCommission }
      : { data: rows, totalQty, totalAmount };
  }


  // Header block like the sample PDF (logo + meta)
  private buildPdfHeaderBlock(range: string): any {
    const h = this.data.header || {};
    const leftStack: any[] = [
      { text: h.cafeteriaName || '-', style: 'h1', margin: [0, 0, 0, 2] },
      { text: h.counterName ? `Counter: ${h.counterName}` : '', margin: [0, 0, 0, 2] },
      {
        columns: [
          { text: 'GST Number: ', style: 'metaKey', width: 'auto' },
          { text: h.gstNumber || '-', style: 'metaVal', width: '*' },
        ],
        columnGap: 3,
      },
      {
        columns: [
          { text: 'FSSAI Number: ', style: 'metaKey', width: 'auto' },
          { text: h.fssaiNumber || '-', style: 'metaVal', width: '*' },
        ],
        columnGap: 3,
      },
      {
        columns: [
          { text: 'Created Between: ', style: 'metaKey', width: 'auto' },
          { text: range, style: 'metaVal', width: '*' },
        ],
        columnGap: 3,
        margin: [0, 2, 0, 0],
      },
    ];

    const logoCol = h.logoBase64
      ? {
        image: h.logoBase64,
        width: 70,
        alignment: 'right',
      }
      : { text: '' };

    return {
      columns: [
        { stack: leftStack, width: '*' },
        { ...logoCol, width: 80 },
      ],
      columnGap: 10,
    };
  }

  /** Format INR uniformly with ₹ and 2 decimals */
  private toINR(n: number): string {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Number(n || 0));
    } catch {
      const fixed = (Number(n || 0)).toFixed(2);
      return `₹${fixed}`;
    }
  }
}
