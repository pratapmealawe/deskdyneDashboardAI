import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { WebNotificationService } from 'src/service/webNotification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'dashboard-admin';
  currentRoute:any
  constructor(private webNotificationService: WebNotificationService, private router:Router, private runtimeStorageService:RuntimeStorageService){
    this.webNotificationService.requestPermission();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
        if(event.urlAfterRedirects){
          this.currentRoute = event.urlAfterRedirects;
          console.log('redirected route');
        }
        else{
          this.currentRoute = event.url;
          console.log(this.currentRoute,'current route')
        }
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    })
  }
}
