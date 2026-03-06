---
description: Common Design Patterns and Layout Guidelines for DeskDyne Dashboard
---

# DeskDyne Dashboard — Common UI Design Patterns

> **Purpose**: This document is the single source of truth for all recurring UI patterns in the DeskDyne Dashboard.
> Any AI model or developer building new components **must** follow these patterns to maintain consistency.

## Theme System

### Imports (required at top of every `.component.scss`)

```scss
@use '/src/styles/theme/mixins' as mixin;
@use '/src/styles/theme/variable' as var;
```

### Core Variables (`src/styles/theme/_variable.scss`)

| Token | Value | Usage |
|-------|-------|-------|
| `$primary-color1` | `#0E49B5` | Primary blue — buttons, active states |
| `$primary-color2` | `#192754` | Navy — page titles, dark text |
| `$primary-color3` | `#4b82e2` | Light blue — hover borders, gradients |
| `$secondary-color3` | `#FF3333` | Accent red |
| `$color-success` | `#52c41a` | Success states |
| `$color-warning` | `#faad14` | Warning states |
| `$color-error` | `#ff4d4f` | Error states |
| `$color-info` | `#1890ff` | Info states |
| `$border-radius-sm` | `4px` | Small elements |
| `$border-radius-md` | `8px` | Buttons, sub-tabs |
| `$border-radius-lg` | `12px` | Cards, containers |
| `$border-radius-xl` | `20px` | Page header cards |
| `$border-radius-pill` | `9999px` | Pill buttons, search inputs, chips |
| `$box-shadow-card` | `0 2px 12px rgba(0,0,0,0.04)` | Standard card shadow |
| `$box-shadow-card-hover` | `0 8px 24px rgba(0,0,0,0.08)` | Hover elevation |

### Semantic Color System (for Status)

Each semantic color has 3 tokens: base, background, and border.

```scss
// Example: Success
$color-success: #52c41a;
$color-success-bg: #f6ffed;
$color-success-border: #b7eb8f;
```

Same pattern for `$color-warning-*`, `$color-error-*`, `$color-info-*`.

---

## 1. Page Header Card

Every page has a white header card with title + actions.

**Reference**: `vendor-firm`, `outlet-excel-export`, `main-dashboard`, `add-vendor-firm`

### HTML Structure

```html
<div class="page-header-card mb-4">
  <div class="header-content">
    <!-- Title Side -->
    <div class="title-section">
      <h1 class="page-title">Page Title</h1>
      <p class="page-subtitle">Short description of the page</p>
    </div>

    <!-- Actions Side -->
    <div class="actions-section">
      <!-- Search, filter buttons, action buttons go here -->
    </div>
  </div>
</div>
```

### With Back Button (detail/edit pages)

```html
<div class="page-header-card mb-4">
  <div class="header-content">
    <div class="d-flex align-items-center gap-3">
      <button mat-icon-button (click)="goBack()" class="back-btn">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <div class="title-section">
        <h1 class="page-title">Detail Page Title</h1>
        <p class="page-subtitle">Description text</p>
      </div>
    </div>
    <div class="actions-section">
      <!-- Right-side actions -->
    </div>
  </div>
</div>
```

### SCSS

```scss
.page-header-card {
  background: white;
  border-radius: var.$border-radius-xl;
  padding: 1.5rem 2rem;
  box-shadow: var.$box-shadow-card;
  border: 1px solid rgba(0, 0, 0, 0.04);

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .title-section {
    .page-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var.$primary-color2;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .page-subtitle {
      margin: 4px 0 0;
      color: #64748b;
      font-size: 0.95rem;
    }
  }

  .actions-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column;
    }
  }

  .back-btn {
    color: #6c757d;
    background: #f8f9fa;
    border-radius: var.$border-radius-md;
    width: 40px;
    height: 40px;
  }
}
```

---

## 2. Search Wrapper

**Reference**: `vendor-firm`, `outlet-excel-export`

### HTML

```html
<div class="search-wrapper">
  <mat-icon class="search-icon">search</mat-icon>
  <input type="text" placeholder="Search items..." [formControl]="searchControl">
</div>
```

### SCSS

