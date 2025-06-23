import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-outlet-card',
  templateUrl: './outlet-card.component.html',
  styleUrls: ['./outlet-card.component.scss'],
})
export class OutletCardComponent implements OnInit {
  @Input() outlet: any;
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  vieworg(org: any) {
    this.view.emit(org);
  }
}
