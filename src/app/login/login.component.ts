import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { ToasterService } from '@service/toaster.service';
import { PermissionsService } from '@service/permission.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgOtpInputModule
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  showOTP = false;
  adminId: string = '';
  password: string = '';
  otp: string = '';
  timer = 0;
  intervalId: any;

  isLoggingIn = false;
  isVerifying = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    private permissionsService: PermissionsService
  ) { }

  ngOnInit(): void {
    this.checkIfTokenPresent();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async checkIfTokenPresent() {
    const ADMIN_ID = this.localStorageService.getCacheData('ADMIN_ID');
    const ADMIN_TOKEN = this.localStorageService.getCacheData('ADMIN_TOKEN');
    const ADMIN_PROFILE = this.localStorageService.getCacheData('ADMIN_PROFILE');

    if (ADMIN_ID && ADMIN_TOKEN) {
      if (!ADMIN_PROFILE) {
        try {
          const profile = await this.apiMainService.getadminprofile(ADMIN_ID);
          this.localStorageService.setCacheData('ADMIN_PROFILE', profile);
          this.navigateToDashboard(profile);
        } catch (error) {
          console.error('Error fetching profile on auto-login:', error);
          this.localStorageService.resetAllCacheData();
          return;
        }
      } else {
        this.navigateToDashboard(ADMIN_PROFILE);
      }
    }
  }

  private navigateToDashboard(profile: any) {
    const returnUrl = this.localStorageService.getCacheData('RETURN_URL');
    if (returnUrl && returnUrl !== '/' && !returnUrl.includes('/login')) {
      this.localStorageService.resetCacheData('RETURN_URL');
      this.router.navigateByUrl(returnUrl);
      return;
    }

    const isOrgAdmin = this.permissionsService.isOrgUser(profile);
    const landingPage = isOrgAdmin ? '/orgapp/home' : '/app/home';
    this.router.navigate([landingPage]);
  }

  async login() {
    if (!this.adminId || this.isLoggingIn) return;

    try {
      this.isLoggingIn = true;
      const id = this.adminId.toUpperCase();
      this.adminId = id;

      await this.apiMainService.loginAdmin({ adminId: id });
      this.toasterService.success('OTP sent successfully');

      this.showOTP = true;
      this.resetOtp();
      this.startTimer();
    } catch (error) {
    } finally {
      this.isLoggingIn = false;
    }
  }

  async verifyOTP() {
    if (!this.isOTPComplete() || this.isVerifying) return;

    try {
      this.isVerifying = true;
      const loginObj = await this.apiMainService.verifyOTP({
        adminId: this.adminId,
        password: this.password,
      });

      this.localStorageService.setCacheData('ADMIN_ID', this.adminId);
      this.localStorageService.setCacheData('ADMIN_TOKEN', loginObj.token);
      this.localStorageService.setCacheData('DD_ADMIN_TOKEN', loginObj.token);
      
      const profile = await this.apiMainService.getadminprofile(this.adminId);
      this.localStorageService.setCacheData('ADMIN_PROFILE', profile);

      this.toasterService.success('Login successful');
      this.navigateToDashboard(profile);
    } catch (error) {
      this.toasterService.error(300);
    } finally {
      this.isVerifying = false;
    }
  }

  backToLogin() {
    this.showOTP = false;
    this.resetOtp();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.timer = 0;
  }

  onOtpChange(otp: string) {
    this.otp = otp;
    this.password = otp;
  }

  isOTPComplete() {
    return this.otp && this.otp.length === 6;
  }

  startTimer() {
    this.timer = 30;
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  async resendOTP() {
    if (this.timer !== 0) return;

    try {
      await this.apiMainService.loginAdmin({ adminId: this.adminId });
      this.toasterService.success('OTP resent successfully');
      this.startTimer();
    } catch (error) {
      this.toasterService.error(300);
    }
  }

  private resetOtp() {
    this.otp = '';
    this.password = '';
  }
}
