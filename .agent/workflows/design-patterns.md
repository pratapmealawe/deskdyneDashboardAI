---
description: Common Design Patterns and Layout Guidelines for DeskDyne Dashboard
---

# DeskDyne Dashboard Design Patterns

This document outlines the common design patterns and layout guidelines used across the DeskDyne Dashboard application. Follow these patterns when creating or updating add/edit forms and dialog components.

---

## 1. Page Header Card Pattern

Used in full-page add/edit forms (e.g., add-outlet, add-organization, add-vendor).

### Structure
```html
<div class="page-header-card mb-4">
  <div class="header-content">
    <!-- Left: Back Button + Title -->
    <div class="d-flex align-items-center gap-3">
      <button mat-icon-button (click)="back()" class="back-btn" type="button">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <div>
        <h1 class="page-title">{{ isEdit ? 'Edit [Entity]' : 'Add [Entity]' }}</h1>
        <p class="page-subtitle">Brief description of what this form does.</p>
      </div>
    </div>

    <!-- Right: Info Button + Status -->
    <div class="header-right">
      <button mat-icon-button [matMenuTriggerFor]="infoMenu" class="info-btn" matTooltip="Required Fields">
        <mat-icon>info</mat-icon>
      </button>
      <mat-menu #infoMenu="matMenu">
        <div class="info-menu-content" (click)="$event.stopPropagation()">
          <div class="info-header">
            <mat-icon>checklist</mat-icon>
            <span>Required Fields</span>
          </div>
          <ul class="info-list required">
            <li><mat-icon>check_circle</mat-icon> Field 1</li>
            <li><mat-icon>check_circle</mat-icon> Field 2</li>
          </ul>
          <div class="info-header mt-2">
            <mat-icon>stars</mat-icon>
            <span>Recommended</span>
          </div>
          <ul class="info-list recommended">
            <li><mat-icon>add_circle_outline</mat-icon> Optional Field</li>
          </ul>
        </div>
      </mat-menu>

      <div class="status-pill" [ngClass]="form.valid ? 'valid' : 'invalid'">
        <mat-icon>{{ form.valid ? 'check_circle' : 'info' }}</mat-icon>
        <span>{{ form.valid ? 'Ready to Save' : 'Incomplete' }}</span>
      </div>
    </div>
  </div>
</div>
```

### Key Classes
| Class | Purpose |
|-------|---------|
| `.page-header-card` | Container with white background, shadow, rounded corners |
| `.header-content` | Flexbox container with space-between |
| `.header-right` | Groups info button and status pill |
| `.back-btn` | Styled back navigation button |
| `.info-btn` | Info icon that opens the required fields menu |
| `.status-pill` | Shows form validity status (valid/invalid) |

---

## 2. Dialog Title with Info Button Pattern

Used in modal dialogs (e.g., add/edit menu item).

### Structure
```html
<div mat-dialog-title class="dialog-title">
  <div class="title-left">
    <mat-icon>{{ isEdit ? 'edit' : 'add_circle' }}</mat-icon>
    {{ isEdit ? 'Edit [Entity]' : 'Add [Entity]' }}
  </div>
  <button mat-icon-button [matMenuTriggerFor]="infoMenu" class="info-btn" matTooltip="Required Fields">
    <mat-icon>info</mat-icon>
  </button>
  <mat-menu #infoMenu="matMenu">
    <!-- Same info-menu-content structure as above -->
  </mat-menu>
</div>
```

---

## 3. Modern Card Layout Pattern

Used for grouping form sections with icon headers.

### Structure
```html
<div class="modern-card mb-4">
  <div class="card-header">
    <div class="icon-box [color]">
      <mat-icon>[icon_name]</mat-icon>
    </div>
    <h3>Section Title</h3>
  </div>
  <div class="card-body">
    <!-- Form fields go here -->
  </div>
</div>
```

