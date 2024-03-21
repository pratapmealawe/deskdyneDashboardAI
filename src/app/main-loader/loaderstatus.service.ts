import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderstatusService {

  loadingStatusSubject = new BehaviorSubject(false);
  constructor() { }
  show(){
    this.loadingStatusSubject.next(true);
  }

  hide(){
    this.loadingStatusSubject.next(false);
  }
}
