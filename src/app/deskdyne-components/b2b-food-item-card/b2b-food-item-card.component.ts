import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationModalService } from '../../confirmation-modal/confirmation-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-b2b-food-item-card',
  templateUrl: './b2b-food-item-card.component.html',
  styleUrls: ['./b2b-food-item-card.component.scss']
})
export class B2bFoodItemCardComponent implements OnInit {
  @Input() foodItem: any;
  @Output() editItem = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  imageUrl = environment.imageUrl;

  constructor(private confirmationModalService:ConfirmationModalService){

  }
  
  ngOnInit(): void {
    
  }

  showPopup() {
    this.confirmationModalService.modal(`Are you sure, you want to delete ${this.foodItem.itemName}`,
      this.deleteFoodItem, this);
  }

  editFoodItem() {
    this.editItem.emit(this.foodItem);
  }

  deleteFoodItem() {
    this.deleteItem.emit(this.foodItem);
  }

}
