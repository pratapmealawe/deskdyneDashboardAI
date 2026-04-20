import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
  styleUrls: ['confirmation-modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ConfirmationModalComponent implements OnInit {
  showDialog = false;

  modalObj: any = {};
  constructor(private confimationModalService: ConfirmationModalService) { }

  ngOnInit(): void { }
  cancel() {
    if (this.modalObj.cancelCallback) {
      this.modalObj.cancelCallback.apply(this.modalObj.context);
    }
    this.showDialog = false;
  }
  confirm() {
    this.modalObj.callback.apply(this.modalObj.context);
    this.showDialog = false;
  }
}