```scss
.search-wrapper {
  position: relative;
  min-width: 280px;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9aa0a6;
    font-size: 20px;
    width: 20px;
    height: 20px;
  }

  input {
    width: 100%;
    padding: 10px 16px 10px 42px;
    border: 1px solid #e0e0e0;
    border-radius: var.$border-radius-pill;
    font-size: 0.95rem;
    background-color: #f8f9fa;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      background-color: #fff;
      border-color: var.$primary-color1;
      box-shadow: 0 0 0 3px rgba(14, 73, 181, 0.1);
    }

    &::placeholder { color: #adb5bd; }
  }
}
```

---

## 3. Filter Button

**Reference**: `vendor-firm`, `outlet-excel-export`, `main-dashboard`

### HTML (Icon-only with badge)

```html
<button mat-icon-button class="btn-filter" matTooltip="Filters" (click)="openFilterDialog()">
  <mat-icon [matBadge]="activeFilterCount" [matBadgeHidden]="activeFilterCount === 0"
    matBadgeSize="small" matBadgeColor="accent">filter_list</mat-icon>
</button>
```

### SCSS

```scss
.btn-filter {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;

  mat-icon { color: #4f46e5; }

  &:hover {
    background: #eef2ff;
    border-color: #c7d2fe;
  }
}
```

---

## 4. Active Filter Chips Strip

**Reference**: `vendor-firm`, `outlet-excel-export`, `main-dashboard`

### HTML

```html
<div class="active-filter-chips mb-4" *ngIf="activeFilterCount > 0">
  <div class="chip-strip">
    <div class="filter-chip" *ngFor="let filter of activeFilters">
      {{ filter.label }}
      <mat-icon (click)="removeFilter(filter)">close</mat-icon>
    </div>
    <button mat-stroked-button class="btn-clear-all" (click)="clearFilters()">
      <mat-icon>filter_alt_off</mat-icon> Clear All
    </button>
  </div>
</div>
```

### SCSS

```scss
.active-filter-chips { animation: fadeIn 0.2s ease; }

.chip-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 500;
  color: #3730a3;
  background: linear-gradient(135deg, #eef2ff, #e0e7ff);
  border: 1px solid #c7d2fe;

  mat-icon {
    font-size: 14px; width: 14px; height: 14px;
    cursor: pointer; opacity: 0.6;
    &:hover { opacity: 1; }
  }
}

.btn-clear-all {
  border-radius: var.$border-radius-pill !important;
  font-size: 0.75rem !important;
  height: 28px !important;
  color: #64748b !important;
  border-color: #cbd5e1 !important;
  padding: 0 10px !important;

  mat-icon { font-size: 14px; width: 14px; height: 14px; margin-right: 2px; }
}
```

---

## 5. Export Buttons (Excel + PDF)

**Reference**: `outlet-excel-export`, `main-dashboard`

### HTML

```html
<div class="export-btns">
  <button mat-flat-button class="btn-export excel" (click)="excelExport()">
    <mat-icon>table_chart</mat-icon> Excel
  </button>
  <button mat-flat-button class="btn-export pdf" (click)="downloadPdf()">
    <mat-icon>picture_as_pdf</mat-icon> PDF
  </button>
</div>
```

### SCSS

```scss
.export-btns {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.btn-export {
  border-radius: var.$border-radius-pill !important;
  font-weight: 600 !important;
  font-size: 0.85rem !important;
  height: 40px !important;

  mat-icon { margin-right: 4px; font-size: 18px; width: 18px; height: 18px; }

  &.excel { background-color: var.$color-success !important; color: white !important; }
  &.pdf   { background-color: var.$primary-color1 !important; color: white !important; }
}
```

---

## 6. Primary Action Button (Add / Create)

**Reference**: `vendor-firm`

### HTML

```html
<button mat-flat-button color="primary" class="btn-primary-action" (click)="addItem()">
  <mat-icon>add</mat-icon> Add Item
</button>
```

### SCSS

```scss
.btn-primary-action {
  border-radius: var.$border-radius-pill !important;
  padding: 0.5rem 1.5rem !important;
  font-weight: 600 !important;
  height: 48px !important;
  box-shadow: 0 4px 12px rgba(14, 73, 181, 0.2);
  background-color: var.$primary-color1 !important;
  color: white !important;

  mat-icon { margin-right: 8px; }
}
```

---

## 7. Tabs (3-level: Main → Sub → Child)

**Reference**: `organization-view`

### HTML

