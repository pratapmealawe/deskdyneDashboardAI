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
  otp: string[] = ['', '', '', '', '', ''];
  otpBoxes = Array(6).fill(0);
  timer = 0;
  intervalId: any;

  isLoggingIn = false;
  isVerifying = false;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private apiMainService: ApiMainService
  ) {}

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

  onInput(event: any, index: number) {
    let value = event.target.value as string;
    value = value.replace(/[^0-9]/g, '');
    event.target.value = value;
    this.otp[index] = value;
    this.updatePassword();

    if (value.length > 1) {
      this.handlePasteValue(value);
      return;
    }

    if (value && index < 5) {
      const next = event.target.nextElementSibling as HTMLInputElement;
      next?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '') {
        if (index > 0) {
          const prev = input.previousElementSibling as HTMLInputElement;
          prev.value = '';
          this.otp[index - 1] = '';
          this.updatePassword();
          prev.focus();
        }
      } else {
        input.value = '';
        this.otp[index] = '';
        this.updatePassword();
        event.preventDefault();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text') || '';
    const numbersOnly = pastedData.replace(/[^0-9]/g, '');

    if (numbersOnly.length === 0) return;

    this.handlePasteValue(numbersOnly);
    event.preventDefault();
  }

  handlePasteValue(value: string) {
    const digits = value.split('').slice(0, 6);

    digits.forEach((d, i) => (this.otp[i] = d));

    setTimeout(() => {
      const boxes = document.querySelectorAll(
        '.otp-box'
      ) as NodeListOf<HTMLInputElement>;
      boxes.forEach((box, i) => (box.value = this.otp[i] || ''));

      const nextIndex = digits.length < 6 ? digits.length : 5;
      boxes[nextIndex]?.focus();
      this.updatePassword();
    });
  }

  isOTPComplete() {
    return this.otp.every((d) => d !== '' && d != null);
  }

  updatePassword() {
    this.password = this.otp.join('');
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

  resendOTP() {
    if (this.timer !== 0) return;
    // call API to resend OTP here
    this.startTimer();
  }

  private resetOtp() {
    this.otp = ['', '', '', '', '', ''];
    this.updatePassword();
  }
}