### Icon Box Colors
| Class | Color | Use Case |
|-------|-------|----------|
| `.icon-box.primary` | Brand Primary | Main entity info |
| `.icon-box.info` | Blue | Images, general info |
| `.icon-box.success` | Green | Location, organization |
| `.icon-box.warning` | Amber | Billing, payments |
| `.icon-box.secondary` | Gray | Settings, config |
| `.icon-box.purple` | Purple | Timings, schedule |

---

## 4. Two-Column Form Layout

Used for full-page add/edit forms with sidebar.

### Structure
```html
<div class="row g-4">
  <!-- LEFT COLUMN: Image & Settings (col-lg-4) -->
  <div class="col-12 col-lg-4">
    <div class="modern-card mb-4"><!-- Image upload --></div>
    <div class="modern-card mb-4"><!-- Configuration toggles --></div>
  </div>

  <!-- RIGHT COLUMN: Main Details (col-lg-8) -->
  <div class="col-12 col-lg-8">
    <div class="modern-card mb-4"><!-- Basic details --></div>
    <div class="modern-card mb-4"><!-- Additional info --></div>
  </div>
</div>

<!-- FULL WIDTH SECTIONS -->
<div class="row g-4 mt-1">
  <div class="col-12">
    <div class="modern-card mb-4"><!-- Full width content --></div>
  </div>
</div>
```

---

## 5. Image Upload Box Pattern

### Structure
```html
<div class="upload-wrapper">
  <input #fileInput type="file" class="uploadInput" accept="image/*" 
    (change)="handleFileInput($event)" style="display: none;" />
  <div class="image-upload-box" [class.has-image]="imageUrl" (click)="fileInput.click()">
    <img *ngIf="imageUrl" [src]="imageUrl" class="preview-image" />
    <div *ngIf="!imageUrl" class="placeholder-content">
      <mat-icon>cloud_upload</mat-icon>
      <span>Upload Image</span>
    </div>
    <div class="upload-overlay">
      <span>Change Image</span>
    </div>
  </div>
</div>
```

---

## 6. Sticky Action Bar Pattern

Used at bottom of full-page forms.

### Structure
```html
<div class="action-bar-container">
  <div class="action-bar">
    <button class="btn-cancel" mat-button (click)="back()" type="button">Cancel</button>
    <button class="btn-submit" mat-flat-button color="primary" type="submit" 
      [disabled]="form.invalid">
      <mat-icon>check</mat-icon> Save
    </button>
  </div>
</div>
```

---

## 7. Info Menu Styles (Required)

Add these styles to any component using the info button pattern:

```scss
.info-menu-content {
  padding: 1rem;
  min-width: 250px;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
  
  mat-icon { font-size: 18px; width: 18px; height: 18px; color: #f59e0b; }
  span { font-size: 0.85rem; font-weight: 600; color: #1e293b; }
}

.info-list {
  list-style: none;
  margin: 0;
  padding: 8px 0 0;
  
  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    font-size: 0.8rem;
    color: #475569;
    
    mat-icon { font-size: 16px; width: 16px; height: 16px; }
  }
  
  &.required li mat-icon { color: #22c55e; }
  &.recommended li mat-icon { color: #3b82f6; }
}
```

---

## Color Reference

| Purpose | Hex | Usage |
|---------|-----|-------|
| Required/Success | `#22c55e` | Required field icons, success states |
| Recommended/Info | `#3b82f6` | Optional field icons, info states |
| Warning | `#f59e0b` | Section headers, warning states |
| Error | `#ef4444` | Error states, invalid indicators |
| Border | `#e2e8f0` | Card borders, dividers |
| Background | `#f8fafc` | Card backgrounds, light sections |

---

## Quick Checklist

When creating a new add/edit form:

- [ ] Page header with back button, title, subtitle
- [ ] Info button with required/recommended fields
- [ ] Status pill showing form validity
- [ ] Modern cards with icon headers for sections
- [ ] Image upload (if applicable)
- [ ] Sticky action bar at bottom
- [ ] Responsive layout (col-lg-4 / col-lg-8)