```html
<div class="tabs-container">
  <!-- Main Tabs (pill-style, scrollable) -->
  <div class="main-tabs">
    <button *ngFor="let tab of tabs; let i = index" class="tab-btn"
      [class.active]="selectedIndex === i" (click)="onTabChange(i)">
      <mat-icon class="tab-icon">{{ tab.icon }}</mat-icon>
      <span>{{ tab.name }}</span>
    </button>
  </div>

  <!-- Sub Tabs (bordered) -->
  <div class="sub-tabs-wrapper" *ngIf="selectedTab?.subTabs?.length">
    <div class="sub-tabs">
      <button *ngFor="let sub of selectedTab.subTabs; let i = index" class="sub-tab-btn"
        [class.active]="selectedSubIndex === i" (click)="onSubTabChange(i)">
        {{ sub.name }}
      </button>
    </div>
  </div>

  <!-- Child Tabs (compact) -->
  <div class="child-tabs-wrapper" *ngIf="selectedSub?.childTabs?.length">
    <div class="child-tabs">
      <button *ngFor="let child of selectedSub.childTabs; let i = index" class="child-tab-btn"
        [class.active]="selectedChildIndex === i" (click)="onChildTabChange(i)">
        {{ child.name }}
      </button>
    </div>
  </div>
</div>
```

### SCSS

```scss
.tabs-container {
  background: white;
  border-radius: var.$border-radius-xl;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: var.$box-shadow-card;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.main-tabs {
  display: flex;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: #f1f3f5;
  border-radius: var.$border-radius-pill;
  font-size: 0.9rem;
  font-weight: 500;
  color: #6c757d;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s ease;

  .tab-icon { font-size: 20px; width: 20px; height: 20px; }

  &:hover { background: #e9ecef; color: var.$primary-color2; }

  &.active {
    background: var.$primary-color1;
    color: white;
    box-shadow: 0 4px 12px rgba(14, 73, 181, 0.3);
    .tab-icon { color: white; }
  }
}

.sub-tabs-wrapper {
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
  margin-top: 0.5rem;
}

.sub-tab-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: var.$border-radius-md;
  font-size: 0.85rem;
  font-weight: 500;
  color: #495057;
  cursor: pointer;
  white-space: nowrap;

  &:hover { border-color: var.$primary-color1; color: var.$primary-color1; }
  &.active {
    background: var.$primary-color1;
    color: white;
    border-color: transparent;
  }
}

.child-tabs-wrapper {
  border-top: 1px dashed #dee2e6;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

.child-tab-btn {
  padding: 0.4rem 0.85rem;
  border: none;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6c757d;
  cursor: pointer;

  &:hover { background: #e9ecef; color: var.$primary-color2; }
  &.active { background: var.$primary-color3; color: white; }
}
```

---

## 8. Modern Card (with Icon-Box Header)

**Reference**: `add-vendor-firm`

### HTML

```html
<div class="modern-card mb-4">
  <div class="card-header">
    <div class="icon-box primary"> <!-- Variants: primary, info, warning, success, purple -->
      <mat-icon>business</mat-icon>
    </div>
    <h3>Section Title</h3>
  </div>
  <div class="card-body">
    <!-- Content here -->
  </div>
</div>

<!-- With header action button -->
<div class="modern-card mb-4">
  <div class="card-header with-actions">
    <div class="d-flex align-items-center gap-3">
      <div class="icon-box success">
        <mat-icon>store</mat-icon>
      </div>
      <h3>Section Title</h3>
    </div>
    <button mat-stroked-button color="primary" class="action-btn">
      <mat-icon>add</mat-icon> Add Item
    </button>
  </div>
  <div class="card-body">
    <!-- Content -->
  </div>
</div>
```

### SCSS

```scss
.modern-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  border: 1px solid #edf2f7;
  overflow: hidden;

  .card-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    gap: 1rem;

    &.with-actions { justify-content: space-between; }

    h3 { font-size: 1.1rem; font-weight: 700; color: #2d3748; margin: 0; }

    .icon-box {
      width: 40px; height: 40px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;

      mat-icon { font-size: 20px; width: 20px; height: 20px; }

      &.primary { background: #dbeafe; color: var.$primary-color1; }
      &.info    { background: #e0f2fe; color: #0284c7; }
      &.warning { background: #fef3c7; color: #d97706; }
      &.success { background: #dcfce7; color: #16a34a; }
      &.purple  { background: #f3e8ff; color: #9333ea; }
    }
  }

  .card-body { padding: 1.5rem; }
}
```

