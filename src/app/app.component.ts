import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  Router,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SuggestionsFeedbackService } from 'src/service/suggestions-feedback.service';
import { WebNotificationService } from 'src/service/webNotification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashboard-admin';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private webNotificationService: WebNotificationService,
    private router: Router,
    private apiMainService: ApiMainService,
    private suggestionsFeedbackService: SuggestionsFeedbackService
  ) {
    this.webNotificationService.requestPermission();
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          const currentRoute = event.urlAfterRedirects || event.url;
          const isAuthRoute = !(currentRoute.startsWith('/login') || currentRoute.startsWith('/guest'));
          
          if (isAuthRoute) {
            this.checkSession();
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
