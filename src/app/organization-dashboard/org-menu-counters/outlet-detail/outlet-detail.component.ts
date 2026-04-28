import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { environment } from '@environments/environment';
import { SearchFilterService } from '@service/search-filter.service';

@Component({
  selector: 'app-outlet-detail',
  templateUrl: './outlet-detail.component.html',
  styleUrls: ['./outlet-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class OutletDetailComponent implements OnChanges {
  @Input() outlet: any = null;
  @Input() imageUrl: string = environment.imageUrl;
  @Output() back = new EventEmitter<void>();

  searchText: string = '';
  filteredMenuList: any[] = [];

  constructor(private searchService: SearchFilterService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['outlet'] && this.outlet) {
      this.filteredMenuList = [...(this.outlet.menuList || [])];
      this.searchText = '';
    }
  }

  onSearch(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.searchText = text;
    if (!text.trim()) {
      this.filteredMenuList = [...(this.outlet?.menuList || [])];
    } else {
      this.filteredMenuList = this.searchService.searchData(
        this.outlet?.menuList || [],
        { keys: ['itemName', 'category'] },
        text
      );
    }
  }

  goBack(): void {
    this.back.emit();
  }

  getItemTypeClass(type: string): string {
    const map: Record<string, string> = { Veg: 'veg', NonVeg: 'nonveg', Jain: 'jain' };
    return map[type] || '';
  }
}