---

## 9. Stat Cards (Dashboard)

**Reference**: `main-dashboard`

### HTML

```html
<div class="stats-row">
  <div class="stat-card">
    <div class="stat-icon-wrap" style="background: linear-gradient(135deg, #6366f1, #4f46e5);">
      <mat-icon>storefront</mat-icon>
    </div>
    <div class="stat-info">
      <span class="stat-label">Outlets</span>
      <span class="stat-value">{{ count }}</span>
    </div>
  </div>
</div>
```

### SCSS

```scss
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.stat-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;

  mat-icon { font-size: 26px; width: 26px; height: 26px; color: white; }
}

.stat-info {
  display: flex; flex-direction: column;

  .stat-label {
    font-size: 0.82rem; color: #64748b; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .stat-value {
    font-size: 1.75rem; font-weight: 700; color: #1e293b;
  }
}
```

---

## 10. Status Badges & Chips

**Reference**: `org-outlet-orders`, `_chips.scss`

### HTML

```html
<!-- Status Badge (with icon) -->
<div class="status-badge" [ngClass]="item.status">
  <mat-icon>{{ statusIcon }}</mat-icon>
  {{ statusLabel }}
</div>

<!-- Status Chip (text-only, global) -->
<span class="status-chip" [ngClass]="item.status">{{ statusLabel }}</span>

<!-- Verified/Pending Badge -->
<div class="verified-badge-pill" [ngClass]="isVerified ? 'verified' : 'pending'">
  <mat-icon class="tiny-icon">{{ isVerified ? 'verified' : 'pending' }}</mat-icon>
  <span>{{ isVerified ? 'Verified' : 'Pending' }}</span>
</div>
```

### Status Classes

| Class | Background | Color | Use Case |
|-------|-----------|-------|----------|
| `.placed` | `$color-info-bg` | `$color-info` | Order placed |
| `.completed` | `$color-success-bg` | `$color-success` | Order completed |
| `.cancelled` | `$color-error-bg` | `$color-error` | Order cancelled |
| `.paymentFailed` | `$color-error-bg` | `$color-error` | Payment failed |
| `.paymentInprogress` | `$color-warning-bg` | `$color-warning` | Payment pending |
| `.readyOrder` | `$color-info-bg` | `$color-info` | Order ready |

---

## 11. Totals Strip

**Reference**: `outlet-excel-export`

### HTML

```html
<div class="totals-strip">
  <div class="total-chip">
    <span class="chip-label">Orders</span>
    <span class="chip-value">{{ count }}</span>
  </div>
  <div class="total-chip highlight">
    <span class="chip-label">Revenue</span>
    <span class="chip-value">₹{{ amount | number:'1.2-2' }}</span>
  </div>
</div>
```

### SCSS

```scss
.totals-strip {
  display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;
}

.total-chip {
  display: inline-flex; flex-direction: column;
  padding: 0.5rem 1rem; background: white;
  border: 1px solid #e2e8f0; border-radius: 12px;

  .chip-label { font-size: 0.7rem; color: #718096; text-transform: uppercase; font-weight: 600; }
  .chip-value { font-size: 0.95rem; font-weight: 600; color: var.$primary-color2; }

  &.highlight {
    background: linear-gradient(135deg, #eef2ff, #e0e7ff);
    border-color: #c7d2fe;
    .chip-label { color: #3730a3; }
    .chip-value { color: #312e81; font-weight: 700; }
  }
}
```

---

## 12. Empty State

**Reference**: `vendor-firm`, `outlet-excel-export`

### HTML

```html
<div class="empty-state">
  <mat-icon>receipt_long</mat-icon>
  <h3>No Items Found</h3>
  <p>Try adjusting your filters or search criteria.</p>
</div>
```

### SCSS

```scss
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: var.$border-radius-lg;
  border: 1px dashed #cbd5e1;

  mat-icon { font-size: 64px; width: 64px; height: 64px; color: #cbd5e1; margin-bottom: 1rem; }
  h3 { font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 0.5rem; }
  p { color: #64748b; margin: 0; }
}
```

---

## 13. Loading State

**Reference**: `outlet-excel-export`, `main-dashboard`

### HTML

