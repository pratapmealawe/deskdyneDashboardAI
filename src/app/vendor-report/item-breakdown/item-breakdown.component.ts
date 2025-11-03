import { Component, computed, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ExcelService } from 'src/service/excel.service';

export interface ItemBreakdownDialogData {
  orders: any[];            // <- parent-filtered orders (range or single)
  rangeLabel?: string;      // <- parent-made label like "13 Oct 2025 – 20 Oct 2025 (IST)"
}

type GroupRow = { key: string; count: number; totalPrice: number };

@Component({
  selector: 'app-item-breakdown',
  templateUrl: './item-breakdown.component.html',
  styleUrls: ['./item-breakdown.component.scss']
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

  private group(orders: any[], mode: 'item' | 'type' | 'category'): GroupRow[] {
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

  export(which: 'item' | 'type' | 'category') {
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
    } else {
      rows = this.byCategory().map(r => ({
        Category: r.key || '-',
        Count: r.count,
        TotalPrice: r.totalPrice
      }));
    }

    // 🧮 compute totals
    const totalCount = rows.reduce((sum, r) => sum + Number(r.Count || 0), 0);
    const totalPrice = rows.reduce((sum, r) => sum + Number(r.TotalPrice || 0), 0);

    // ➕ append a blank row + totals row for Excel readability
    rows.push({});
    rows.push({
      ...(which === 'item'
        ? { Item: 'TOTAL' }
        : which === 'type'
          ? { ItemType: 'TOTAL' }
          : { Category: 'TOTAL' }),
      Count: totalCount,
      TotalPrice: totalPrice
    });

    const title = (this.data.rangeLabel || 'Selected').replace(/[^a-z0-9-_]+/gi, '_');
    const fname =
      which === 'item'
        ? `ItemBreakdown_${title}`
        : which === 'type'
          ? `ItemTypeBreakdown_${title}`
          : `CategoryBreakdown_${title}`;

    this.excel.download(rows, fname);
  }

}
