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

  constructor(private localStorageService: LocalStorageService, private router: Router, private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    this.checkIfTokenPresent();
  }

  checkIfTokenPresent() {
    const ADMIN_ID = this.localStorageService.getCacheData('ADMIN_ID');
    const ADMIN_TOKEN = this.localStorageService.getCacheData('ADMIN_TOKEN');
    if (ADMIN_ID && ADMIN_TOKEN) {
      console.log(ADMIN_ID, 'ADMIN_TOKEN');
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
      console.log(loginObj, 'ADMIN_TOKEN');
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('error while verifying otp ', error);
    }
  }

  backToLogin() {
    this.showOTP = !this.showOTP
  }

}
