import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-org-emp-poll-card',
  templateUrl: './org-emp-poll-card.component.html',
  styleUrls: ['./org-emp-poll-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class OrgEmpPollCardComponent implements OnInit {
  @Input() orderInput: any;
  order: any;
  totalDeliveryCharge: number = 0;
  showEmployees: boolean = false;

  constructor(
    private apiMainService: ApiMainService,
    private sendDataToComponent: SendDataToComponent,
  ) { }

  ngOnInit() {
    this.order = this.orderInput;
    this.checkCutoff(this.order);
  }

  checkCutoff(order: any) {
    this.totalDeliveryCharge = 0;
    if (order && order.mealTypeList && order.mealTypeList.length > 0) {
      order.mealTypeList.forEach((item: any) => {
        this.totalDeliveryCharge += (item.deliveryCharge || 0);
      });
    }
  }

  getTotalItemCount(): number {
    if (!this.order?.mealTypeList) return 0;
    return this.order.mealTypeList.reduce((sum: number, item: any) => sum + (item.count || 0), 0);
  }

  formatTime12Hour(time: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    const m = parseInt(minutes);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    const mStr = m < 10 ? '0' + m : m;
    return `${h}:${mStr} ${ampm}`;
  }
}
