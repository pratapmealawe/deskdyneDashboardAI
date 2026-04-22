import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
  styleUrls: ['confirmation-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {
  showDialog = false;
  modalObj: any = {};
  private subscription: Subscription = new Subscription();

  constructor(private confimationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.confimationModalService.confimationModalSubject.subscribe((res: any) => {
        if (res && res.msg) {
          this.modalObj = res;
          this.showDialog = true;
        }
      })
    );
  }

  cancel() {
    if (this.modalObj.cancelCallback) {
      this.modalObj.cancelCallback.apply(this.modalObj.context);
    }
    this.close();
  }

  confirm() {
    if (this.modalObj.callback) {
      this.modalObj.callback.apply(this.modalObj.context);
    }
    this.close();
  }

  private close() {
    this.showDialog = false;
    this.modalObj = {};
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
