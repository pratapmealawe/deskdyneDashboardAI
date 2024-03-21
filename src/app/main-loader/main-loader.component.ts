import { Component } from '@angular/core';
import { LoaderstatusService } from './loaderstatus.service';

@Component({
  selector: 'app-main-loader',
  templateUrl: './main-loader.component.html',
  styleUrls: ['./main-loader.component.scss']
})
export class MainLoaderComponent {
  isLoaderShowing: boolean;
  loadingCount: number;
  constructor(private loadingStaus: LoaderstatusService) {
    this.isLoaderShowing = false;
    this.loadingCount = 0;
    this.loadingStaus.loadingStatusSubject.subscribe((isLoaderShowing) => {
    if (this.loadingCount > 0 || isLoaderShowing) {
      this.loadingCount = isLoaderShowing ? ++this.loadingCount : --this.loadingCount;
    }
    this.isLoaderShowing = !this.loadingCount ? false : true;
      });
  }
} 
