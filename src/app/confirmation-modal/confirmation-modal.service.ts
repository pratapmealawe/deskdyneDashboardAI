import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  confimationModalSubject = new BehaviorSubject({});

  constructor() { }

  data: any;

  modal(modalObj: { msg: string; callback: Function; context: object; data?: any }) {
    this.data = modalObj.data;
    this.confimationModalSubject.next(modalObj);
  }
}