```html
<!-- Centered spinner -->
<div class="loading-state" *ngIf="isLoading">
  <mat-spinner diameter="44"></mat-spinner>
  <p>Loading data...</p>
</div>

<!-- Inline strip -->
<div class="loading-strip" *ngIf="isLoading">
  <mat-icon class="spin">autorenew</mat-icon> Loading data...
</div>
```

### SCSS

```scss
.loading-state {
  display: flex; flex-direction: column; align-items: center;
  padding: 4rem 2rem; gap: 1rem;
  p { color: #718096; font-size: 0.95rem; }
}

.loading-strip {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; padding: 1rem;
  background: #f1f5f9; border-radius: 12px;
  color: #64748b; font-size: 0.9rem;
  .spin { animation: spin 1s linear infinite; }
}

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
```

---

## 14. Sticky Action Bar (Form Pages)

**Reference**: `add-vendor-firm`

### HTML

```html
<div class="action-bar-container">
  <div class="action-bar">
    <button class="btn-cancel" mat-button (click)="goBack()">Cancel</button>
    <button class="btn-submit" mat-flat-button color="primary" (click)="submit()">
      <mat-icon>save</mat-icon> Save Changes
    </button>
  </div>
</div>
```

### SCSS

```scss
.action-bar-container {
  position: fixed; bottom: 0; left: 0; right: 0;
  display: flex; justify-content: center;
  pointer-events: none; z-index: 100;
}

.action-bar {
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex; gap: 1rem;
  margin-bottom: 1.4rem;

  .btn-submit { border-radius: 50px; padding: 0 2rem; height: 44px; }
  .btn-cancel { border-radius: 50px; height: 44px; padding: 0 1.5rem; color: #64748b; }
}
```

> **Note**: Add `padding-bottom: 100px` to the page container to make room for the sticky bar.

---

## 15. Pagination

**Reference**: `vendor-firm`, `outlet-excel-export`

### HTML

```html
<div class="d-flex justify-content-end mt-4">
  <mat-paginator [length]="totalItems" [pageSize]="pageSize" [pageIndex]="pageIndex"
    [pageSizeOptions]="[10, 50, 100, 200, 500]" (page)="onPageChange($event)"
    showFirstLastButtons class="custom-paginator">
  </mat-paginator>
</div>
```

### SCSS

```scss
.custom-paginator {
  background: transparent;
  ::ng-deep .mat-mdc-paginator-container {
    background: white;
    border-radius: 12px;
    padding: 0 1rem;
    border: 1px solid #e2e8f0;
  }
}
```

---

## 16. Common Animation

```scss
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

// Apply to animated sections
.tab-content, .content-body { animation: fadeIn 0.3s ease; }
```

---

## 17. Order Item Card

**Reference**: `org-outlet-orders`

**Structure**: Avatar header → body grid (left info + right items) → footer (financials + meta chips).

Key sub-patterns:
- **Avatar**: Round gradient circle with first letter
- **Info rows**: Icon + label/value columns
- **Organization/Cafeteria badges**: Colored mini badges
- **Flag badges**: Pre-order, Cabin, POS pill badges
- **Financial strip**: Label/value columns with `.discount` and `.grand` variants
- **Meta chips**: Small gray info chips (PG name, app version, device)

See full implementation in `src/app/common-components/org-outlet-orders/`.

---

## Quick Reference: File Locations

| Pattern | Reference Component |
|---------|-------------------|
| Page Header | `vendor-firm`, `outlet-excel-export`, `main-dashboard`, `add-vendor-firm` |
| Search | `vendor-firm`, `outlet-excel-export` |
| Filter Chips | `vendor-firm`, `outlet-excel-export`, `main-dashboard` |
| Export Buttons | `outlet-excel-export`, `main-dashboard` |
| Tabs (3-level) | `organization-view` |
| Modern Card | `add-vendor-firm` |
| Stat Cards | `main-dashboard` |
| Status Chips | `_chips.scss`, `org-outlet-orders` |
| Order Card | `org-outlet-orders` |
| Totals Strip | `outlet-excel-export` |
| Empty/Loading | `vendor-firm`, `outlet-excel-export`, `main-dashboard` |
| Sticky Bar | `add-vendor-firm` |
| Pagination | `vendor-firm`, `outlet-excel-export` |
| Theme Vars | `src/styles/theme/_variable.scss` |
| Mixins | `src/styles/theme/_mixins.scss` |
