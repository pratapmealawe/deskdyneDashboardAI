import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showOTP = false;
  adminId: any;
  password: any;
  otp = ['', '', '', '', '', ''];
  otpBoxes = Array(6).fill(0);
  timer = 30;
  intervalId: any;

  constructor(private localStorageService: LocalStorageService, private router: Router, private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    this.checkIfTokenPresent();
    this.startTimer();
  }

  checkIfTokenPresent() {
    const ADMIN_ID = this.localStorageService.getCacheData('ADMIN_ID');
    const ADMIN_TOKEN = this.localStorageService.getCacheData('ADMIN_TOKEN');
    if (ADMIN_ID && ADMIN_TOKEN) {
      this.router.navigate(['/home']);
    }
  }
  async login() {
    try {
      if (this.adminId) {
        this.adminId = this.adminId.toUpperCase();
        await this.apiMainService.loginAdmin({ adminId: this.adminId });
        this.showOTP = true;
      }
    } catch (error) {
      console.log('error while login ', error);
    }
  }

  async verifyOTP() {
    try {
      const loginObj = await this.apiMainService.verifyOTP({ adminId: this.adminId, password: this.password });
      this.localStorageService.setCacheData('ADMIN_ID', this.adminId);
      this.localStorageService.setCacheData('ADMIN_TOKEN', loginObj.token);
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('error while verifying otp ', error);
    }
  }

  backToLogin() {
    this.showOTP = !this.showOTP
  }

  onInput(event: any, index: number) {
    let value = event.target.value;

    value = value.replace(/[^0-9]/g, "");
    event.target.value = value;
    this.otp[index] = value;
    this.updatePassword();
    if (value.length > 1) {
      this.handlePasteValue(value);
      return;
    }

    if (value && index < 5) {
      event.target.nextElementSibling.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === "Backspace") {

      if (input.value === "") {
        if (index > 0) {
          const prev = input.previousElementSibling as HTMLInputElement;
          prev.value = "";
          this.otp[index - 1] = "";
          this.updatePassword();
          prev.focus();
        }
      } else {
        input.value = "";
        this.otp[index] = "";
        this.updatePassword();
        event.preventDefault();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text') || "";
    const numbersOnly = pastedData.replace(/[^0-9]/g, "");

    if (numbersOnly.length === 0) return;

    this.handlePasteValue(numbersOnly);
    event.preventDefault();
  }

  handlePasteValue(value: string) {
    const digits = value.split("").slice(0, 6);

    digits.forEach((d, i) => this.otp[i] = d);

    setTimeout(() => {
      const boxes: any = document.querySelectorAll('.otp-box');
      boxes.forEach((box: any, i: number) => box.value = this.otp[i] || "");

      const nextIndex = digits.length < 6 ? digits.length : 5;
      boxes[nextIndex].focus();
      this.updatePassword();
    });
  }

  isOTPComplete() {
    return this.otp.every(d => d !== "" && d !== null && d !== undefined);
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
    this.startTimer();
    //resend otp logic here
  }
}
