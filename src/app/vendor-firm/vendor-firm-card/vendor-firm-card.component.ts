import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';

@Component({
  selector: 'app-vendor-firm-card',
  templateUrl: './vendor-firm-card.component.html',
  styleUrls: ['./vendor-firm-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule
  ]
})
export class VendorFirmCardComponent {
  @Input() vendor: any;
  @Input() isViewMode: boolean = false;

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onView() {
    this.view.emit(this.vendor);
  }

  onEdit() {
    this.edit.emit(this.vendor);
  }

  onDelete() {
    this.delete.emit(this.vendor);
  }
}
