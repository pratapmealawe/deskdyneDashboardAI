import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { SuggestionsFeedbackService } from 'src/service/suggestions-feedback.service';
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
    private runtimeStorageService: RuntimeStorageService,
    private apiMainService: ApiMainService,
    private suggestionsFeedbackService: SuggestionsFeedbackService
  ) {
    this.webNotificationService.requestPermission();
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.urlAfterRedirects || event.url;
          this.isShowHeader = this.currentRoute.startsWith('/login') || this.currentRoute.startsWith('/guest');
          if (!this.isShowHeader) {
            this.checkSession();
            // Initialize counts only once
            this.suggestionsFeedbackService.initializeCounts();
          }
        } else if (event instanceof NavigationError) {
          console.error('Navigation Error:', event.error);
        }
      });
  }

  async checkSession() {
    try {
      await this.apiMainService.checkSession();
    } catch (error) {
      console.error('Session check failed:', error);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
