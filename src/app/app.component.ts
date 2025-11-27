import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { WebNotificationService } from 'src/service/webNotification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashboard-admin';
  currentRoute: any;
  isShowHeader: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private webNotificationService: WebNotificationService,
    private router: Router,
    private runtimeStorageService: RuntimeStorageService
  ) {
    this.webNotificationService.requestPermission();
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.urlAfterRedirects || event.url;
          this.isShowHeader =
            this.currentRoute.startsWith('/login') ||
            this.currentRoute.startsWith('/guest');
        } else if (event instanceof NavigationError) {
          console.error('Navigation Error:', event.error);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
