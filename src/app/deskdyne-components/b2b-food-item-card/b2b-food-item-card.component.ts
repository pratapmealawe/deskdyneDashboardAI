import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ConfirmationModalService } from '../../../service/confirmation-modal.service';
import { environment } from 'src/environments/environment';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-b2b-food-item-card',
  templateUrl: './b2b-food-item-card.component.html',
  styleUrls: ['./b2b-food-item-card.component.scss'],
})
export class B2bFoodItemCardComponent implements OnInit {
  @Input() foodItem: any;
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  imageUrl = environment.imageUrl;
  btnPolicy: any;

  // optional: fallback image
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

  showPopup(): void {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to delete this food item?',
      callback: this.deleteFoodItem,
      context: this
    });
  }

  editFoodItem(): void {
    this.editItem.emit(this.foodItem);
  }

  deleteFoodItem(): void {
    this.deleteItem.emit(this.foodItem);
  }
}
