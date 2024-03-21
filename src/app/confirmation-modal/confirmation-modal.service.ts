import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {

  confimationModalSubject = new BehaviorSubject({});
  constructor() { }
  modal(msg: string, callback: Function, context: object){
    const modalObj = {msg, callback, context}
    this.confimationModalSubject.next(modalObj);
  }
}