import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-cafeteria-selector',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './cafeteria-selector.component.html',
  styleUrls: ['./cafeteria-selector.component.scss']
})
export class CafeteriaSelectorComponent {
  @Input() cafeteriaList: any[] | null | undefined = [];
  @Input() selectedCafeteria: any | null | undefined;
  @Input() selectedCafeteriaIds: string[] = []; // For multiple selection
  @Input() config: { multiple?: boolean, label?: string } = { multiple: false, label: 'Select Cafeteria' };
  
  @Output() cafeteriaChanged = new EventEmitter<any>();

  onSelect(cafeteria: any): void {
    this.cafeteriaChanged.emit(cafeteria);
  }

  isActive(cafeteria: any): boolean {
    if (this.config?.multiple) {
      const id = cafeteria.cafeteria_id || cafeteria._id;
      return this.selectedCafeteriaIds.includes(id);
    }
    const selectedId = this.selectedCafeteria?.cafeteria_id || this.selectedCafeteria?._id;
    const currentId = cafeteria.cafeteria_id || cafeteria._id;
    return selectedId === currentId;
  }
}
