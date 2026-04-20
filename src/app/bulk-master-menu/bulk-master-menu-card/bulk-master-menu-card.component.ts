import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { environment } from '@environments/environment';
import { PolicyService } from '@service/policy.service';

@Component({
  selector: 'app-bulk-master-menu-card',
  templateUrl: './bulk-master-menu-card.component.html',
  styleUrls: ['./bulk-master-menu-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class BulkMasterMenuCardComponent implements OnInit {
  @Input() foodItem: any;
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  imageUrl = environment.imageUrl;
  btnPolicy: any;
  fallbackImage = 'assets/Imageunavailable.webp';

  constructor(
    private confirmationModalService: ConfirmationModalService,
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.fallbackImage;
  }

  showPopup(event: Event): void {
    event.stopPropagation();
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to delete this menu item?',
      callback: this.deleteFoodItem,
      context: this
    });
  }

  editFoodItem(event: Event): void {
    event.stopPropagation();
    this.editItem.emit(this.foodItem);
  }

  deleteFoodItem(): void {
    this.deleteItem.emit(this.foodItem);
  }
}
