import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    private localStorageService: LocalStorageService,
    private router: Router,
    private apiMainService: ApiMainService
  ) { }

  ngOnInit(): void {
    this.checkIfTokenPresent();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  checkIfTokenPresent() {
    const ADMIN_ID = this.localStorageService.getCacheData('ADMIN_ID');
    const ADMIN_TOKEN = this.localStorageService.getCacheData('ADMIN_TOKEN');
    if (ADMIN_ID && ADMIN_TOKEN) {
      this.router.navigate(['/home']);
    }
  }

  async login() {
    if (!this.adminId || this.isLoggingIn) return;

    try {
      this.isLoggingIn = true;
      const id = this.adminId.toUpperCase();
      this.adminId = id;

      await this.apiMainService.loginAdmin({ adminId: id });

      this.showOTP = true;
      this.resetOtp();
      this.startTimer();
    } catch (error) {
      console.log('error while login ', error);
      // You can show snackbar/toast here
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
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('error while verifying otp ', error);
      // You can show snackbar/toast here and maybe reset OTP
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

    await this.apiMainService.loginAdmin({ adminId: this.adminId });

    this.startTimer();
  }

  private resetOtp() {
    this.otp = '';
    this.password = '';
  }
}
